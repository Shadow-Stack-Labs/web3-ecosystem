
"use client";

import { useRef, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { baseSepolia } from "wagmi/chains";

type WalletError = {
  code?: number;
  message?: string;
  cause?: unknown;
  details?: string;
  shortMessage?: string;
};

function findErrorCode(error: unknown): number | undefined {
  let current: unknown = error;
  const seen = new Set<object>();

  for (let depth = 0; depth < 8; depth++) {
    if (!current || typeof current !== "object") break;
    if (seen.has(current)) break;
    seen.add(current);

    const item = current as WalletError;

    if (typeof item.code === "number") {
      if (item.code === 4001 || item.code === -32002) {
        return item.code;
      }
    }

    current = item.cause;
  }

  return undefined;
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    const item = error as WalletError;

    return (
      item.shortMessage ||
      item.details ||
      item.message ||
      "Unknown wallet error."
    );
  }

  return "Unknown wallet error.";
}

export default function ConnectWallet() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogHidden, setDialogHidden] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [activeWallet, setActiveWallet] = useState("");
  const [blockedWallet, setBlockedWallet] = useState("");
  const [message, setMessage] = useState("");
  const [showFullAddress, setShowFullAddress] = useState(false);

  // Prevent overlapping requests even before React rerenders.
  const pendingRef = useRef(false);

  const { address, isConnected, chainId } = useAccount();
  const { connectAsync, connectors, reset } = useConnect();
  const { disconnect } = useDisconnect();

  const {
    switchChain,
    isPending: isSwitching,
    error: switchError,
  } = useSwitchChain();

  const correctNetwork = chainId === baseSepolia.id;

  const namedConnectors = connectors.filter(
    (connector) => connector.name !== "Injected"
  );

  const walletOptions =
    namedConnectors.length > 0
      ? namedConnectors
      : connectors;

  const displayAddress =
    address && !showFullAddress
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;

  async function handleConnect(
    connector: (typeof connectors)[number]
  ) {
    if (pendingRef.current) return;

    if (blockedWallet === connector.uid) {
      setMessage(
        `A previous ${connector.name} request may still be pending. ` +
          "Open the wallet extension and approve or reject it first."
      );
      return;
    }

    pendingRef.current = true;

    setConnecting(true);
    setDialogHidden(false);
    setMenuOpen(false);
    setActiveWallet(connector.name);
    setMessage("");

    reset();

    try {
      await connectAsync({ connector });

      setMessage("");
      setBlockedWallet("");
    } catch (connectionError: unknown) {
      const code = findErrorCode(connectionError);
      const detail = getErrorMessage(connectionError);

      console.error(
        `[SSL Pay] ${connector.name} connection error:`,
        connectionError
      );

      if (code === -32002) {
        setBlockedWallet(connector.uid);
        setMessage(
          `${connector.name} already has a pending request. ` +
            "Open the wallet extension and approve or reject " +
            "that request before trying again."
        );
      } else if (code === 4001) {
        setMessage(
          `${connector.name} connection was rejected. ` +
            "You can try again whenever you're ready."
        );
      } else {
        setMessage(
          `${connector.name} connection failed: ${detail}`
        );
      }

      setMenuOpen(true);
    } finally {
      pendingRef.current = false;
      setConnecting(false);
      setDialogHidden(false);
      setActiveWallet("");
    }
  }
  function clearPendingWarning() {
    // Only use after resolving the request in the wallet.
    setBlockedWallet("");
    setMessage("");
    reset();
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-4">
        {connecting ? (
          <div className="rounded-xl border border-gray-700 bg-[#151c2b] p-5">
            <p className="font-medium text-white">
              {dialogHidden
                ? `${activeWallet} request pending`
                : `Waiting for ${activeWallet}`}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {dialogHidden
                ? "The SSL Pay dialog is hidden, but your wallet may still be waiting for a response."
                : "Open your wallet extension to approve or reject the connection request."}
            </p>

            <button
              type="button"
              onClick={() =>
                setDialogHidden(!dialogHidden)
              }
              className="mt-4 rounded-lg border border-gray-600 px-4 py-3 text-white hover:bg-gray-800"
            >
              {dialogHidden
                ? "Show Connection Details"
                : "Hide Connection Dialog"}
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500"
            >
              Connect Wallet
            </button>

            {menuOpen && (
              <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#151c2b]">
                {walletOptions.length === 0 && (
                  <p className="p-4 text-sm text-gray-400">
                    No compatible browser wallets detected.
                  </p>
                )}

                {walletOptions.map((connector) => (
                  <button
                    key={connector.uid}
                    type="button"
                    onClick={() => handleConnect(connector)}
                    className="block w-full border-b border-gray-700 px-5 py-4 text-left text-white last:border-b-0 hover:bg-gray-800"
                  >
                    {connector.name}
                  </button>
                ))}
              </div>
            )}

            {message && (
              <div
                role="alert"
                className="rounded-lg border border-yellow-700 bg-yellow-950/30 p-4 text-sm text-yellow-300"
              >
                <p>{message}</p>

                {blockedWallet && (
                  <button
                    type="button"
                    onClick={clearPendingWarning}
                    className="mt-3 underline"
                  >
                   I&apos;ve resolved the request in my wallet
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-1 text-sm text-gray-400">
          Connected wallet
        </p>

        <button
          type="button"
          onClick={() =>
            setShowFullAddress(!showFullAddress)
          }
          className="break-all text-left font-mono text-sm text-white"
        >
          {displayAddress}
        </button>
      </div>

      <p className="text-sm text-white">
        Network:{" "}
        <span
          className={
            correctNetwork
              ? "text-green-400"
              : "text-yellow-400"
          }
        >
          {correctNetwork
            ? "Base Sepolia"
            : "Wrong network"}
        </span>
      </p>

      {!correctNetwork && (
        <button
          type="button"
          disabled={isSwitching}
          onClick={() =>
            switchChain({ chainId: baseSepolia.id })
          }
          className="rounded-lg bg-yellow-600 px-4 py-3 text-white disabled:opacity-50"
        >
          {isSwitching
            ? "Switching..."
            : "Switch to Base Sepolia"}
        </button>
      )}

      {switchError && (
        <p role="alert" className="text-sm text-red-400">
          {switchError.message}
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          disconnect();
          setMessage("");
          setBlockedWallet("");
        }}
        className="rounded-lg border border-gray-600 px-4 py-3 text-white hover:bg-gray-800"
      >
        Disconnect Wallet
      </button>
    </div>
  );
}
