
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-[#080b12] px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/pay"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to SSL Pay
        </Link>

        <div className="mt-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Shadow Stack Labs
          </p>

          <h1 className="text-3xl font-bold">
            SSL Pay — Wallet Connection
          </h1>

          <p className="mt-4 text-gray-400">
            Connect your wallet to the Base Sepolia test network.
            This page is for development and testing only.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-800 bg-[#101522] p-6">
          <ConnectWallet />
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Connecting a wallet does not authorize payments,
          request signatures, or transfer funds.
        </p>
      </div>
    </main>
  );
}
