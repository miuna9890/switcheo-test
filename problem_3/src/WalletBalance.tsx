// does not have a blockchain property
export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
