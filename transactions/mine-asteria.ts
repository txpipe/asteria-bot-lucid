import {
  Data,
  toUnit,
  TxHash,
  Constr,
  UTxO,
  Script,
} from "https://deno.land/x/lucid@0.10.7/mod.ts";
import { fetchReferenceScript, lucidBase } from "./utils.ts";
import {
  AssetClassT,
  AsteriaDatum,
  AsteriaDatumT,
  ShipDatum,
  ShipDatumT,
} from "./types.ts";

async function mineAsteria(
  asteriaRefTxHash: string,
  spacetimeRefTxHash: string,
  admin_token: AssetClassT,
  max_asteria_mining: bigint,
  ship_tx_hash: TxHash
): Promise<TxHash> {
  const lucid = await lucidBase();
  const seed = Deno.env.get("SEED");
  if (!seed) {
    throw Error("Unable to read wallet's seed from env");
  }
  lucid.selectWalletFromSeed(seed);

  const spacetimeRef = await fetchReferenceScript(lucid, spacetimeRefTxHash);
  const spacetimeValidator = spacetimeRef.scriptRef as Script;

  const asteriaRef = await fetchReferenceScript(lucid, asteriaRefTxHash);
  const asteriaValidator = asteriaRef.scriptRef as Script;
  const asteriaAddressBech32 = lucid.utils.validatorToAddress(asteriaValidator);

  const shipyardPolicyId = lucid.utils.mintingPolicyToId(spacetimeValidator);

  const ship: UTxO = (
    await lucid.utxosByOutRef([
      {
        txHash: ship_tx_hash,
        outputIndex: 0,
      },
    ])
  )[0];
  if (!ship.datum) {
    throw Error("Ship datum not found");
  }
  const shipInputDatum = Data.from<ShipDatumT>(
    ship.datum as string,
    ShipDatum as unknown as ShipDatumT
  );

  const asteria: UTxO = (await lucid.utxosAt(asteriaAddressBech32))[0];
  if (!asteria.datum) {
    throw Error("Asteria datum not found");
  }
  const rewards = asteria.assets.lovelace - 2_000_000n;
  const minedRewards = BigInt(
    (Number(rewards) * Number(max_asteria_mining)) / 100
  );

  const asteriaInputDatum = Data.from<AsteriaDatumT>(
    asteria.datum as string,
    AsteriaDatum as unknown as AsteriaDatumT
  );
  const asteriaInfo = {
    ship_counter: asteriaInputDatum.ship_counter,
    shipyard_policy: shipyardPolicyId,
  };
  const asteriaOutputDatum = Data.to<AsteriaDatumT>(
    asteriaInfo,
    AsteriaDatum as unknown as AsteriaDatumT
  );

  const adminTokenUnit = toUnit(admin_token.policy, admin_token.name);
  const shipTokenUnit = toUnit(
    shipyardPolicyId,
    shipInputDatum.ship_token_name
  );
  const pilotTokenUnit = toUnit(
    shipyardPolicyId,
    shipInputDatum.pilot_token_name
  );

  const shipRedeemer = Data.to(new Constr(1, [new Constr(2, [])]));
  const asteriaRedeemer = Data.to(new Constr(1, []));
  const burnRedeemer = Data.to(new Constr(1, []));
  const tx = await lucid
    .newTx()
    .mintAssets(
      {
        [shipTokenUnit]: BigInt(-1),
      },
      burnRedeemer
    )
    .collectFrom([ship], shipRedeemer)
    .collectFrom([asteria], asteriaRedeemer)
    .readFrom([spacetimeRef, asteriaRef])
    .payToContract(
      asteriaAddressBech32,
      { inline: asteriaOutputDatum },
      {
        [adminTokenUnit]: BigInt(1),
        lovelace: rewards - minedRewards + 2_000_000n,
      }
    )
    .payToAddress(await lucid.wallet.address(), {
      [pilotTokenUnit]: BigInt(1),
      lovelace: 1_500_000n,
    })
    .complete();

  const signedTx = await tx.sign().complete();
  return signedTx.submit();
}

export { mineAsteria };
