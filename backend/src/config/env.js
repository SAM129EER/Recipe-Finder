import dotenv from "dotenv";
dotenv.config();

const requiredEnvs = [
  "MONGO_URI",
  "JWT_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CLIENT_URL",
];
const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

if (missingEnvs.length > 0) {
  console.error(
    `Error: Missing required environment variables: ${missingEnvs.join(", ")}`,
  );
  process.exit(1);
}
