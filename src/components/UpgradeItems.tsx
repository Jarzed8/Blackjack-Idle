import React, { useEffect } from "react";
import { StyleSheet, Text, useColorScheme, View, TouchableOpacity, Modal, ViewStyle } from "react-native";
import { PlayerCard } from "../utils/types";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../utils/constants";
import { DefaultModalContainer } from "./modals/DefaultModalContainer";

type UpgradeItems = {
  title: string;
  description: string;
  cost: number;
  onPress: any;
  currLevel: number;
  levelMulti: number;
  maxLevel: number;
  unlocked: boolean;
};

export const UpgradeItems = (props: UpgradeItems) => {
  const GetCost = (): number => {
    return props.cost + props.cost * (props.levelMulti * props.currLevel) * -1;
  };

  const color = props.unlocked ? COLORS.cardBlack : "gray";

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: color }]}
      onPress={() => {
        props.onPress();
      }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.titleText, { color: color }]}>{props.title}</Text>
        {props.currLevel < props.maxLevel ? <Text style={[styles.titleText, { color: color }]}>{props.cost}</Text> : null}
      </View>
      <View style={{ backgroundColor: COLORS.black, height: 1 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.descriptionText, { color: color, width: "88%" }]}>{props.description}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.descriptionText, { color: color }]}>{props.currLevel - 1}</Text>
          <Text style={[styles.descriptionText, { color: color }]}>/{props.maxLevel - 1}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    // borderColor: COLORS.cardBlack,
    borderRadius: 10,
    marginBottom: 8,
    padding: 4,
  },
  titleText: {
    // color: COLORS.black,
    fontSize: 22,
    fontWeight: "500",
  },
  descriptionText: {
    color: COLORS.black,
    fontSize: 18,
  },
});
