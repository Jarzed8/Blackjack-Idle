import React, { useEffect, useReducer } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Modal, ViewStyle, FlatList, SectionList } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../..//utils/constants";
import { HouseHand } from "../HouseHand";
import { PlayerHand } from "../PlayerHand";
import { ChangeHouseTurn, DealHouseCards, DealPlayerCards, GetPlayerScore, GetWinner, HOUSETURN, HousePlay, PlayerHit, StartGame } from "../../utils/GameMode";
import { WinnerButtons } from "../WinnerButtons";
import { Hand, WinStates } from "../../utils/types";
import { OnWinContext, PlayerChipsContext, WinLossChipsContext } from "../../../App";
import { DefaultModalContainer } from "./DefaultModalContainer";
import { goldChipUpgrades } from "../../utils/chipUpgrades";
import { UpgradeItems } from "../UpgradeItems";

export const GoldChipUpgrades = (props: { modalVisible: boolean; setModalVisible: any }) => {
  return (
    <DefaultModalContainer
      modalVisible={props.modalVisible}
      setModalVisible={props.setModalVisible}
      header="Golden Chip Upgrades"
      headerColor={COLORS.gold}
      body={
        <FlatList
          data={goldChipUpgrades}
          renderItem={({ item }) => <UpgradeItems title={item.title} description={item.description} maxLevel={item.levels} cost={item.cost} unlocked currLevel={1} levelMulti={item.levelMulti} onPress={() => null} />}
        />
      }
    />
  );
};
