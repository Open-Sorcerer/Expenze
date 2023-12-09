import {expense, settlingTxnsEntry} from "lib/splitwiseHelper";

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
  walletAddress: string;
  decimal: string;
};

export interface Group {
  groupName: string;
  users: string[];
  groupId: number,
  expenses: expense[];
  settllingTxns: settlingTxnsEntry[];
  groupDescription: string;
}

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
  walletAddress: string;
};
