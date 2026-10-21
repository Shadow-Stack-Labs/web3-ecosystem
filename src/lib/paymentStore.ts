
export type PaymentStatus =
  | "Awaiting Payment"
  | "Pending Verification"
  | "Confirmed";

export type Payment = {
  id: string;
  orderReference: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
};

// Development-only, in-memory storage.
// This is not suitable for production or real payments.
export const payments: Payment[] = [];
