import { fromText } from "https://deno.land/x/lucid@0.10.7/mod.ts";
import { moveShip } from "./transactions/move-ship.ts";
import { createShip } from "./transactions/create-ship.ts";
import { AssetClassT } from "./transactions/types.ts";

// Challenge parameters, these are defined by the administrators, you can find this on the
const ASTERIA_SCRIPT_INPUT =
  "3529d7a7e2790353f14685ab0f982468998fca03f3481612991f4881b08c6999";
const SPACETIME_SCRIPT_INPUT =
  "2b11371fbcdb58359a095ea7d5b1cfab555dd4bbdbe8afc4dfb9d5d41acc2116";
const FUEL_SCRIPT_INPUT =
  "9176cdea9dc208593a88267fd11a6901f8b26f788644d563511261e52fd2b513";
const FUEL_PER_STEP = 1n;
const INITIAL_FUEL = 30n;
const PARTICIPATION_FEE = 20_000_000n;
const CHALLENGE_TOKEN: AssetClassT = {
  policy: "516238dd0a79bac4bebe041c44bad8bf880d74720733d2fc0d255d28",
  name: fromText("asteriaAdmin"),
};

// Ship parameters, these are defined by the participant when starting the challenge.
const INITIAL_POS_X = -27n;
const INITIAL_POS_Y = 23n;

const txHash = await createShip(
  ASTERIA_SCRIPT_INPUT,
  SPACETIME_SCRIPT_INPUT,
  CHALLENGE_TOKEN,
  PARTICIPATION_FEE,
  INITIAL_FUEL,
  INITIAL_POS_X,
  INITIAL_POS_Y
);

// console.log(txHash);

// const delta_x = 2n;
// const delta_y = -3n;
// const shipTxHash =
//   "2f6319f702ef26e1213d39dba190f140b41ac57fdf71dc97f711e75052e97304";

// const txHash2 = await moveShip(
//   SPACETIME_SCRIPT_INPUT,
//   FUEL_PER_STEP,
//   delta_x,
//   delta_y,
//   shipTxHash
// );

// console.log(txHash);
