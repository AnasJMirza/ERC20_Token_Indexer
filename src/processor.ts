import { lookupArchive } from "@subsquid/archive-registry";
import * as UNI_ABI from "./abi/UNI_ABI";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";

export const TOKEN_CONTRACT_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984".toLocaleLowerCase();

export const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive("eth-mainnet"),
    chain: "https://rpc.ankr.com/eth",
  })
  .setFinalityConfirmation(75)
  .setBlockRange({ from: 10_861_674 })
  .addLog({
    address: [TOKEN_CONTRACT_ADDRESS],
    topic0: [UNI_ABI.events.Transfer.topic],
  })
  .setFields({
    log: {
      topics: true,
      data: true,
      transactionHash: true,
    },
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
