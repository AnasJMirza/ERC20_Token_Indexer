import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './UNI_ABI.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, amount: bigint] & {owner: string, spender: string, amount: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    DelegateChanged: new LogEvent<([delegator: string, fromDelegate: string, toDelegate: string] & {delegator: string, fromDelegate: string, toDelegate: string})>(
        abi, '0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f'
    ),
    DelegateVotesChanged: new LogEvent<([delegate: string, previousBalance: bigint, newBalance: bigint] & {delegate: string, previousBalance: bigint, newBalance: bigint})>(
        abi, '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'
    ),
    MinterChanged: new LogEvent<([minter: string, newMinter: string] & {minter: string, newMinter: string})>(
        abi, '0x3b0007eb941cf645526cbb3a4fdaecda9d28ce4843167d9263b536a1f1edc0f6'
    ),
    Transfer: new LogEvent<([from: string, to: string, amount: bigint] & {from: string, to: string, amount: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    DELEGATION_TYPEHASH: new Func<[], {}, string>(
        abi, '0xe7a324dc'
    ),
    DOMAIN_TYPEHASH: new Func<[], {}, string>(
        abi, '0x20606b70'
    ),
    PERMIT_TYPEHASH: new Func<[], {}, string>(
        abi, '0x30adf81f'
    ),
    allowance: new Func<[account: string, spender: string], {account: string, spender: string}, bigint>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, rawAmount: bigint], {spender: string, rawAmount: bigint}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, bigint>(
        abi, '0x70a08231'
    ),
    checkpoints: new Func<[_: string, _: number], {}, ([fromBlock: number, votes: bigint] & {fromBlock: number, votes: bigint})>(
        abi, '0xf1127ed8'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    delegate: new Func<[delegatee: string], {delegatee: string}, []>(
        abi, '0x5c19a95c'
    ),
    delegateBySig: new Func<[delegatee: string, nonce: bigint, expiry: bigint, v: number, r: string, s: string], {delegatee: string, nonce: bigint, expiry: bigint, v: number, r: string, s: string}, []>(
        abi, '0xc3cda520'
    ),
    delegates: new Func<[_: string], {}, string>(
        abi, '0x587cde1e'
    ),
    getCurrentVotes: new Func<[account: string], {account: string}, bigint>(
        abi, '0xb4b5ea57'
    ),
    getPriorVotes: new Func<[account: string, blockNumber: bigint], {account: string, blockNumber: bigint}, bigint>(
        abi, '0x782d6fe1'
    ),
    minimumTimeBetweenMints: new Func<[], {}, number>(
        abi, '0x5c11d62f'
    ),
    mint: new Func<[dst: string, rawAmount: bigint], {dst: string, rawAmount: bigint}, []>(
        abi, '0x40c10f19'
    ),
    mintCap: new Func<[], {}, number>(
        abi, '0x76c71ca1'
    ),
    minter: new Func<[], {}, string>(
        abi, '0x07546172'
    ),
    mintingAllowedAfter: new Func<[], {}, bigint>(
        abi, '0x30b36cef'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[_: string], {}, bigint>(
        abi, '0x7ecebe00'
    ),
    numCheckpoints: new Func<[_: string], {}, number>(
        abi, '0x6fcfff45'
    ),
    permit: new Func<[owner: string, spender: string, rawAmount: bigint, deadline: bigint, v: number, r: string, s: string], {owner: string, spender: string, rawAmount: bigint, deadline: bigint, v: number, r: string, s: string}, []>(
        abi, '0xd505accf'
    ),
    setMinter: new Func<[minter_: string], {minter_: string}, []>(
        abi, '0xfca3b5aa'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[dst: string, rawAmount: bigint], {dst: string, rawAmount: bigint}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[src: string, dst: string, rawAmount: bigint], {src: string, dst: string, rawAmount: bigint}, boolean>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    DELEGATION_TYPEHASH(): Promise<string> {
        return this.eth_call(functions.DELEGATION_TYPEHASH, [])
    }

    DOMAIN_TYPEHASH(): Promise<string> {
        return this.eth_call(functions.DOMAIN_TYPEHASH, [])
    }

    PERMIT_TYPEHASH(): Promise<string> {
        return this.eth_call(functions.PERMIT_TYPEHASH, [])
    }

    allowance(account: string, spender: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [account, spender])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    checkpoints(arg0: string, arg1: number): Promise<([fromBlock: number, votes: bigint] & {fromBlock: number, votes: bigint})> {
        return this.eth_call(functions.checkpoints, [arg0, arg1])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    delegates(arg0: string): Promise<string> {
        return this.eth_call(functions.delegates, [arg0])
    }

    getCurrentVotes(account: string): Promise<bigint> {
        return this.eth_call(functions.getCurrentVotes, [account])
    }

    getPriorVotes(account: string, blockNumber: bigint): Promise<bigint> {
        return this.eth_call(functions.getPriorVotes, [account, blockNumber])
    }

    minimumTimeBetweenMints(): Promise<number> {
        return this.eth_call(functions.minimumTimeBetweenMints, [])
    }

    mintCap(): Promise<number> {
        return this.eth_call(functions.mintCap, [])
    }

    minter(): Promise<string> {
        return this.eth_call(functions.minter, [])
    }

    mintingAllowedAfter(): Promise<bigint> {
        return this.eth_call(functions.mintingAllowedAfter, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(arg0: string): Promise<bigint> {
        return this.eth_call(functions.nonces, [arg0])
    }

    numCheckpoints(arg0: string): Promise<number> {
        return this.eth_call(functions.numCheckpoints, [arg0])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }
}
