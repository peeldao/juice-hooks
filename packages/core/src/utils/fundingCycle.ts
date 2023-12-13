import { MAX_DISCOUNT_RATE } from "../constants";

export function getNextCycleWeight(currentCycle: {
  weight: bigint;
  discountRate: bigint;
}) {
  const nextCycleWeight =
    (currentCycle.weight * (MAX_DISCOUNT_RATE - currentCycle.discountRate)) /
    MAX_DISCOUNT_RATE;

  return nextCycleWeight;
}

export function getPrevCycleWeight(currentCycle: {
  weight: bigint;
  discountRate: bigint;
}) {
  // reverse of getNextCycleWeight
  const prevCycleWeight =
    (currentCycle.weight * MAX_DISCOUNT_RATE) /
    (MAX_DISCOUNT_RATE - currentCycle.discountRate);

  return prevCycleWeight;
}
