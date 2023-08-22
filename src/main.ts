import { TypeormDatabase } from "@subsquid/typeorm-store";
import { processor } from "./processor";
import { parseUnits, formatUnits } from "ethers";
import * as UNI_ABI from "./abi/UNI_ABI";
import { Transfer, User } from "./model";
import { TOKEN_CONTRACT_ADDRESS } from "./constants";
import { EntityManager } from "./utils/entity-manager";
import { PrefetchFactory } from "./mappings/prefetchFactory";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const entityManager = new EntityManager(ctx.store);
  const factory = new PrefetchFactory(ctx, entityManager);
  await factory.prefetch();

  if (!entityManager.hasData()) return;
  for (const item of factory.eventsData) {
    const transfer = entityManager.get(Transfer, item.item.id, false);
    let user = entityManager.get(User, item.item.to, false);

    user = new User({
      ...user,
      balance: user!.balance + transfer!.amount,
    });

    entityManager.add(user);
  }
  await ctx.store.save(entityManager.values(User));
  await ctx.store.save(entityManager.values(Transfer));
});
