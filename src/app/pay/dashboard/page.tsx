
"use client";

import { useState } from "react";
import Link from "next/link";

type PaymentStatus =
  | "Awaiting Payment"
  | "Pending Verification"
  | "Confirmed";

type Payment = {
  id: string;
  orderReference: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
};

export default function MerchantDashboard() {
  const [amount, setAmount] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [message, setMessage] = useState("");

  const totalRequests = payments.length;

  const confirmedPayments = payments.filter(
    (payment) => payment.status === "Confirmed"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status !== "Confirmed"
  ).length;

  const confirmedVolume = payments
    .filter((payment) => payment.status === "Confirmed")
    .reduce((total, payment) => total + payment.amount, 0);

  function createPaymentRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number(amount);
    const reference = orderReference.trim();

    if (
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(amount.trim())
    ) {
      setMessage("Enter a valid USDC amount with up to 2 decimals.");
      return;
    }

    if (!reference) {
      setMessage("Please enter an order reference.");
      return;
    }

    if (
      payments.some(
        (payment) => payment.orderReference === reference
      )
    ) {
      setMessage("This order reference already exists in the demo.");
      return;
    }

    const newPayment: Payment = {
      id: crypto.randomUUID(),
      orderReference: reference,
      amount: parsedAmount,
      status: "Awaiting Payment",
      createdAt: new Date().toISOString(),
    };

    setPayments((previous) => [newPayment, ...previous]);

    setAmount("");
    setOrderReference("");

    setMessage(
      `Demo payment request created for ${reference}.`
    );
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString();
  }

  return (
    <main className="min-h-screen bg-[#080D16] text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 py-6">
          <Link
            href="/pay"
            className="text-xl font-bold"
          >
            SSL <span className="text-blue-400">PAY</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-5">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/pay"
              className="text-sm text-slate-400 hover:text-white"
            >
              SSL Pay
            </Link>

            <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
              Demo Mode
            </span>
          </nav>
        </header>

        {/* DASHBOARD TITLE */}
        <section className="pt-16 pb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Merchant Overview
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Payment Dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Create and monitor demonstration USDC payment
            requests. Blockchain settlement is not yet connected.
          </p>
        </section>

        {/* STATISTICS */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
            <p className="text-sm text-slate-400">
              Payment Requests
            </p>

            <p className="mt-3 text-3xl font-semibold">
              {totalRequests}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
            <p className="text-sm text-slate-400">
              Awaiting Payment
            </p>

            <p className="mt-3 text-3xl font-semibold text-yellow-400">
              {pendingPayments}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
            <p className="text-sm text-slate-400">
              Confirmed Payments
            </p>

            <p className="mt-3 text-3xl font-semibold text-green-400">
              {confirmedPayments}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
            <p className="text-sm text-slate-400">
              Confirmed Volume
            </p>

            <p className="mt-3 text-3xl font-semibold">
              ${confirmedVolume.toFixed(2)}
            </p>
          </div>
        </section>

        {/* CREATE PAYMENT REQUEST */}
        <section className="py-16">
          <div className="rounded-xl border border-white/10 bg-[#111A29] p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">
                Create Payment Request
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Generate a demonstration USDC payment request
                for a merchant order.
              </p>
            </div>

            <form
              onSubmit={createPaymentRequest}
              className="grid gap-6 md:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm text-slate-300"
                >
                  Amount (USDC)
                </label>

                <input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="49.99"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#080D16] px-4 py-3 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label
                  htmlFor="orderReference"
                  className="mb-2 block text-sm text-slate-300"
                >
                  Order Reference
                </label>

                <input
                  id="orderReference"
                  type="text"
                  maxLength={100}
                  placeholder="ORDER-1001"
                  value={orderReference}
                  onChange={(event) =>
                    setOrderReference(event.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#080D16] px-4 py-3 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                >
                  Create Demo Payment Request →
                </button>

                {message && (
                  <p
                    role="status"
                    className="mt-4 text-sm text-blue-300"
                  >
                    {message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* TRANSACTION TABLE */}
        <section className="pb-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              Payment Requests
            </h2>

            <span className="text-sm text-slate-400">
              {payments.length} requests
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111A29]">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b border-white/10 text-sm text-slate-400">
                <tr>
                  <th className="px-6 py-4">
                    Order Reference
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-slate-400"
                    >
                      No payment requests yet.
                      Create your first demo request above.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-white/5 text-sm"
                    >
                      <td className="px-6 py-5 font-mono text-blue-400">
                        {payment.orderReference}
                      </td>

                      <td className="px-6 py-5">
                        {payment.amount.toFixed(2)} USDC
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-400">
                        {formatDate(payment.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-500">
            Demo only. Requests are stored in browser memory
            and disappear when the page is refreshed.
            No wallet connection, USDC transfer, blockchain
            verification, or order fulfillment is enabled.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
          <Link
            href="/pay"
            className="hover:text-white"
          >
            ← Back to SSL Pay
          </Link>
        </footer>
      </div>
    </main>
  );
}
