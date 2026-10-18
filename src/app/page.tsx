
const products = [
  {
    name: "SSL Pay",
    category: "Stablecoin Payments",
    description:
      "USDC payment infrastructure for businesses, powered by Base.",
    status: "In Development",
  },
  {
    name: "Supply Chain Verification",
    category: "Product Traceability",
    description:
      "Verifiable blockchain records for products and supply chains.",
    status: "Planned",
  },
  {
    name: "Smart Contract Automation",
    category: "Business Automation",
    description:
      "Programmable contracts and workflows for business operations.",
    status: "Planned",
  },
  {
    name: "Loyalty & Memberships",
    category: "Customer Engagement",
    description:
      "Blockchain-enabled rewards, memberships, and loyalty programs.",
    status: "Planned",
  },
  {
    name: "Asset Tokenization",
    category: "Digital Assets",
    description:
      "Infrastructure for representing real-world assets onchain.",
    status: "Planned",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080D16] text-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <a href="/" className="text-lg font-bold tracking-wide">
            SHADOW <span className="text-blue-400">STACK</span> LABS
          </a>

          <a
            href="https://github.com/Shadow-Stack-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white"
          >
            GitHub ↗
          </a>
        </header>

        <section className="py-24 md:py-36">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            Web3 Development Studio
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Building infrastructure for{" "}
            <span className="text-blue-400">
              digital commerce.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Shadow Stack Labs develops practical blockchain
            applications for payments, verification, automation,
            digital ownership, and customer engagement.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#ecosystem"
              className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold hover:bg-blue-400"
            >
              Explore Ecosystem
            </a>

            <a
              href="https://github.com/Shadow-Stack-Labs/web3-ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold hover:border-white/50"
            >
              View Development ↗
            </a>
          </div>
        </section>

        <section
          id="ecosystem"
          className="border-t border-white/10 py-20"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            The Ecosystem
          </p>

          <h2 className="text-3xl font-semibold md:text-4xl">
            Five applications. One connected vision.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Independent business tools built on interoperable
            blockchain infrastructure.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-xl border border-white/10 bg-[#111A29] p-7 transition hover:border-blue-400/50"
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-wider text-blue-400">
                    {product.category}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                    {product.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">
                  {product.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            Our Approach
          </p>

          <h2 className="text-3xl font-semibold md:text-4xl">
            Practical utility. Transparent development.
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            Our mission is to make blockchain technology
            accessible to businesses through secure,
            straightforward, and useful applications.
          </p>
        </section>

        
<footer className="border-t border-white/10 py-8 text-sm text-slate-500">
  © 2026 Shadow Stack Labs. Building practical Web3 infrastructure.
</footer>

      </div>
    </main>
  );
}
