import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const payment = await prisma.payment.findFirst({
      where: {
        id,
        merchantId: user.merchantId,
      },
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
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Payment lookup failed:", error);

    return NextResponse.json(
      { error: "Unable to load payment request." },
      { status: 500 }
    );
  }
}
