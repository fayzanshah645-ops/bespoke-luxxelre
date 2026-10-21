-- ---------------------------------------------------------------------------
-- Bespoke Luxurrele — database schema
-- Run once against the Neon `neondb` database.
-- ---------------------------------------------------------------------------

-- Orders -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    TEXT UNIQUE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'placed',
  customer_name   TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  address_line1   TEXT NOT NULL,
  address_line2   TEXT,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  pincode         TEXT NOT NULL,
  country         TEXT NOT NULL DEFAULT 'India',
  items           JSONB NOT NULL,
  subtotal        NUMERIC(12, 2) NOT NULL,
  shipping        NUMERIC(12, 2) NOT NULL DEFAULT 0,
  cod_fee         NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount        NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total           NUMERIC(12, 2) NOT NULL,
  payment_method  TEXT NOT NULL,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_status_idx      ON orders (status);
CREATE INDEX IF NOT EXISTS orders_email_idx       ON orders (email);

-- Human-friendly sequential order numbers: BL-00001, BL-00002, ...
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1 INCREMENT BY 1;

-- Newsletter subscribers ---------------------------------------------------
CREATE TABLE IF NOT EXISTS subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subscribers_created_at_idx ON subscribers (created_at DESC);
