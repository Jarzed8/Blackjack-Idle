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
import { GetHouseScore } from "../utils/GameMode";
import { ScoreCounter } from "./ScoreCounter";

type HouseHand = {
  hand: Hand;
  houseTurn: boolean;
};

export const HouseHand = (props: HouseHand) => {
  const [houseHand, setHouseHand] = React.useState(props.hand);
  const [houseScore, SetHouseScore] = React.useState(GetHouseScore());

  // const ScoreCounter = () => {
  //   return (
  //     <View>
  //       {houseScore[1] === 0 ? (
  //         <Text style={styles.totalText}>{houseScore[0]}</Text>
  //       ) : (
  //         <View style={{flexDirection: 'row'}}>
  //           <Text style={styles.totalText}>{houseScore[0]}</Text>
  //           <Text style={styles.totalText}> / </Text>
  //           <Text style={styles.totalText}>{houseScore[1]}</Text>
  //         </View>
  //       )}
  //     </View>
  //   );
  // };

  useEffect(() => {
    setHouseHand(props.hand);
    SetHouseScore(GetHouseScore());
  }, [props.hand, props.houseTurn]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={{ borderWidth: 1, borderColor: "yellow", borderRadius: 5, flexDirection: "row", width: widthPercentageToDP(85), paddingVertical: 4, justifyContent: houseHand.length > 5 ? "space-evenly" : "center", gap: 4 }}>
          {houseHand.map((card, index) => {
            return <PlayerCardTouchable flipped={index === 1 && !props.houseTurn} disabled key={index} card={{ suit: card.suit, title: card.title, value: card.value }} />;
          })}
        </View>
      </View>
      <ScoreCounter numbers={houseScore} />
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
