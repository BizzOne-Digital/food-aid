/**
 * Generates a bcrypt hash for ADMIN_PASSWORD_HASH.
 *   npm run hash-password -- "YourStrongPassword"
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Usage: npm run hash-password -- "YourStrongPassword"  (min 10 characters)');
  process.exit(1);
}
const hash = bcrypt.hashSync(password, 12);
console.log("\nFor .env / .env.local (each $ escaped):");
console.log("ADMIN_PASSWORD_HASH=" + hash.replace(/\$/g, "\\$"));
console.log("\nFor the Vercel dashboard (paste as is):");
console.log(hash + "\n");
