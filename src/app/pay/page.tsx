
import Link from "next/link";

const features = [
  {
    title: "Merchant Dashboard",
    description:
      "Manage payment requests and monitor transaction activity.",
    status: "Demo Available",
  },
  {
    title: "USDC Checkout",
    description:
      "Accept USDC payments on the Base blockchain network.",
    status: "Planned",
  },
  {
    title: "Onchain Verification",
    description:
      "Verify successful USDC transfers and required confirmations before orders are marked paid or fulfilled.",
    status: "Planned",
  },
  {
    title: "Store Integrations",
    description:
      "Connect SSL Pay with Shopify and other supported commerce platforms.",
    status: "Planned",
  },
];

export default function PayPage() {
  return (
    <main className="min-h-screen bg-[#080D16] text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 py-6">
          <Link
            href="/"
            className="text-lg font-bold"
          >
            SHADOW{" "}
            <span className="text-blue-400">STACK</span>{" "}
            LABS
          </Link>

          <nav className="flex flex-wrap items-center gap-5">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/pay/dashboard"
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              Dashboard
            </Link>
          </nav>
        </header>

        {/* HERO */}
        <section className="py-20 md:py-28">
          <div className="mb-6 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-xs font-medium text-blue-300">
            BASE NETWORK · USDC PAYMENTS
          </div>

          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            SSL <span className="text-blue-400">Pay.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Stablecoin payment infrastructure designed for
            modern businesses. Accept USDC, track transactions,
            and integrate blockchain payments into commerce.
          </p>

          {/* DASHBOARD BUTTON */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pay/dashboard"
              className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400"
            >
              Open Merchant Dashboard →
            </Link>

            <Link
              href="/"
              className="inline-block rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold hover:border-white/50"
            >
              Back to Ecosystem
            </Link>
          </div>

          {/* DEVELOPMENT STATUS */}
          <div className="mt-12 rounded-xl border border-white/10 bg-[#111A29] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">
                  Application Status
                </p>

                <p className="mt-2 text-xl font-semibold">
                  Early Development
                </p>
              </div>

              <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                Testnet First
              </span>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-t border-white/10 py-16">
          <h2 className="mb-8 text-3xl font-semibold">
            Payment Infrastructure
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-white/10 bg-[#111A29] p-7"
              >
                <span className="text-xs uppercase tracking-wider text-blue-400">
                  {feature.status}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>

                {feature.title === "Merchant Dashboard" && (
                  <Link
                    href="/pay/dashboard"
                    className="mt-5 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View Dashboard →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* PAYMENT SECURITY */}
        <section className="border-t border-white/10 py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            Payment Security
          </p>

          <h2 className="text-3xl font-semibold">
            Verified onchain settlement.
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            SSL Pay is being designed to verify USDC payments
            on the Base network before confirming an order.
            Pending transactions and unverified transaction
            hashes will not authorize fulfillment.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-white">
            ← Back to Shadow Stack Labs
          </Link>
        </footer>

      </div>
    </main>
  );
}
