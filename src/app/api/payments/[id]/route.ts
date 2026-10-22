
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        payment: {
          id: payment.id,
          orderReference: payment.orderReference,
          amount: payment.amount.toNumber(),
          status: payment.status,
          createdAt: payment.createdAt.toISOString(),
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Payment lookup failed:", error);

    return NextResponse.json(
      { error: "Unable to load payment request." },
      { status: 500 }
    );
  }
}
