import { NextResponse } from "next/server";
import { sql, type OrderRow } from "../../../../lib/db";
import { isAdmin } from "../../../../lib/admin-auth";
import { isOrderStatus } from "../../../../lib/orders";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ orderNumber: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "Not authorised." },
      { status: 401 }
    );
  }

  const { orderNumber } = await props.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const status = String((body as { status?: unknown })?.status ?? "");
  if (!isOrderStatus(status)) {
    return NextResponse.json(
      { ok: false, error: "Unknown order status." },
      { status: 400 }
    );
  }

  try {
    const rows = await sql<OrderRow>`
      UPDATE orders
      SET status = ${status}, updated_at = now()
      WHERE order_number = ${orderNumber}
      RETURNING order_number, status, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, order: rows[0] });
  } catch (error) {
    console.error("[admin/orders] failed to update order", error);
    return NextResponse.json(
      { ok: false, error: "Could not update the order." },
      { status: 500 }
    );
  }
}
