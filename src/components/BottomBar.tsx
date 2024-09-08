import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity } from "react-native";
import { PlayerCard } from "../utils/types";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../utils/constants";
import { ChipUpgrades } from "./modals/ChipUpgrades";
import { BottomBarButton } from "./BottomBarButton";
import { GoldChipUpgrades } from "./modals/GoldChipUpgrades";

type BottomBar = {
  chipUpgradeState: any[];
  setChipUpgradeState: any;
  totalUpgrades: number;
  setTotalUpgrades: any;
};

export const BottomBar = (props: BottomBar) => {
  const [chipUpgradeModal, setChipUpgradeModal] = React.useState(false);
  const [goldChipModal, setGoldChipModal] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: COLORS.tableDarkGreen,
      }}>
      <ChipUpgrades
        setTotalUpgrades={props.setTotalUpgrades}
        totalUpgrades={props.totalUpgrades}
        modalVisible={chipUpgradeModal}
        setModalVisible={setChipUpgradeModal}
        chipUpgradeState={props.chipUpgradeState}
        setChipUpgradeState={props.setChipUpgradeState}
      />
      <GoldChipUpgrades modalVisible={goldChipModal} setModalVisible={setGoldChipModal} />
      <BottomBarButton onPress={setChipUpgradeModal} title="Chip Upgrades" />
      <BottomBarButton onPress={setGoldChipModal} title="Gold Chip Upgrades" />
      <BottomBarButton onPress={setChipUpgradeModal} title="Dollar Upgrades" />
      <BottomBarButton onPress={setChipUpgradeModal} title="Deck Upgrades" />
      <BottomBarButton onPress={setChipUpgradeModal} title="Casino Upgrades" />
    </View>
  );
};
