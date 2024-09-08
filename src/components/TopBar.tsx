import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../utils/constants";
import { OnWinContext, PlayerChipsContext, WinLossChipsContext } from "../../App";

type TopBar = {
  gameOver: boolean;
  saveGame: any;
};

const SaveButton = (props: { SaveGame: any }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => props.SaveGame()}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  );
};

export const TopBar = (props: TopBar) => {
  const playerChips = React.useContext(PlayerChipsContext);
  const onWin = React.useContext(OnWinContext);
  const winLossChips = React.useContext(WinLossChipsContext);
  const [chips, setChips] = React.useState(playerChips.playerChips);
  const [goldChips, setGoldChips] = React.useState(playerChips.playerGoldChips);
  const [xpWidth, setXpWidth] = React.useState("0%");

  const setXpPercent = (currXp: number, neededXp: number) => {
    const xp = Math.floor((currXp / neededXp) * 100);
    setXpWidth(xp + "%");
  };

  useEffect(() => {
    setXpPercent(onWin.currXp, onWin.xpNeeded);
  }, [onWin.currXp]);

  useEffect(() => {
    setChips(playerChips.playerChips);
    setGoldChips(playerChips.playerGoldChips);
  }, [playerChips.playerChips]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.tableDarkGreen,
        paddingTop: 0,
      }}>
      <StatusBar backgroundColor={COLORS.tableDarkGreen} />
      <View
        style={{
          flex: 1,
          // flexDirection: "row",
          width: widthPercentageToDP(95),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.tableGreen,
          borderRadius: 5,
        }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.sideContainer}></View>
          <View>
            <Text style={{ fontSize: 28, color: COLORS.white }}>{chips}</Text>
            {goldChips !== 0 && <Text style={{ fontSize: 28, color: COLORS.gold }}>{goldChips}</Text>}
          </View>
          <View style={styles.sideContainer}>
            <SaveButton SaveGame={props.saveGame} />
            {/* <TouchableOpacity style={[styles.buttonContainer, { borderColor: COLORS.winGreen }]} onPress={() => playerChips.setPlayerChips(playerChips.playerChips + 500)}> */}
            <TouchableOpacity style={[styles.buttonContainer, { borderColor: COLORS.winGreen }]} onPress={() => playerChips.setPlayerChips(chips + 2000)}>
              <Text style={styles.buttonText}>Money Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: COLORS.white }}>{playerChips.playerLevel}</Text>
        <View style={{ borderWidth: 1, borderColor: COLORS.gray, width: widthPercentageToDP(85), height: 10, borderRadius: 5 }}>
          {/* @ts-ignore */}
          <View style={{ flex: 1, backgroundColor: COLORS.standDarkGreen, width: xpWidth }} />
        </View>
        <Text style={{ fontSize: 14, color: COLORS.white }}>
          {onWin.currXp} / {onWin.xpNeeded}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    height: widthPercentageToDP(12),
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center",
  },
});
