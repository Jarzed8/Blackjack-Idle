import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity } from "react-native";
import { PlayerCard } from "../utils/types";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../utils/constants";

export const PlayerCardTouchable = (props: PlayerCard) => {
  let icon = "";
  let color = "";
  switch (props.card.suit) {
    case "spades":
      icon = "cards-spade";
      color = COLORS.cardBlack;
      break;
    case "diamonds":
      icon = "cards-diamond";
      color = COLORS.cardRed;
      break;
    case "clubs":
      icon = "cards-club";
      color = COLORS.cardBlack;
      break;
    case "hearts":
      icon = "cards-heart";
      color = COLORS.cardRed;
      break;
    default:
      icon = "cards-heart";
      color = COLORS.cardRed;
      console.warn("Invalid Suit: " + props.card.suit);
  }

  return (
    <>
      {!props.flipped ? (
        <TouchableOpacity disabled={props.disabled} style={styles.container}>
          <MaterialCommunityIcons name={icon} color={color} size={widthPercentageToDP(6)} />
          <Text style={[styles.text, { color: color }]}>{props.card.title}</Text>
          <MaterialCommunityIcons name={icon} color={color} size={widthPercentageToDP(6)} style={{ marginLeft: "auto" }} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.container, { justifyContent: "space-between", alignItems: "center" }]}>
          <View
            style={{
              flex: 1,
              borderColor: COLORS.cardRed,
              borderWidth: 1,
              width: widthPercentageToDP(13.5),
              borderRadius: 5,
            }}>
            {/* <View
            style={{
              flex: 2,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.flippedCardDeco} />
            <View style={{}} />
          </View> */}

            <View
              style={{
                flex: 5,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <View style={[styles.flippedCardDecoCircle, { top: 8 }]} />
              <View
                style={[
                  styles.flippedCardDecoCircle,
                  {
                    height: widthPercentageToDP(8),
                    width: widthPercentageToDP(8),
                    borderWidth: 2.5,
                  },
                ]}
              />
              <View style={[styles.flippedCardDecoCircle, { bottom: 8 }]} />
            </View>

            {/* <View
            style={{
              flex: 2,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <View style={{}} />
            <View style={styles.flippedCardDeco} />
          </View> */}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(15),
    height: widthPercentageToDP(25),
    justifyContent: "space-around",
    padding: 2,
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 5,
    // marginBottom: 6,
    backgroundColor: COLORS.white,
    // marginHorizontal: -10,
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  flippedCardDeco: {
    borderColor: COLORS.cardRed,
    borderWidth: 2,
    height: widthPercentageToDP(4),
    width: widthPercentageToDP(4),
    borderRadius: 5,
    backgroundColor: COLORS.cardRed,
  },
  flippedCardDecoCircle: {
    borderColor: COLORS.cardRed,
    borderWidth: 2,
    height: widthPercentageToDP(7),
    width: widthPercentageToDP(7),
    borderRadius: 500,
  },
});
