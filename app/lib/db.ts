import { neon } from "@neondatabase/serverless";

// ---------------------------------------------------------------------------
// Neon (serverless Postgres) access layer.
//
// The `neon()` driver speaks HTTP, which is the right transport for Vercel
// serverless functions: no persistent TCP sockets to keep alive, and no
// prepared-statement conflicts with Neon's pooler.
//
// The client is created lazily so that `next build` (which runs without
// DATABASE_URL present) does not explode on import.
// ---------------------------------------------------------------------------

let client: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add it to .env.local and to your Vercel environment variables."
      );
    }
    client = neon(url);
  }
  return client;
}

/**
 * Run a parameterised query. The tagged-template form auto-escapes values,
 * so never interpolate user input with string concatenation.
 */
export function sql<T extends Record<string, unknown> = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  const query = getDb()(strings as unknown as TemplateStringsArray, ...values);
  return query as unknown as Promise<T[]>;
}

/** Run a statement that returns a single row (or undefined). */
export async function sqlOne<T extends Record<string, unknown> = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T | undefined> {
  const rows = await sql<T>(strings, ...values);
  return rows[0];
}

export type OrderRow = {
  id: string;
  order_number: string;
  status: string;
  customer_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  items: unknown;
  subtotal: number;
  shipping: number;
  cod_fee: number;
  discount: number;
  total: number;
  payment_method: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type SubscriberRow = {
  id: string;
  email: string;
  created_at: string;
};
