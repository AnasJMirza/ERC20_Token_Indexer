import * as UNI_ABI from "./abi/UNI_ABI";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { ARCHIVE, BLOCKS_RANGE, DATASOURCE, TOKEN_CONTRACT_ADDRESS } from "./constants";
import { lookupArchive } from "@subsquid/archive-registry";
import { Store } from "@subsquid/typeorm-store";

if (!ARCHIVE) {
  throw new Error(`'ARCHIVE' env variable is missing`);
}

if (!DATASOURCE) {
  throw new Error(`'${ARCHIVE}' sqd dataSource is not defined`);
}

export const processor = new EvmBatchProcessor()
  .setDataSource(DATASOURCE)
  .setFinalityConfirmation(10)
  .setBlockRange(BLOCKS_RANGE)
  .addLog({
    address: [TOKEN_CONTRACT_ADDRESS!],
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
export type ProcessorContext = DataHandlerContext<Store, Fields>;
