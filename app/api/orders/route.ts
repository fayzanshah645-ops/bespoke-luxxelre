import { NextResponse } from "next/server";
import { sql, type OrderRow } from "../../lib/db";
import { validateOrder, type OrderPayload } from "../../lib/orders";

// Orders are live data — never statically cached.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const errors = validateOrder(payload);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors[0], errors }, { status: 400 });
  }

  const order = payload as OrderPayload;

  try {
    const rows = await sql<OrderRow>`
      INSERT INTO orders (
        order_number,
        status,
        customer_name,
        email,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
        country,
        items,
        subtotal,
        shipping,
        cod_fee,
        discount,
        total,
        payment_method,
        notes
      )
      VALUES (
        'BL-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 5, '0'),
        'placed',
        ${order.customer.name.trim()},
        ${order.customer.email.trim().toLowerCase()},
        ${order.customer.phone.trim()},
        ${order.address.line1.trim()},
        ${order.address.line2?.trim() || null},
        ${order.address.city.trim()},
        ${order.address.state.trim()},
        ${order.address.pincode.trim()},
        ${order.address.country?.trim() || "India"},
        ${JSON.stringify(order.items)}::jsonb,
        ${order.totals.subtotal},
        ${order.totals.shipping},
        ${order.totals.codFee},
        ${order.totals.discount},
        ${order.totals.total},
        ${order.paymentMethod},
        ${order.notes?.trim() || null}
      )
      RETURNING id, order_number, status, total, payment_method, created_at
    `;

    const created = rows[0];

    return NextResponse.json(
      {
        ok: true,
        order: {
          id: created.id,
          orderNumber: created.order_number,
          status: created.status,
          total: Number(created.total),
          paymentMethod: created.payment_method,
          createdAt: created.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[orders] failed to create order", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not register your order right now. Please try again, or message us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
