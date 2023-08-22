import { KnownArchivesEVM, lookupArchive } from "@subsquid/archive-registry";
import { DataSource } from "@subsquid/evm-processor";
import { Archives, Range } from "../types";

export const ARCHIVE: KnownArchivesEVM | undefined = process.env.ARCHIVE as KnownArchivesEVM;
const ETH_MAINNET = "eth-mainnet";
const ETH_GOERLI = "goerli";

const DATASOURCES: Archives<DataSource> = {
  [ETH_MAINNET]: {
    archive: `https://v2.archive.subsquid.io/network/ethereum-mainnet`,
    chain: "https://eth-mainnet.public.blastapi.io",
  },
  [ETH_GOERLI]: {
    archive: `https://v2.archive.subsquid.io/network/ethereum-goerli`,
    chain: "https://eth-goerli.public.blastapi.io",
  },
};

// Token Contract Address that we want to index
const TOKEN_CONTRACT_ADDRESSES: Archives = {
  [ETH_MAINNET]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984".toLowerCase(),
  [ETH_GOERLI]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984".toLowerCase(),
};

// blocks range from we want to search data
const BLOCKS_RANGES: Archives<Range> = {
  [ETH_MAINNET]: { from: 10_861_674 },
  [ETH_GOERLI]: { from: 10_861_674 },
};

export const DATASOURCE = DATASOURCES[ARCHIVE];
export const TOKEN_CONTRACT_ADDRESS = TOKEN_CONTRACT_ADDRESSES[ARCHIVE];
export const BLOCKS_RANGE = BLOCKS_RANGES[ARCHIVE];
