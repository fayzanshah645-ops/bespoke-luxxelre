import { NextResponse } from "next/server";
import { sql, type OrderRow } from "../../../lib/db";

export const dynamic = "force-dynamic";

/**
 * Customer-facing order lookup. Requires BOTH the order number and the e-mail
 * used at checkout, so order details cannot be enumerated by guessing.
 */
export async function GET(
  request: Request,
  props: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await props.params;
  const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Please provide the e-mail used at checkout." },
      { status: 400 }
    );
  }

  try {
    const rows = await sql<OrderRow>`
      SELECT
        order_number, status, customer_name, email, phone,
        address_line1, address_line2, city, state, pincode, country,
        items, subtotal, shipping, cod_fee, discount, total,
        payment_method, notes, created_at, updated_at
      FROM orders
      WHERE order_number = ${orderNumber} AND email = ${email}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No order matches that order number and e-mail." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, order: rows[0] });
  } catch (error) {
    console.error("[orders] failed to look up order", error);
    return NextResponse.json(
      { ok: false, error: "Could not look up that order." },
      { status: 500 }
    );
  }
}
