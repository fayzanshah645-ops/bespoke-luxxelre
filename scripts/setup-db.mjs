/**
 * Applies app/lib/schema.sql to the Neon database.
 *
 *   npm run db:setup
 *
 * Reads DATABASE_URL from .env.local (or the shell environment).
 * Safe to re-run — every statement is CREATE ... IF NOT EXISTS.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

// --- Load .env.local -------------------------------------------------------
async function loadEnv() {
  const envPath = join(root, ".env.local");
  let raw;
  try {
    raw = await readFile(envPath, "utf8");
  } catch {
    return; // no .env.local — rely on the shell environment
  }
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

await loadEnv();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "\n✦ DATABASE_URL is not set.\n" +
      "  Add your Neon pooled connection string to .env.local first.\n" +
      "  See .env.example for the format.\n"
  );
  process.exit(1);
}

const sql = neon(url);
const schema = await readFile(join(root, "app", "lib", "schema.sql"), "utf8");

// Split into individual statements. The schema contains no PL/pgSQL bodies,
// so a plain split on ";" is safe here.
const statements = schema
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

console.log(`\n✦ Applying ${statements.length} statements to Neon…\n`);

for (const statement of statements) {
  const label = statement.split("\n")[0].slice(0, 64);
  try {
    await sql.query(statement);
    console.log(`  ✓ ${label}`);
  } catch (error) {
    console.error(`  ✗ ${label}`);
    console.error(`    ${error.message}\n`);
    process.exit(1);
  }
}

console.log("\n✦ Database ready. Orders and subscribers tables are in place.\n");
