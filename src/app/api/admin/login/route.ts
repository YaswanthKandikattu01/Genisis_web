import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();

        // Validate against server-side environment variable
        if (password === process.env.ADMIN_PASSWORD) {
            return NextResponse.json({
                success: true,
                token: process.env.ADMIN_SECRET_KEY
            });
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
