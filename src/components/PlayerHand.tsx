import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity } from "react-native";
import { PlayerCard } from "../utils/types";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../utils/constants";
import { Card, Hand } from "../utils/types";
import { PlayerCardTouchable } from "./PlayerCardTouchable";
import { ShuffleXCards } from "../utils/ShuffleXCards";
import { DealCards, SetHand, Hit } from "../utils/DealCards";
import { HitStandButton } from "./HitStandButton";
import { GetPlayerScore, PlayerHit, StartGame } from "../utils/GameMode";
import { ScoreCounter } from "./ScoreCounter";

type PlayerHand = {
  hand: Hand;
  playerHit: any;
  playerStand: any;
};

export const PlayerHand = (props: PlayerHand) => {
  const [playerHand, setPlayerHand] = React.useState(props.hand);
  const [playerScore, setPlayerScore] = React.useState(GetPlayerScore());

  // const ScoreCounter = () => {
  //   return (
  //     <View>
  //       {(playerScore[1] === 0 ) ? (
  //         <Text style={styles.totalText}>{playerScore[0]}</Text>
  //       ) : (
  //         <View style={{flexDirection: 'row'}}>
  //           <Text style={styles.totalText}>{playerScore[0]}</Text>
  //           <Text style={styles.totalText}> / </Text>
  //           <Text style={styles.totalText}>{playerScore[1]}</Text>
  //         </View>
  //       )}
  //     </View>
  //   );
  // };

  useEffect(() => {
    setPlayerHand(props.hand);
    setPlayerScore(GetPlayerScore());
  }, [props.hand]);

  return (
    <View style={styles.outerContainer}>
      <ScoreCounter numbers={playerScore} />

      <View style={styles.innerContainer}>
        <View style={{ borderWidth: 1, borderColor: "yellow", borderRadius: 5, flexDirection: "row", width: widthPercentageToDP(85), paddingVertical: 4, justifyContent: playerHand.length > 5 ? "space-evenly" : "center", gap: 4 }}>
          {playerHand.map((card, index) => {
            return <PlayerCardTouchable disabled key={index} card={{ suit: card.suit, title: card.title, value: card.value }} />;
          })}
        </View>
        <HitStandButton style={{ marginTop: 6, width: "100%", justifyContent: "space-around" }} hit={props.playerHit} stand={props.playerStand} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: COLORS.tableDarkGreen,
    // borderRadius: 5,
    // padding: 12,
    // margin: 6,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor: COLORS.tableGreen,
    width: "100%",
    // borderRadius: 10,
    // paddingVertical: 12,
    // paddingHorizontal: 8,
    flexWrap: "wrap",
  },
  totalText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "600",
  },
});
