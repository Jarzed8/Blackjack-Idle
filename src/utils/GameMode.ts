import { ShuffleXCards } from "./ShuffleXCards";
import { Hand, WinStates } from "./types";

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
export let HOUSETURN: boolean = false;
let houseCardDraw = 2;
let playerCardDraw = 2;
let houseHand: Hand = ShuffleXCards(20);
let playerHand: Hand = ShuffleXCards(20);
let houseScore = 0;
let playerScore = 0;

export const ChangeHouseTurn = (turn: boolean) => {
  HOUSETURN = turn;
};

export const StartGame = () => {
  houseHand = ShuffleXCards(20);
  playerHand = ShuffleXCards(20);
  houseCardDraw = 2;
  playerCardDraw = 2;
  HOUSETURN = false;
};

export const GetHouseHand = () => {
  return houseHand;
};

export const GetPlayerHand = () => {
  return playerHand;
};

export const DealPlayerCards = (): Hand => {
  let returnArr = playerHand.slice(0, playerCardDraw);
  return returnArr;
};

export const DealHouseCards = (): Hand => {
  let returnArr = houseHand.slice(0, houseCardDraw);
  return returnArr;
};

// GetPlayerScore and GetHouseScore do the same thing should probably fix at some point
export const GetPlayerScore = (): [number, number] => {
  let hand = playerHand.slice(0, playerCardDraw);
  let hasAce = false;
  let scoreA = 0;
  let scoreB = 0;

  hand.forEach(card => {
    if (card.title === "A" && !hasAce) {
      hasAce = true;
      scoreA += card.value;
    } else {
      if (card.title === "A") {
        scoreA += 1;
      } else {
        scoreA += card.value;
      }
    }
  });

  if (hasAce) {
    hand.forEach(card => {
      if (card.title === "A") {
        scoreB += 1;
      } else {
        scoreB += card.value;
      }
    });
  }

  return [scoreA, scoreB];
};

export const GetHouseScore = (): [number, number] => {
  let hand = houseHand.slice(0, houseCardDraw);
  let hasAce = false;
  let scoreA = 0; //Big
  let scoreB = 0; //Small

  if (HOUSETURN) {
    hand.forEach(card => {
      if (card.title === "A" && !hasAce) {
        hasAce = true;
        scoreA += card.value;
      } else {
        if (card.title === "A") {
          scoreA += 1;
        } else {
          scoreA += card.value;
        }
      }
    });

    if (hasAce) {
      hand.forEach(card => {
        if (card.title === "A") {
          scoreB += 1;
        } else {
          scoreB += card.value;
        }
      });
    }
  } else {
    scoreA = houseHand[0].value;
  }
  return [scoreA, scoreB];
};

export const PlayerHit = () => {
  playerCardDraw++;
  return DealPlayerCards();
};

export const PlayerStand = () => {
  HOUSETURN = true;
};

export const HouseHit = () => {
  houseCardDraw++;
  houseHand = GetHouseHand();
};

export const HouseStand = () => {
  HOUSETURN = false;
  // check to see who wins
};

// hit if [0] < 16
// hit if [0] > 21 && [1] < 16 && [1] !== 0

export const HousePlay = async (): Promise<boolean> => {
  const houseScore = GetHouseScore();
  // Returns true if house hits
  // The house hits anything under 17 and stands otherwise
  // House should hit on a soft 17
  await delay(500);
  if (houseScore[0] < 17) {
    HouseHit();
    return true;
  } else if (houseScore[0] > 21 && houseScore[1] < 17 && houseScore[1] !== 0) {
    HouseHit();
    return true;
  } else {
    // House stands
    return false;
  }
};

export const GetWinner = (): WinStates => {
  let houseScore = 0;
  let playerScore = 0;

  // Check to use big or small number for scoring
  if (GetHouseScore()[0] > 21 && GetHouseScore()[1] !== 0) {
    houseScore = GetHouseScore()[1]; // small
  } else {
    houseScore = GetHouseScore()[0]; //big
  }

  if (GetPlayerScore()[0] > 21 && GetPlayerScore()[1] !== 0) {
    playerScore = GetPlayerScore()[1];
  } else {
    playerScore = GetPlayerScore()[0];
  }

  if (houseScore > 21 && playerScore > 21) {
    return "push";
  } else if (houseScore === playerScore) {
    return "push";
  } else if (houseScore <= 21 && playerScore > 21) {
    return "houseWins";
  } else if (houseScore > 21 && playerScore <= 21) {
    return "playerWins";
  } else if (houseScore > playerScore) {
    return "houseWins";
  } else if (houseScore < playerScore) {
    return "playerWins";
  } else {
    console.warn("GetWinner() didn't work ");
    return "push";
  }
};
