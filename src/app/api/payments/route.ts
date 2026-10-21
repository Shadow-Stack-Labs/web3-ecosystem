
import { NextRequest, NextResponse } from "next/server";
import { payments, type Payment } from "@/lib/paymentStore";

export async function GET() {
  return NextResponse.json(
    { payments },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const amount = Number(body.amount);
    const orderReference = String(
      body.orderReference ?? ""
    ).trim();

    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(String(body.amount))
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

    if (
      payments.some(
        (payment) => payment.orderReference === orderReference
      )
    ) {
      return NextResponse.json(
        { error: "Order reference already exists." },
        { status: 409 }
      );
    }

    const payment: Payment = {
      id: crypto.randomUUID(),
      orderReference,
      amount,
      status: "Awaiting Payment",
      createdAt: new Date().toISOString(),
    };

    payments.unshift(payment);

    return NextResponse.json(
      { payment },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to create payment request." },
      { status: 400 }
    );
  }
}
