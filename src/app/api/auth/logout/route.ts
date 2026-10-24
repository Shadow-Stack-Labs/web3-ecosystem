import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";


export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    );
  }

  try {
    await deleteSession();

    return NextResponse.json(
      { message: "Logged out successfully." },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Merchant logout failed:", error);

    return NextResponse.json(
      { error: "Unable to log out." },
      { status: 500 }
    );
  }
}
