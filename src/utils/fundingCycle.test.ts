import { describe, expect, test } from 'vitest'
import { getNextCycleWeight, getPrevCycleWeight } from './fundingCycle';  
import { MAX_DISCOUNT_RATE } from '../constants'; 

import { describe, expect, test } from 'vitest'
import { getNextCycleWeight, getPrevCycleWeight } from './fundingCycle';  

describe("Cycle Weight utilities", () => {

  test.each`
    weight      | discountRate  | expected
    ${100n}     | ${20n}        | ${(100n * (MAX_DISCOUNT_RATE - 20n)) / MAX_DISCOUNT_RATE}
    ${200n}     | ${30n}        | ${(200n * (MAX_DISCOUNT_RATE - 30n)) / MAX_DISCOUNT_RATE}
    ${300n}     | ${0n}         | ${(300n * (MAX_DISCOUNT_RATE - 0n)) / MAX_DISCOUNT_RATE}
    weight      | discountRate         | expected
    ${100n}     | ${200000000n}        | ${80n}
    ${200n}     | ${300000000n}        | ${140n}
    ${300n}     | ${0n}                | ${300n}
  `("computes next cycle weight correctly", ({ weight, discountRate, expected }) => {
    expect(getNextCycleWeight({ weight, discountRate })).toEqual(expected);
  });

  test.each`
    weight      | discountRate         | expected
    ${80n}      | ${200000000n}        | ${100n}
    ${160n}     | ${300000000n}        | ${228n}
    ${300n}     | ${0n}                | ${300n}
  `("computes previous cycle weight correctly", ({ weight, discountRate, expected }) => {
    expect(getPrevCycleWeight({ weight, discountRate })).toEqual(expected);
  });

});
