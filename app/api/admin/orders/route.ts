import { NextResponse } from "next/server";
import { sql, type OrderRow } from "../../../lib/db";
import { isAdmin } from "../../../lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "Not authorised." },
      { status: 401 }
    );
  }

  try {
    const rows = await sql<OrderRow>`
      SELECT
        id, order_number, status, customer_name, email, phone,
        address_line1, address_line2, city, state, pincode, country,
        items, subtotal, shipping, cod_fee, discount, total,
        payment_method, notes, created_at, updated_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 500
    `;

    return NextResponse.json({ ok: true, orders: rows });
  } catch (error) {
    console.error("[admin/orders] failed to load orders", error);
    return NextResponse.json(
      { ok: false, error: "Could not load orders." },
      { status: 500 }
    );
  }
}
