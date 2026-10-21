
import { NextResponse } from "next/server";
import { payments } from "@/lib/paymentStore";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const payment = payments.find(
    (item) => item.id === id
  );

  if (!payment) {
    return NextResponse.json(
      { error: "Payment request not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { payment },
    { headers: { "Cache-Control": "no-store" } }
  );
}
