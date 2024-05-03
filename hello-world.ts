import { fromText } from "https://deno.land/x/lucid@0.10.7/mod.ts";
import { moveShip } from "./transactions/move-ship.ts";
import { createShip } from "./transactions/create-ship.ts";
import { AssetClassT } from "./transactions/types.ts";
import { gatherFuel } from "./transactions/gather-fuel.ts";
import { mineAsteria } from "./transactions/mine-asteria.ts";
import { quit } from "./transactions/quit.ts";

// Challenge parameters, these are defined by the administrators, you can find this on the

// Reference scripts for:
// const admin_token: AssetClassT = {
//   policy: "516238dd0a79bac4bebe041c44bad8bf880d74720733d2fc0d255d28",
//   name: fromText("asteriaAdmin"),
// };
// const ship_mint_lovelace_fee = 20_000_000n;
// const max_asteria_mining = 100n;
// const max_moving_distance = 5n;
// const max_ship_fuel = 30n;
// const fuel_per_step = 1n;
// const initial_fuel = max_ship_fuel;
// const min_asteria_distance = 50n;
// // const ASTERIA_SCRIPT_INPUT =
// //   "3529d7a7e2790353f14685ab0f982468998fca03f3481612991f4881b08c6999";
// // const SPACETIME_SCRIPT_INPUT =
// //   "2b11371fbcdb58359a095ea7d5b1cfab555dd4bbdbe8afc4dfb9d5d41acc2116";
// // const FUEL_SCRIPT_INPUT =
// //   "9176cdea9dc208593a88267fd11a6901f8b26f788644d563511261e52fd2b513";

// Reference scripts for:
// const admin_token: AssetClassT = {
//   policy: "516238dd0a79bac4bebe041c44bad8bf880d74720733d2fc0d255d28",
//   name: fromText("asteriaAdmin"),
// };
// const ship_mint_lovelace_fee = 3_000_000n;
// const max_asteria_mining = 50n;
// const max_moving_distance = 20n;
// const max_ship_fuel = 100n;
// const fuel_per_step = 1n;
// const initial_fuel = 30n;
// const min_asteria_distance = 10n;
const ASTERIA_SCRIPT_INPUT =
  "dcd00652639102add179934c51f2e1dfb3a33150ddbe3db1049b407bbe806ddf";
const SPACETIME_SCRIPT_INPUT =
  "cd258c77661b03c62fc14a5947bd22da6093fed9e4202eb15b25629def1cbc6c";
const FUEL_SCRIPT_INPUT =
  "ac987b40e57f1e11150febf9cf2d14524ea185f4a2ab8e3d6d91399faaa56a30";

const FUEL_PER_STEP = 1n;
const INITIAL_FUEL = 30n;
const PARTICIPATION_FEE = 3_000_000n;
const MAX_ASTERIA_MINING = 50n;
const CHALLENGE_TOKEN: AssetClassT = {
  policy: "516238dd0a79bac4bebe041c44bad8bf880d74720733d2fc0d255d28",
  name: fromText("asteriaAdmin"),
};

// CREATE SHIP
// Ship parameters, these are defined by the participant when starting the challenge.
const INITIAL_POS_X = 7n;
const INITIAL_POS_Y = -4n;
const txHash1 = await createShip(
  ASTERIA_SCRIPT_INPUT,
  SPACETIME_SCRIPT_INPUT,
  CHALLENGE_TOKEN,
  PARTICIPATION_FEE,
  INITIAL_FUEL,
  INITIAL_POS_X,
  INITIAL_POS_Y
);
console.log(txHash1);

// GATHER FUEL
// const gather_amount = 20n;
// const ship_tx_hash =
//   "66c4bcda552ced6687c276b120a0f3372d0998f0872aceed14f423ce36118228";
// const pellet_tx_hash =
//   "de0dea63a13d4d73cc810405800e126a9de02bfe67845731ad57501bc830afaa";
// const pellet_tx_index = 0;
// const txHash2 = await gatherFuel(
//   SPACETIME_SCRIPT_INPUT,
//   FUEL_SCRIPT_INPUT,
//   CHALLENGE_TOKEN,
//   gather_amount,
//   ship_tx_hash,
//   pellet_tx_hash,
//   pellet_tx_index
// );
// console.log(txHash2);

// MOVE SHIP
// const delta_x = -7n;
// const delta_y = 4n;
// const shipTxHash =
//   "574f86b020bce2777d697a9f94b37c18b2258ffa7599356e4699bb73794eb019";
// const txHash3 = await moveShip(
//   SPACETIME_SCRIPT_INPUT,
//   FUEL_PER_STEP,
//   delta_x,
//   delta_y,
//   shipTxHash
// );
// console.log(txHash3);

// MINE ASTERIA
// const ship_tx_hash =
//   "843d0728f7fb47c5780b096348d47c55340fc0d86096c9debd1361e9dd30fa39";
// const txHash4 = await mineAsteria(
//   ASTERIA_SCRIPT_INPUT,
//   SPACETIME_SCRIPT_INPUT,
//   CHALLENGE_TOKEN,
//   MAX_ASTERIA_MINING,
//   ship_tx_hash
// );
// console.log(txHash4);

// QUIT
// const ship_tx_hash =
//   "51f192b9fc459e261721b644d72976089f0eae4fad051aabd31d266b4848bdaa";
// const txHash5 = await quit(SPACETIME_SCRIPT_INPUT, ship_tx_hash);
// console.log(txHash5);
