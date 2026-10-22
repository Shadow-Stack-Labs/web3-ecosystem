
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

function formatPayment(payment: {
  id: string;
  orderReference: string;
  amount: Prisma.Decimal;
  status: string;
  createdAt: Date;
}) {
  return {
    id: payment.id,
    orderReference: payment.orderReference,
    amount: payment.amount.toNumber(),
    status: payment.status,
    createdAt: payment.createdAt.toISOString(),
  };
}

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { payments: payments.map(formatPayment) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Payment list failed:", error);

    return NextResponse.json(
      { error: "Unable to load payment requests." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
      { error: "Invalid payment request." },
      { status: 400 }
    );
  }

  const input = body as Record<string, unknown>;
  const amountText = String(input.amount ?? "");
  const amount = Number(amountText);
  const orderReference = String(input.orderReference ?? "").trim();

  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !/^\d+(\.\d{1,2})?$/.test(amountText)
  ) {
    return NextResponse.json(
      { error: "Invalid USDC amount." },
      { status: 400 }
    );
  }

  if (!orderReference || orderReference.length > 100) {
    return NextResponse.json(
      { error: "Invalid order reference." },
      { status: 400 }
    );
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        id: crypto.randomUUID(),
        orderReference,
        amount: new Prisma.Decimal(amountText),
        status: "Awaiting Payment",
      },
    });

    return NextResponse.json(
      { payment: formatPayment(payment) },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Order reference already exists." },
        { status: 409 }
      );
    }

    console.error("Payment creation failed:", error);

    return NextResponse.json(
      { error: "Unable to create payment request." },
      { status: 500 }
    );
  }
}
