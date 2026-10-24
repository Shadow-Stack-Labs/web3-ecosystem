
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";


export async function POST(request: NextRequest) {
  if (process.env.SSL_PAY_LOGIN_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Merchant login is not available." },
      { status: 403 }
    );
  }

  const origin = request.headers.get("origin");

  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Invalid login details." },
      { status: 400 }
    );
  }

  const input = body as Record<string, unknown>;

  if (
    typeof input.email !== "string" ||
    typeof input.password !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid login details." },
      { status: 400 }
    );
  }

  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length === 0 ||
    password.length > 128
  ) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const validPassword = await verifyPassword(
      user.passwordHash,
      password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json(
      {
        message: "Login successful.",
        user: {
          id: user.id,
          email: user.email,
          merchantId: user.merchantId,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Merchant login failed:", error);

    return NextResponse.json(
      { error: "Unable to log in." },
      { status: 500 }
    );
  }
}
