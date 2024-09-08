import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WinStates } from "../utils/types";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS, lossText, winText } from "../utils/constants";
import { WinLossChipsContext } from "../../App";

type WinnerButtons = {
  winner: WinStates;
  onPress: any;
};

const ChooseText = (arr: string[]): string => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const PlayerWinView = (props: { winChips: number; xMulti: number }) => {
  const text = ChooseText(winText);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, color: COLORS.winGreen, textAlign: "center" }}>{text}</Text>
      <Text style={{ fontSize: 22, color: COLORS.winGreen }}>+ {String(props.winChips * props.xMulti)}</Text>
    </View>
  );
};

const HouseWinView = (props: { lossChips: number; lossXMulti: number }) => {
  const text = ChooseText(lossText);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, color: COLORS.lossRed, textAlign: "center" }}>{text}</Text>
      {props.lossChips ? <Text style={{ fontSize: 22, color: COLORS.lossRed }}>- {String(props.lossChips * props.lossXMulti)}</Text> : null}
    </View>
  );
};

const PushView = (props: { pushChips: number }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, color: COLORS.pushYellow }}>Push</Text>
      {props.pushChips ? <Text style={{ fontSize: 22, color: COLORS.pushYellow }}>+ {String(props.pushChips)}</Text> : null}
    </View>
  );
};

export const WinnerButtons = (props: WinnerButtons) => {
  const winLossChips = React.useContext(WinLossChipsContext);
  const PickView = () => {
    if (props.winner === "playerWins") {
      return <PlayerWinView winChips={winLossChips.winChips} xMulti={winLossChips.xMulti} />;
    } else if (props.winner === "houseWins") {
      return <HouseWinView lossChips={winLossChips.lossChips} lossXMulti={winLossChips.lossXMulti} />;
    } else {
      return <PushView pushChips={winLossChips.pushChips} />;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <PickView />
    </TouchableOpacity>
  );
};
