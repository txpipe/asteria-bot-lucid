import { fromText } from "https://deno.land/x/lucid@0.10.7/mod.ts";
import { moveShip } from "./transactions/move-ship.ts";
import { createShip } from "./transactions/create-ship.ts";
import { AssetClassT } from "./transactions/types.ts";

// Challenge parameters, these are defined by the administrators, you can find this on the
const ASTERIA_SCRIPT_INPUT =
  "c2badd0df205f93fef630785163b86d6872c2190cf4dd7628a3934b89b56f9bb";
const SPACETIME_SCRIPT_INPUT =
  "431aaa1871f6187d3f3ebebafd41ef17f712d3af54c0bba4ff780ed176179603";
const FUEL_SCRIPT_INPUT =
  "87f626782b975a1496d751746b2a78579f9378a4843e00e72c4e9a74f519f24f";
const FUEL_PER_STEP = 1n;
const INITIAL_FUEL = 30n;
const PARTICIPATION_FEE = 20_000_000n;
const CHALLENGE_TOKEN: AssetClassT = {
  policy: "516238dd0a79bac4bebe041c44bad8bf880d74720733d2fc0d255d28",
  name: fromText("asteriaAdmin"),
};

// Ship parameters, these are defined by the participant when starting the challenge.
// const INITIAL_POS_X = 27n;
// const INITIAL_POS_Y = -13n;

// const txHash = await createShip(
//   ASTERIA_SCRIPT_INPUT,
//   SPACETIME_SCRIPT_INPUT,
//   CHALLENGE_TOKEN,
//   PARTICIPATION_FEE,
//   INITIAL_FUEL,
//   INITIAL_POS_X,
//   INITIAL_POS_Y
// );

// console.log(txHash);

const delta_x = 2n;
const delta_y = -3n;
const shipTxHash =
  "a6d08d5edd66b2d511c9e4b1056a055a80094107d90dcdc1e5e9d3018710ef84";

const txHash = await moveShip(
  SPACETIME_SCRIPT_INPUT,
  FUEL_PER_STEP,
  delta_x,
  delta_y,
  shipTxHash
);

console.log(txHash);
