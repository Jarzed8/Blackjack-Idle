export type Card = {
  suit: "spades" | "diamonds" | "clubs" | "hearts";
  title: "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
  value: number;
};

export type Hand = Card[];

export type WinStates = "playerWins" | "houseWins" | "push";

export enum GoldChipUpgrades {
  MultiCardMulti = 1,
}

export type PlayerCard = {
  card: Card;
  onPress?: () => undefined;
  disabled?: boolean;
  flipped?: boolean;
};

export type ChipUpgrade = {
  title: string;
  description: string;
  levels: number;
  onPress: any[];
  levelmulti: number;
  cost: number;
  currLevel: number;
  index: number;
};

export type SaveObj = {
  chips: { chips: number; goldChips: number };
  level: { playerLevel: number; xpGain: number; currXp: number };
  upgrades: [number, number][];
  totalUpgrades: number;
  currXp: number;
  affects: {
    winChips: number;
    lossChips: number;
    pushChips: number;
    xMulti: number;
    goldChipChance: number;
    lossXMulti: number;
    xpGain: number;
  };
};
