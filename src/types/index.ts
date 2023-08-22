import { KnownArchivesEVM } from "@subsquid/archive-registry";

export type Archives<T = string> = Partial<Record<KnownArchivesEVM, T>>;

export interface Range {
  /**
   * Start of segment (inclusive)
   */
  from: number;
  /**
   * End of segment (inclusive). Defaults to infinity.
   */
  to?: number;
}

export interface TransferEvent {
  type: "Transfer";
  item: {
    id: string;
    from: string;
    to: string;
    amount: bigint;
    timeStamp: Date;
    blockNumber: number;
    txHash: string;
  };
}

export interface UserData {
  id: string;
  address: string;
  balance: bigint;
}

export type EventData = TransferEvent;
