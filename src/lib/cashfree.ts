/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cashfree } from "cashfree-pg";

// Initialize Cashfree SDK
export const cashfree = new (Cashfree as any)(
    process.env.CASHFREE_ENV === "PRODUCTION"
        ? (Cashfree as any).PRODUCTION
        : (Cashfree as any).SANDBOX,
    process.env.CASHFREE_APP_ID || "",
    process.env.CASHFREE_SECRET_KEY || ""
);
