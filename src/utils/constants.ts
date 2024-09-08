import { chipUpgrades } from "./chipUpgrades";
import { Card, SaveObj } from "./types";

export const COLORS = {
  black: "#000000",
  tableGreen: "#35654d",
  tableDarkGreen: "#2e4d3e",
  cardRed: "#e51924",
  cardBlack: "#0a0a09",
  hitRed: "#ff0000",
  hitDarkRed: "#b30000",
  standGreen: "#00eb33",
  standDarkGreen: "#00b300",
  white: "#ffffff",
  winGreen: "#02e00d",
  lossRed: "#d9142e",
  pushYellow: "#d9c814",
  tableBrown: "#7c3f00",
  tableDarkBrown: "#633200",
  gold: "#d4af37",
  moneyGreen: "#157811",
  gray: "#A9A9A9",
};

export const winText: string[] = ["You Win!", "Groovy", "Victory!", "You are so good at this game", "Lucky", "Close one", "The new blackjack ninja"];

export const lossText: string[] = ["You Loss", ":(", "Git Gud", "Unlucky", "House always wins", "House Wins", "Don't quit your day job", "For Real?"];

const GetChipUpgrades = (upgrades: any[]): [number, number][] => {
  let tempArr: any[] = [];
  upgrades.forEach(e => {
    e.data.forEach((j: any) => {
      tempArr.push([j.currLevel, j.cost]);
    });
  });
  return tempArr;
};

export const newSave: SaveObj = {
  chips: { chips: 0, goldChips: 0 },
  level: { playerLevel: 0, currXp: 0, xpGain: 1 },
  upgrades: GetChipUpgrades(chipUpgrades),
  totalUpgrades: 0,
  currXp: 0,
  affects: {
    winChips: 10,
    lossChips: 0,
    pushChips: 0,
    xMulti: 1,
    goldChipChance: 0,
    lossXMulti: 1,
    xpGain: 1,
  },
};

export const defaultDeck: Card[] = [
  { suit: "hearts", title: "2", value: 2 },
  { suit: "hearts", title: "3", value: 3 },
  { suit: "hearts", title: "4", value: 4 },
  { suit: "hearts", title: "5", value: 5 },
  { suit: "hearts", title: "6", value: 6 },
  { suit: "hearts", title: "7", value: 7 },
  { suit: "hearts", title: "8", value: 8 },
  { suit: "hearts", title: "9", value: 9 },
  { suit: "hearts", title: "10", value: 10 },
  { suit: "hearts", title: "J", value: 10 },
  { suit: "hearts", title: "Q", value: 10 },
  { suit: "hearts", title: "K", value: 10 },
  { suit: "hearts", title: "A", value: 11 },
  { suit: "diamonds", title: "2", value: 2 },
  { suit: "diamonds", title: "3", value: 3 },
  { suit: "diamonds", title: "4", value: 4 },
  { suit: "diamonds", title: "5", value: 5 },
  { suit: "diamonds", title: "6", value: 6 },
  { suit: "diamonds", title: "7", value: 7 },
  { suit: "diamonds", title: "8", value: 8 },
  { suit: "diamonds", title: "9", value: 9 },
  { suit: "diamonds", title: "10", value: 10 },
  { suit: "diamonds", title: "J", value: 10 },
  { suit: "diamonds", title: "Q", value: 10 },
  { suit: "diamonds", title: "K", value: 10 },
  { suit: "diamonds", title: "A", value: 11 },
  { suit: "clubs", title: "2", value: 2 },
  { suit: "clubs", title: "3", value: 3 },
  { suit: "clubs", title: "4", value: 4 },
  { suit: "clubs", title: "5", value: 5 },
  { suit: "clubs", title: "6", value: 6 },
  { suit: "clubs", title: "7", value: 7 },
  { suit: "clubs", title: "8", value: 8 },
  { suit: "clubs", title: "9", value: 9 },
  { suit: "clubs", title: "10", value: 10 },
  { suit: "clubs", title: "J", value: 10 },
  { suit: "clubs", title: "Q", value: 10 },
  { suit: "clubs", title: "K", value: 10 },
  { suit: "clubs", title: "A", value: 11 },
  { suit: "spades", title: "2", value: 2 },
  { suit: "spades", title: "3", value: 3 },
  { suit: "spades", title: "4", value: 4 },
  { suit: "spades", title: "5", value: 5 },
  { suit: "spades", title: "6", value: 6 },
  { suit: "spades", title: "7", value: 7 },
  { suit: "spades", title: "8", value: 8 },
  { suit: "spades", title: "9", value: 9 },
  { suit: "spades", title: "10", value: 10 },
  { suit: "spades", title: "J", value: 10 },
  { suit: "spades", title: "Q", value: 10 },
  { suit: "spades", title: "K", value: 10 },
  { suit: "spades", title: "A", value: 11 },
];
