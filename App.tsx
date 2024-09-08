import React, { useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { GameView } from "./src/components/GameView";
import { TopBar } from "./src/components/TopBar";
import { BottomBar } from "./src/components/BottomBar";
import { chipUpgrades } from "./src/utils/chipUpgrades";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SaveObj } from "./src/utils/types";
import { newSave } from "./src/utils/constants";

export const PlayerChipsContext = React.createContext({
  playerChips: 0,
  setPlayerChips: (number: number) => {},
  playerGoldChips: 0,
  setPlayerGoldChips: (number: number) => {},
  playerLevel: 1,
});

export const WinLossChipsContext = React.createContext({
  winChips: 0,
  lossChips: 0,
  pushChips: 0,
  xMulti: 1,
  lossXMulti: 1,
  setWinChips: (number: number) => {},
  setLossChips: (number: number) => {},
  setPushChips: (number: number) => {},
  setXMulti: (number: number) => {},
  setLossXMulti: (number: number) => {},
});

export const OnWinContext = React.createContext({
  goldChipChance: 0,
  setGoldChipChance: (number: number) => {},
  xpGain: 1,
  setXpGain: (number: number) => {},
  currXp: 0,
  setCurrXp: (number: number) => {},
  xpNeeded: 10,
  setXpNeeded: (number: number) => {},
});

const GetChipUpgrades = (upgrades: any[]): [number, number][] => {
  let tempArr: any[] = [];
  upgrades.forEach(e => {
    e.data.forEach((j: any) => {
      tempArr.push([j.currLevel, j.cost]);
    });
  });
  return tempArr;
};

function App(): React.JSX.Element {
  useEffect(() => {
    // Load data
    const loadData = async () => {
      let data: SaveObj;
      try {
        const jsonValue = await AsyncStorage.getItem("BlackJack_Save");
        data = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (data) {
          setPlayerChips(data.chips.chips);
          setPlayerGoldChips(data.chips.goldChips);
          setTotalUpgrades(data.totalUpgrades);
          setChipUpgradeState(data.upgrades);
          setWinChips(data.affects.winChips);
          setLossChips(data.affects.lossChips);
          setPushChips(data.affects.pushChips);
          setXMulti(data.affects.xMulti);
          setGoldChipChance(data.affects.goldChipChance);
          setPlayerLevel(data.level.playerLevel);
          setXpGain(data.level.xpGain);
          setCurrXp(data.level.currXp);
          setXpNeeded(Math.floor(10 * Math.pow(1.35, data.level.playerLevel)));
          setXpGain(data.affects.xpGain);
          setLossXMulti(data.affects.lossXMulti);
        }
      } catch (e) {
        // error reading value
        console.warn("Loading error: ", e);
      }
    };
    loadData();
  }, []);

  // const winLossChips = useContext(WinLossChipsContext);
  const [gameOver, setGameOver] = React.useState(false);
  const [playerChips, setPlayerChips] = React.useState(0);
  const [chipUpgradeState, setChipUpgradeState] = React.useState(GetChipUpgrades(chipUpgrades));
  const [playerGoldChips, setPlayerGoldChips] = React.useState(0);
  const [totalUpgrades, setTotalUpgrades] = React.useState(0);
  const [winChips, setWinChips] = React.useState(10);
  const [lossChips, setLossChips] = React.useState(0);
  const [pushChips, setPushChips] = React.useState(0);
  const [xMulti, setXMulti] = React.useState(1);
  const [goldChipChance, setGoldChipChance] = React.useState(0);
  const [xpGain, setXpGain] = React.useState(1);
  const [currXp, setCurrXp] = React.useState(0);
  const [xpNeeded, setXpNeeded] = React.useState(10);
  const [playerLevel, setPlayerLevel] = React.useState(1);
  const [lossXMulti, setLossXMulti] = React.useState(1);

  if (currXp >= xpNeeded) {
    const leftOver = Math.floor(currXp - xpNeeded);
    setCurrXp(leftOver);
    // setXpNeeded(Math.floor((xpNeeded + 1) * 1.1));
    setXpNeeded(Math.floor(10 * Math.pow(1.35, playerLevel)));
    setPlayerLevel(playerLevel + 1);
  }

  const SaveGame = async () => {
    const saveObj: SaveObj = {
      chips: { chips: playerChips, goldChips: playerGoldChips },
      level: { playerLevel: playerLevel, xpGain: xpGain, currXp: currXp },
      upgrades: chipUpgradeState,
      totalUpgrades: totalUpgrades,
      currXp: currXp,
      affects: {
        winChips: winChips,
        lossChips: lossChips,
        pushChips: pushChips,
        xMulti: xMulti,
        goldChipChance: goldChipChance,
        lossXMulti: lossXMulti,
        xpGain: xpGain,
      },
    };

    try {
      const jsonValue = JSON.stringify(saveObj);
      await AsyncStorage.setItem("BlackJack_Save", jsonValue);
    } catch (e) {
      // saving error
      console.warn("Saving error: ", e);
    }
    console.log("Saved game with: ", saveObj);
  };

  return (
    <OnWinContext.Provider value={{ goldChipChance, setGoldChipChance, xpGain, setXpGain, currXp, setCurrXp, xpNeeded, setXpNeeded }}>
      <PlayerChipsContext.Provider
        value={{
          playerChips,
          setPlayerChips,
          playerGoldChips,
          setPlayerGoldChips,
          playerLevel,
        }}>
        <WinLossChipsContext.Provider
          value={{
            winChips,
            lossChips,
            pushChips,
            xMulti,
            lossXMulti,
            setWinChips,
            setLossChips,
            setPushChips,
            setXMulti,
            setLossXMulti,
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 3 }}>
              <TopBar gameOver={gameOver} saveGame={SaveGame} />
            </View>
            <View style={{ flex: 14 }}>
              <GameView setGameOver={setGameOver} />
              {/* <TouchableOpacity
                onPress={async () => {
                  try {
                    const jsonValue = JSON.stringify(newSave);
                    await AsyncStorage.setItem("BlackJack_Save", jsonValue);
                  } catch (e) {
                    // saving error
                    console.warn("Saving error: ", e);
                  }
                }}>
                <Text>Reset game save</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ flex: 2 }}>
              <BottomBar setTotalUpgrades={setTotalUpgrades} totalUpgrades={totalUpgrades} chipUpgradeState={chipUpgradeState} setChipUpgradeState={setChipUpgradeState} />
            </View>
          </View>
        </WinLossChipsContext.Provider>
      </PlayerChipsContext.Provider>
    </OnWinContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
