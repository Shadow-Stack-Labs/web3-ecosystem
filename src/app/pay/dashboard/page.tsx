
const transactions = [
  { id: "DEMO-001", amount: "125.00", status: "Confirmed" },
  { id: "DEMO-002", amount: "49.99", status: "Pending" },
  { id: "DEMO-003", amount: "210.50", status: "Awaiting Payment" },
];

export default function MerchantDashboard() {
  return (
    <main className="min-h-screen bg-[#080D16] text-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <a href="/pay" className="text-xl font-bold">
            SSL <span className="text-blue-400">PAY</span>
          </a>
          <span className="text-sm text-slate-400">
            Merchant Dashboard · Demo Mode
          </span>
        </header>

        <section className="py-16">
          <p className="text-sm text-blue-400">
            Merchant Overview
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Payment Dashboard
          </h1>

          <p className="mt-4 text-slate-400">
            Monitor USDC payment activity on Base.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
              <p className="text-sm text-slate-400">
                Confirmed Volume
              </p>
              <p className="mt-3 text-3xl font-semibold">
                $125.00
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
              <p className="text-sm text-slate-400">
                Confirmed Payments
              </p>
              <p className="mt-3 text-3xl font-semibold text-green-400">
                1
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111A29] p-6">
              <p className="text-sm text-slate-400">
                Pending Requests
              </p>
              <p className="mt-3 text-3xl font-semibold text-yellow-400">
                2
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <h2 className="mb-6 text-2xl font-semibold">
            Recent Transactions
          </h2>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111A29]">
            <table className="w-full min-w-[500px] text-left">
              <thead className="border-b border-white/10 text-sm text-slate-400">
                <tr>
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/5 text-sm">
                    <td className="px-6 py-5 font-mono text-blue-400">
                      {tx.id}
                    </td>
                    <td className="px-6 py-5">
                      ${tx.amount} USDC
                    </td>
                    <td className="px-6 py-5">
                      {tx.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            All transactions shown are fictional demonstration data.
            No blockchain payments are connected.
          </p>
        </section>

        <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
          <a href="/pay" className="hover:text-white">
            ← Back to SSL Pay
          </a>
        </footer>
      </div>
    </main>
  );
}
