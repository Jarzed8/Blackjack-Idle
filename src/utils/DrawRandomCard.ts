import {defaultDeck} from './constants';
export const DrawRandomCard = (amount?: number) => {
  let deck = defaultDeck;
  const deckLength = deck.length;
  const randIndex = Math.floor(Math.random() * deckLength) + 1;

  //   const randSuit = Math.floor(Math.random() * 4) + 1;
  //   const randValue = Math.floor(Math.random() * 13) + 1;
  //   let suit = '';
  //   let value = '';

  //   switch (randSuit) {
  //     case 1:
  //       suit = 'spades';
  //       break;
  //     case 2:
  //       suit = 'diamonds';
  //       break;
  //     case 3:
  //       suit = 'clubs';
  //       break;
  //     case 4:
  //       suit = 'hearts';
  //       break;
  //   }

  //   switch (randValue) {
  //     case 1:
  //       value = 'A';
  //       break;
  //     case 2:
  //       value = '2';
  //       break;
  //     case 3:
  //       value = '3';
  //       break;
  //     case 4:
  //       value = '4';
  //       break;
  //     case 5:
  //       value = '5';
  //       break;
  //     case 6:
  //       value = '6';
  //       break;
  //     case 7:
  //       value = '7';
  //       break;
  //     case 8:
  //       value = '8';
  //       break;
  //     case 9:
  //       value = '9';
  //       break;
  //     case 10:
  //       value = '10';
  //       break;
  //     case 11:
  //       value = 'J';
  //       break;
  //     case 12:
  //       value = 'Q';
  //       break;
  //     case 13:
  //       value = 'K';
  //       break;
  //   }

  return [suit, value];
};
