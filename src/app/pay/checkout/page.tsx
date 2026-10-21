
"use client";

import { useState } from "react";
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";

type PaymentMethod = "wallet" | "card";

export default function CheckoutPage() {
  const [method, setMethod] =
    useState<PaymentMethod>("card");

  return (
    <main className="min-h-screen bg-[#080d18] px-5 py-12 text-white">
      <div className="mx-auto max-w-xl space-y-8">
        <Link
          href="/pay"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to SSL Pay
        </Link>

        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-widest text-blue-400">
            SHADOW STACK LABS
          </p>

          <h1 className="text-3xl font-bold">
            Secure Checkout
          </h1>

          <p className="text-gray-400">
            Simple payments powered by USDC on Base.
          </p>
        </header>

        <section className="rounded-2xl border border-gray-700 bg-[#111827] p-6">
          <p className="text-sm text-gray-400">
            Demo order total
          </p>

          <p className="mt-2 text-4xl font-bold">
            $50.00
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Demonstration only. No real payment will
            be processed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Choose how to pay
          </h2>

          <button
            type="button"
            onClick={() => setMethod("card")}
            aria-pressed={method === "card"}
            className={`w-full rounded-xl border p-5 text-left ${
              method === "card"
                ? "border-blue-500 bg-blue-950/30"
                : "border-gray-700 bg-[#111827]"
            }`}
          >
            <p className="font-semibold">
              Debit Card / Apple Pay
            </p>

            <p className="mt-2 text-sm text-gray-400">
              New to crypto? Get started without
              managing a browser wallet.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMethod("wallet")}
            aria-pressed={method === "wallet"}
            className={`w-full rounded-xl border p-5 text-left ${
              method === "wallet"
                ? "border-blue-500 bg-blue-950/30"
                : "border-gray-700 bg-[#111827]"
            }`}
          >
            <p className="font-semibold">
              Pay with Crypto Wallet
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Use an existing compatible wallet
              with USDC on Base.
            </p>
          </button>
        </section>

        <section className="rounded-xl border border-gray-700 bg-[#111827] p-6">
          {method === "card" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Card checkout
              </h3>

              <p className="text-sm text-gray-400">
                Coinbase-powered card funding is
                planned. Availability and fees
                are still being evaluated.
              </p>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white opacity-50"
              >
                Card Payments — Coming Soon
              </button>

              <p className="text-xs text-gray-500">
                SSL Pay does not currently collect
                card details or initiate purchases.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Connect your wallet
              </h3>

              <ConnectWallet />

              <p className="text-xs text-gray-500">
                Connecting a wallet does not
                initiate a payment. USDC transfer
                functionality is not yet enabled.
              </p>
            </div>
          )}
        </section>

        <footer className="text-center text-xs text-gray-500">
          SSL Pay • Powered by Shadow Stack Labs
        </footer>
      </div>
    </main>
  );
}
