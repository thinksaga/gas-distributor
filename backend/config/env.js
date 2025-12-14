import {config} from "dotenv";

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

// Export commonly used environment variables. Additional optional vars for
// seeding initial admin/superadmin users are included so the seeding logic
// can read overrides from environment when present.
export const {
	PORT,
	DB_URI,
	JWT_SECRET,
	JWT_EXPIRE,
	SUPERADMIN_USERNAME,
	SUPERADMIN_PASSWORD,
	SUPERADMIN_EMAIL,
	ADMIN_USERNAME,
	ADMIN_PASSWORD,
	ADMIN_EMAIL,
} = process.env;