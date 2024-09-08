import { ChipUpgrade } from "./types";

// Increase winnings
// Increase Bet
// Increase X multi
// Increase XX multi
// Increase loss x multi
// Increase offline earnings
// Increase offline time
// Gold chip chance
// Chance to reveal dealer second card
// Chance to lucky win (double winnings or whatever)

// case 0: increase winning
// case 1: increase lossings
// case 2: increase X multi
// case 3: increase push winnings
// case 4: increase gold chip chance
// case 5: increase xp gain
// case 6: increase loss x multi

export const chipUpgrades: {
  title: string;
  upgradesNeeded: number;
  data: ChipUpgrade[];
}[] = [
  {
    title: "Tier 1",
    upgradesNeeded: 0,
    data: [
      {
        title: "Increase Winnings",
        description: "+2 Winnings",
        levels: 6,
        currLevel: 1,
        onPress: [[0, 2]],
        cost: 10,
        levelmulti: 1.2,
        index: 0,
      },
      {
        title: "Increase Bet",
        description: "+10 Winnings, +10 Loss",
        levels: 6,
        currLevel: 1,
        onPress: [
          [0, 10],
          [1, 10],
        ],
        cost: 50,
        levelmulti: 1.2,
        index: 1,
      },
      {
        title: "Increase XP Gain",
        description: "+1 XP on Win",
        levels: 2,
        currLevel: 1,
        onPress: [5, 1],
        cost: 100,
        levelmulti: 1.5,
        index: 2,
      },
      {
        title: "Increase Multiplier",
        description: "+1x Multi",
        levels: 2,
        currLevel: 1,
        onPress: [[2, 1]],
        cost: 200,
        levelmulti: 1,
        index: 3,
      },
    ],
  },
  {
    title: "Tier 2",
    upgradesNeeded: 10,
    data: [
      {
        title: "Increase Winnings",
        description: "+5 Winnings",
        levels: 6,
        currLevel: 1,
        onPress: [[0, 5]],
        cost: 60,
        levelmulti: 1.2,
        index: 4,
      },
      {
        title: "Increase Bet",
        description: "+25 Winnings, +25 Loss",
        levels: 6,
        currLevel: 1,
        onPress: [
          [0, 25],
          [1, 25],
        ],
        cost: 100,
        levelmulti: 1.5,
        index: 5,
      },
      {
        title: "Offline Earnings",
        description: "+10 Offline Earnings /min",
        levels: 6,
        currLevel: 1,
        onPress: [],
        cost: 50,
        levelmulti: 1.5,
        index: 6,
      },
      {
        title: "Increase Offline Time",
        description: "+30 Mins Offline Time",
        levels: 4,
        currLevel: 1,
        onPress: [],
        cost: 150,
        levelmulti: 1.5,
        index: 7,
      },
    ],
  },
  {
    title: "Tier 3",
    upgradesNeeded: 20,
    data: [
      {
        title: "Increase Winnings",
        description: "+10 Winnings",
        levels: 6,
        currLevel: 1,
        onPress: [[0, 10]],
        cost: 50,
        levelmulti: 1.2,
        index: 8,
      },
      {
        title: "Increase Push Winnings",
        description: "+200 Winnings on Push",
        levels: 3,
        currLevel: 1,
        onPress: [[3, 200]],
        cost: 200,
        levelmulti: 1.5,
        index: 9,
      },
      {
        title: "Increase Offline Earnings",
        description: "+25 Offline Earnings /min",
        levels: 6,
        currLevel: 1,
        onPress: [],
        cost: 75,
        levelmulti: 1.3,
        index: 10,
      },
      {
        title: "Increase Multiplier",
        description: "+1x Multi",
        levels: 2,
        currLevel: 1,
        onPress: [[2, 1]],
        cost: 750,
        levelmulti: 1,
        index: 11,
      },
    ],
  },
  {
    title: "Tier 4",
    upgradesNeeded: 35,
    data: [
      {
        title: "Multiply Bet",
        description: "+1x Multi, +1x Loss Multi",
        levels: 2,
        currLevel: 1,
        onPress: [
          [2, 1],
          [6, 1],
        ],
        cost: 2000,
        levelmulti: 1.5,
        index: 12,
      },
      {
        title: "Increase XP Gain",
        description: "+1 XP on Win",
        levels: 2,
        currLevel: 1,
        onPress: [5, 1],
        cost: 1500,
        levelmulti: 1.5,
        index: 13,
      },
      {
        title: "Increase Offline Time",
        description: "+30 Mins Offline Time",
        levels: 4,
        currLevel: 1,
        onPress: [],
        cost: 750,
        levelmulti: 1.5,
        index: 14,
      },
      {
        title: "Gold Chip Chance",
        description: "+2% Gold Chip Chance",
        levels: 6,
        currLevel: 1,
        onPress: [[4, 0.02]],
        cost: 1000,
        levelmulti: 1.5,
        index: 15,
      },
    ],
  },
  {
    title: "Tier 5",
    upgradesNeeded: 42,
    data: [
      {
        title: "Increase Winnings",
        description: "+50 Winnings",
        levels: 6,
        currLevel: 1,
        onPress: [0, 50],
        cost: 1500,
        levelmulti: 1.2,
        index: 16,
      },
      {
        title: "Increase Push Winnings",
        description: "+500 Winnings on Push",
        levels: 3,
        currLevel: 1,
        onPress: [[3, 500]],
        cost: 2000,
        levelmulti: 1.5,
        index: 17,
      },
      {
        title: "Increase Offline Earnings",
        description: "+100 Offline Earnings /min",
        levels: 6,
        currLevel: 1,
        onPress: [],
        cost: 2000,
        levelmulti: 1.3,
        index: 18,
      },
      {
        title: "Gold Chip Chance",
        description: "+2% Gold Chip Chance",
        levels: 6,
        currLevel: 1,
        onPress: [[4, 0.02]],
        cost: 3500,
        levelmulti: 1.5,
        index: 19,
      },
    ],
  },
  {
    title: "Infinite Upgrades",
    upgradesNeeded: 68,
    data: [
      {
        title: "Increase Winnings",
        description: "+100 Winnings",
        levels: 101,
        currLevel: 1,
        onPress: [0, 50],
        cost: 1500,
        levelmulti: 1.2,
        index: 20,
      },
      {
        title: "Multiply Bet",
        description: "+1x Multi, +1x Loss Multi",
        levels: 101,
        currLevel: 1,
        onPress: [
          [2, 1],
          [6, 1],
        ],
        cost: 2000,
        levelmulti: 1.5,
        index: 21,
      },
      {
        title: "Offline Earnings",
        description: "+10 Offline Earnings /min",
        levels: 101,
        currLevel: 1,
        onPress: [],
        cost: 50,
        levelmulti: 1.5,
        index: 22,
      },
    ],
  },
];

export const goldChipUpgrades: { title: string; description: string; levels: number; currLevel: number; cost: number; levelMulti: number }[] = [
  {
    title: "Auto Stand",
    description: "Auto Stands at a Certain Score",
    levels: 2,
    currLevel: 1,
    cost: 1,
    levelMulti: 1,
  },
  {
    title: "Auto Hit",
    description: "Auto Hits Up to a Certain Score",
    levels: 2,
    currLevel: 1,
    cost: 1,
    levelMulti: 1,
  },
  {
    title: "Multi Card Multi",
    description: "Gain +0.5 X Multi for every card in your hand after 2",
    levels: 2,
    currLevel: 1,
    cost: 25,
    levelMulti: 1,
  },
];
