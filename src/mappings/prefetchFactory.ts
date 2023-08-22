import { last, uniq } from "lodash";
import { BlockContext } from "../abi/abi.support";
import { ProcessorContext } from "../processor";
import { EntityManager } from "../utils/entity-manager";
import { EventData, TransferEvent, UserData } from "../types";
import * as UNI_ABI from "../abi/UNI_ABI";
import { Transfer, User } from "../model";

export class PrefetchFactory {
  readonly blockCtx: BlockContext = { _chain: this.ctx._chain, block: last(this.ctx.blocks)!.header };
  eventsData: ReadonlyArray<EventData> = [];

  constructor(private ctx: ProcessorContext, private entityManager: EntityManager) {}

  async prefetch(): Promise<void> {
    this.eventsData = await this.processEventLogs();
    if (this.eventsData.length === 0) return;
    await Promise.all([this.prefetchTransfers(), this.prefetchUsers()]);
  }

  private getEventData<T extends EventData["type"]>(type: T) {
    return this.eventsData.filter((x) => x.type === type) as Extract<EventData, { type: T }>[];
  }

  private async processEventLogs(): Promise<EventData[]> {
    return Promise.all(
      this.ctx.blocks.flatMap((block) =>
        block.logs.map(async (log) => {
          if (log.topics[0].toLowerCase() === UNI_ABI.events.Transfer.topic.toLowerCase()) {
            const { from, to, amount } = UNI_ABI.events.Transfer.decode(log);
            const data: TransferEvent = {
              type: "Transfer",
              item: {
                id: log.id,
                from: from.toLowerCase(),
                to: to.toLowerCase(),
                amount,
                timeStamp: new Date(block.header.timestamp),
                blockNumber: block.header.height,
                txHash: log.transactionHash,
              },
            };

            return data;
          }
          return null as never;
        })
      )
    ).then((data) => data.filter((x) => x));
  }

  private async prefetchTransfers(): Promise<void> {
    const transferIds = uniq(
      this.eventsData.flatMap((data) => {
        return data.item.id;
      })
    );

    this.entityManager.defer(Transfer, ...transferIds);
    await this.entityManager.load(Transfer);

    const uncashedIds = transferIds.filter((id) => !this.entityManager.has(Transfer, id));

    // create
    const TransferEventData = this.getEventData("Transfer");
    for (const id of uncashedIds) {
      const data = TransferEventData.find((x) => x.item.id === id)?.item;
      const transfer = new Transfer({
        id: id,
        from: data?.from,
        to: data?.to,
        amount: data?.amount,
        blockNumber: data?.blockNumber,
        timestamp: data?.timeStamp,
        txHash: data?.txHash,
      });
      this.entityManager.add(transfer);
    }
  }

  private async prefetchUsers(): Promise<void> {
    const userIds = uniq(
      this.eventsData.flatMap((data) => {
        return [data.item.to];
      })
    );

    this.entityManager.defer(User, ...userIds);
    await this.entityManager.load(User);

    const uncashedIds = userIds.filter((id) => !this.entityManager.has(User, id));

    // create
    for (const id of uncashedIds) {
      const user = new User({ id: id, balance: 0n });
      this.entityManager.add(user);
    }
  }
}
