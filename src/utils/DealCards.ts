import {Card, Hand} from './types';

let cardDraw = 2;
let currHand: Hand = [];

export const SetHand = (hand: Hand) => {
  currHand = hand;
  cardDraw = 2;
};

export const Hit = () => {
  cardDraw++;
};

const Stand = () => {};

export const DealCards = (): Hand => {
  let returnArr = currHand.slice(0, cardDraw);
  return returnArr;
};
