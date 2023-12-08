export type Transaction = {
  blockNum: string;
  uniqueID: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  erc721TokenID: null;
  erc1155Metadata: null;
  tokenID: null;
  asset: string;
  category: string;
  rawContract: RawContract;
};

export type RawContract = {
  value: string;
  address: string;
  decimal: string;
};

export type Group = {
  name: string;
  asset: string;
  settledUp: boolean;
  transactions: Transaction[];
};

export type Expense = {
  id: string;
  groupId: string;
  payer: string;
  amount: number;
  participants: string[];
  description: string;
  timestamp: number;
};

export type participant = {
  name: string;
  address: string;
};
