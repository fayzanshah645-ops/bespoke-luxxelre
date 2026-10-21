// ---------------------------------------------------------------------------
// Order payload shape, validation, and helpers shared by the API routes and
// the checkout form.
// ---------------------------------------------------------------------------

export type CheckoutItem = {
  id: string;
  title: string;
  slug: string;
  price: number;
  size: string;
  quantity: number;
  image?: string;
};

export type OrderPayload = {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  items: CheckoutItem[];
  totals: {
    subtotal: number;
    shipping: number;
    codFee: number;
    discount: number;
    total: number;
  };
  paymentMethod: string;
  notes?: string;
};

export const ORDER_STATUSES = [
  "placed",
  "confirmed",
  "in_atelier",
  "dispatched",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+\-\s()]{8,20}$/;
const PINCODE_RE = /^[0-9]{6}$/;

/**
 * Validate an incoming order payload. Returns a list of human-readable
 * problems; an empty array means the payload is good.
 */
export function validateOrder(payload: unknown): string[] {
  const errors: string[] = [];

  if (!payload || typeof payload !== "object") {
    return ["Request body must be a JSON object."];
  }
  const p = payload as Partial<OrderPayload>;

  const customer = p.customer;
  if (!customer || typeof customer !== "object") {
    errors.push("Customer details are required.");
  } else {
    if (!customer.name?.trim()) errors.push("Name is required.");
    if (!customer.email?.trim() || !EMAIL_RE.test(customer.email)) {
      errors.push("A valid e-mail address is required.");
    }
    if (!customer.phone?.trim() || !PHONE_RE.test(customer.phone)) {
      errors.push("A valid phone number is required.");
    }
  }

  const address = p.address;
  if (!address || typeof address !== "object") {
    errors.push("Delivery address is required.");
  } else {
    if (!address.line1?.trim()) errors.push("Address line 1 is required.");
    if (!address.city?.trim()) errors.push("City is required.");
    if (!address.state?.trim()) errors.push("State is required.");
    if (!address.pincode?.trim() || !PINCODE_RE.test(address.pincode.trim())) {
      errors.push("A valid 6-digit pincode is required.");
    }
  }

  if (!Array.isArray(p.items) || p.items.length === 0) {
    errors.push("Your cart is empty.");
  } else {
    for (const item of p.items) {
      if (!item?.id || !item?.title) {
        errors.push("Cart contains an invalid item.");
        break;
      }
      if (!Number.isFinite(item.price) || item.price < 0) {
        errors.push(`Invalid price for ${item.title}.`);
        break;
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        errors.push(`Invalid quantity for ${item.title}.`);
        break;
      }
    }
  }

  const totals = p.totals;
  if (!totals || typeof totals !== "object") {
    errors.push("Order totals are missing.");
  } else {
    if (!Number.isFinite(totals.total) || totals.total < 0) {
      errors.push("Invalid order total.");
    }
  }

  if (!p.paymentMethod) errors.push("A payment method is required.");

  return errors;
}

/** Round to 2dp and normalise to a number (Postgres NUMERIC comes back as a string). */
export function toNumber(value: unknown): number {
  const n = typeof value === "string" ? parseFloat(value) : Number(value);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}
