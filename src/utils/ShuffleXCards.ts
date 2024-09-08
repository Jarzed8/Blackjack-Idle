import {defaultDeck} from './constants';
import {Hand} from './types';

export const ShuffleXCards = (amount: number): Hand => {
  let i = 0;
  let b = 0;
  let selectedCards = [];
  let selectedIndex: number[] = [];
  let deck = defaultDeck;
  const deckLength = deck.length;

  while (i <= amount && b <= 50) {
    const randIndex = Math.floor(Math.random() * deckLength);
    if (!selectedIndex.includes(randIndex)) {
      selectedIndex.push(randIndex);
      selectedCards.push(deck[randIndex]);
      i++;
    }
    b++;
  }
  return selectedCards;
};
