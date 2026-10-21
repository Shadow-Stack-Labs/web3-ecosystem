
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ConnectWallet from "@/components/ConnectWallet";

type Payment = {
  id: string;
  orderReference: string;
  amount: number;
  status:
    | "Awaiting Payment"
    | "Pending Verification"
    | "Confirmed";
  createdAt: string;
};

export default function OrderCheckoutPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPayment() {
      try {
        const response = await fetch(
          `/api/payments/${encodeURIComponent(id)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "This payment request was not found or has expired."
            );
          }

          throw new Error(
            "Unable to load the payment request."
          );
        }

        const data: { payment: Payment } =
          await response.json();

        if (!controller.signal.aborted) {
          setPayment(data.payment);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load the payment request."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadPayment();

    return () => controller.abort();
  }, [id]);

  return (
    <main className="min-h-screen bg-[#080D16] text-white">
      <div className="mx-auto max-w-3xl px-6">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <Link href="/pay" className="text-xl font-bold">
            SSL <span className="text-blue-400">PAY</span>
          </Link>

          <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
            Demo Checkout
          </span>
        </header>

        <section className="py-14">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Customer Checkout
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Complete Your Payment
          </h1>

          <p className="mt-4 text-slate-400">
            Review your order and explore the available
            payment options.
          </p>
        </section>

        {loading ? (
          <div
            role="status"
            className="rounded-xl border border-white/10 bg-[#111A29] p-8 text-slate-300"
          >
            Loading payment request...
          </div>
        ) : error || !payment ? (
          <div
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-400/10 p-8"
          >
            <h2 className="text-xl font-semibold">
              Payment Unavailable
            </h2>

            <p className="mt-3 text-sm text-red-200">
              {error || "Payment request unavailable."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-xl border border-white/10 bg-[#111A29] p-8">
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex flex-wrap justify-between gap-3">
                  <span className="text-slate-400">
                    Order Reference
                  </span>
                  <span className="font-mono text-blue-300">
                    {payment.orderReference}
                  </span>
                </div>

                <div className="flex flex-wrap justify-between gap-3">
                  <span className="text-slate-400">
                    Payment Status
                  </span>
                  <span className="text-yellow-300">
                    {payment.status}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm text-slate-400">
                    Amount Due
                  </p>

                  <p className="mt-2 text-4xl font-semibold">
                    {payment.amount.toFixed(2)}
                    <span className="ml-3 text-lg text-blue-400">
                      USDC
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#111A29] p-8">
              <h2 className="text-xl font-semibold">
                Payment Methods
              </h2>

              <div className="mt-6 rounded-lg border border-blue-400/30 bg-blue-400/5 p-6">
                <h3 className="font-semibold">
                  Pay with Crypto Wallet
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Connect a compatible wallet to prepare
                  for USDC payments on Base.
                </p>

                <div className="mt-5">
                  <ConnectWallet />
                </div>

                <p className="mt-4 text-xs leading-5 text-yellow-300">
                  Demo only. Connecting a wallet does not
                  initiate a transaction. Payment submission
                  is not yet enabled.
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-white/10 p-6">
                <h3 className="font-semibold">
                  Debit Card / Apple Pay
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Planned through a supported on-ramp
                  provider. Not available in this demo.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-5 rounded-lg border border-white/20 px-5 py-3 text-sm text-slate-400 opacity-60"
                >
                  Coming Soon
                </button>
              </div>
            </section>

            <p className="text-xs leading-6 text-slate-500">
              Development demonstration only. No USDC is
              transferred, no payment is verified, and no
              merchant order is fulfilled.
            </p>
          </div>
        )}

        <footer className="mt-14 border-t border-white/10 py-8 text-sm text-slate-500">
          <Link href="/pay" className="hover:text-white">
            ← Back to SSL Pay
          </Link>
        </footer>
      </div>
    </main>
  );
}
