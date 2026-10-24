
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  validatePassword,
} from "@/lib/password";


export async function POST(request: NextRequest) {
  if (process.env.SSL_PAY_REGISTRATION_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Merchant registration is not available." },
      { status: 403 }
    );
  }

  const origin = request.headers.get("origin");
  const expectedOrigin = request.nextUrl.origin;

  if (!origin || origin !== expectedOrigin) {
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
      { error: "Invalid registration details." },
      { status: 400 }
    );
  }

  const input = body as Record<string, unknown>;

  if (
    typeof input.businessName !== "string" ||
    typeof input.email !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid registration details." },
      { status: 400 }
    );
  }

  const businessName = input.businessName.trim();
  const email = input.email.trim().toLowerCase();

  if (businessName.length < 2 || businessName.length > 100) {
    return NextResponse.json(
      { error: "Business name must contain 2–100 characters." },
      { status: 400 }
    );
  }

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const passwordError = validatePassword(input.password);

  if (passwordError) {
    return NextResponse.json(
      { error: passwordError },
      { status: 400 }
    );
  }

  try {
    const passwordHash = await hashPassword(
      input.password as string
    );

    const merchant = await prisma.merchant.create({
      data: {
        name: businessName,
        users: {
          create: {
            email,
            passwordHash,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      {
        message: "Merchant account created.",
        merchant,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Unable to create merchant account." },
        { status: 409 }
      );
    }

    console.error("Merchant registration failed:", error);

    return NextResponse.json(
      { error: "Unable to create merchant account." },
      { status: 500 }
    );
  }
}
