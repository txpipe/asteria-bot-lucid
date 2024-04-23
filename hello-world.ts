import { fromText } from "https://deno.land/x/lucid@0.10.7/mod.ts";
import { moveShip } from "./transactions/move-ship.ts";
import { createShip } from "./transactions/create-ship.ts";
import { AssetClassT } from "./transactions/types.ts";

// Challenge parameters, these are defined by the administrators, you can find this on the
const ASTERIA_SCRIPT_INPUT =
  "48eefd160b9114e80dea85404446947e5e15d19e96914ce1182b05ee7a36fd98";
const SPACETIME_SCRIPT_INPUT =
  "1af0fb23fb9b1a16e31c7f46bbf6f2464fc4f1795773cd8a9425133ba46c8540";
const FUEL_SCRIPT_INPUT =
  "eb2f88f353163aeb0abcafa040b6e6d8f64ea39c5064134061b44fd3bedb23a9";
const FUEL_PER_STEP = 1n;
const INITIAL_FUEL = 30n;
const PARTICIPATION_FEE = 3000n;
const CHALLENGE_TOKEN: AssetClassT = {
  policy: "0298aa99f95e2fe0a0132a6bb794261fb7e7b0d988215da2f2de2005",
  name: fromText("tokenA"),
};

// Ship parameters, these are defined by the participant when starting the challenge.
const INITIAL_POS_X = 20n;
const INITIAL_POS_Y = -13n;

const txHash = await createShip(
  ASTERIA_SCRIPT_INPUT,
  SPACETIME_SCRIPT_INPUT,
  CHALLENGE_TOKEN,
  PARTICIPATION_FEE,
  INITIAL_FUEL,
  INITIAL_POS_X,
  INITIAL_POS_Y
);

console.log(txHash);

// const delta_x = 2n;
// const delta_y = -3n;
// const ship_token_name = fromText("SHIP0");
// const pilot_token_name = fromText("PILOT0");
// const shipTxHash =
//   "ca30a841e582f284b7b71d39c2cbc8b9a7fca9476d921b6b9d97c0c7e31bf2bc";

// const txHash = await moveShip(
//   SPACETIME_SCRIPT_INPUT,
//   FUEL_PER_STEP,
//   delta_x,
//   delta_y,
//   ship_token_name,
//   pilot_token_name,
//   shipTxHash
// );

// console.log(txHash);
