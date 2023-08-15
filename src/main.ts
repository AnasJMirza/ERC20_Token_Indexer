import { TypeormDatabase } from "@subsquid/typeorm-store";
import { TOKEN_CONTRACT_ADDRESS, processor } from "./processor";
import * as UNI_ABI from "./abi/UNI_ABI";
import { Transfer, User } from "./model";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  let transfers: Transfer[] = [];
  let users: User[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address === TOKEN_CONTRACT_ADDRESS && log.topics[0] === UNI_ABI.events.Transfer.topic) {
        const { from, to, amount } = UNI_ABI.events.Transfer.decode(log);

        transfers.push(
          new Transfer({
            id: log.id,
            from,
            to,
            amount,
            timestamp: new Date(block.header.timestamp),
            blockNumber: block.header.height,
            txHash: log.transactionHash,
          })
        );

        // Check if the 'to(user that accepting the token)' user already exists in the database
        let user = await ctx.store.findOne(User, { where: { address: to } });
        if (user) {
          user.balance += amount;
          await ctx.store.save(user);
        } else {
          const newUser = new User({
            id: log.id,
            address: to,
            balance: amount,
          });
          await ctx.store.save(newUser);
        }
      }
    }
  }
  console.log({ transfers });
  console.log({ users });

  await ctx.store.insert(transfers);
});
