import { Lucid, Blockfrost } from "https://deno.land/x/lucid@0.10.7/mod.ts";

export const lucidBase = async (): Promise<Lucid> => {
  const PROJECT_ID = Deno.env.get("BLOCKFROST_PROJECT_ID");

  if (!PROJECT_ID) {
    throw Error("Missing BLOCKFROST_PROJECT_ID env");
  }

  const lucid = await Lucid.new(
    new Blockfrost(
      "https://cardano-preview.blockfrost.io/api/v0",
      PROJECT_ID
    ),
    "Preview"
  );
  return lucid;
};

export function writeJson(path: string, data: object): string {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data));
    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}

const abs = (n: bigint) => (n < 0n ? -n : n);

export async function fetchReferenceScript(lucid: Lucid, txhash: string) {
  const ref = await lucid.utxosByOutRef([
    {
      txHash: txhash,
      outputIndex: 0,
    },
  ]);

  if (!ref[0].scriptRef) {
    throw Error("Could not read validator from ref UTxO");
  }

  return ref[0];
}

export function distance(delta_x: bigint, delta_y: bigint): bigint {
  return abs(delta_x) + abs(delta_y);
}

export function required_fuel(distance: bigint, fuel_per_step: bigint): bigint {
  return distance * fuel_per_step;
}
