import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../utils/constants";
import { DefaultModalContainer } from "./DefaultModalContainer";
import { chipUpgrades } from "../../utils/chipUpgrades";
import { UpgradeItems } from "../UpgradeItems";
import { OnWinContext, PlayerChipsContext, WinLossChipsContext } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";

type ChipUpgrades = {
  modalVisible: boolean;
  setModalVisible: any;
  chipUpgradeState: any[];
  setChipUpgradeState: any;
  totalUpgrades: number;
  setTotalUpgrades: any;
};

export const ChipUpgrades = (props: ChipUpgrades) => {
  const playerChips = React.useContext(PlayerChipsContext);
  const winLossChips = React.useContext(WinLossChipsContext);
  const OnWin = React.useContext(OnWinContext);
  // const [chips, setChips] = React.useState(playerChips.playerChips);
  const [winChips, setWinChips] = React.useState(winLossChips.winChips);
  const [lossChips, setLossChips] = React.useState(winLossChips.lossChips);
  const [pushChips, setPushChips] = React.useState(winLossChips.pushChips);
  const [xMulti, setXMulti] = React.useState(winLossChips.xMulti);
  const [lossXMulti, setLossXMulti] = React.useState(winLossChips.lossXMulti);

  const UpgradeEffects = (effect: number, amount: number) => {
    switch (effect) {
      case 0:
        // Increase Winnings
        setWinChips(winLossChips.winChips + amount);
        winLossChips.setWinChips(winLossChips.winChips + amount);
        break;
      case 1:
        // Increase Lossings
        setLossChips(winLossChips.lossChips + amount);
        winLossChips.setLossChips(winLossChips.lossChips + amount);
        break;
      case 2:
        // Increase X Multi
        setXMulti(winLossChips.xMulti + amount);
        winLossChips.setXMulti(winLossChips.xMulti + amount);
        break;
      case 3:
        // Increase Push winnings
        setPushChips(winLossChips.pushChips + amount);
        winLossChips.setPushChips(winLossChips.pushChips + amount);
        break;
      case 4:
        // Increase Gold Chip chance
        OnWin.setGoldChipChance(OnWin.goldChipChance + amount);
        break;
      case 5:
        // Increase Xp gain
        OnWin.setXpGain(OnWin.xpGain + amount);
        break;
      case 6:
        // Increase Lossings X multi
        setLossXMulti(winLossChips.lossXMulti + amount);
        winLossChips.setLossXMulti(winLossChips.lossXMulti + amount);
    }
  };

  const onShow = () => {
    setWinChips(winLossChips.winChips);
    setXMulti(winLossChips.xMulti);
    setLossChips(winLossChips.lossChips);
    setLossXMulti(winLossChips.lossXMulti);
  };

  return (
    <DefaultModalContainer
      modalVisible={props.modalVisible}
      setModalVisible={props.setModalVisible}
      header="Chip Upgrades"
      onShow={() => onShow()}
      body={
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              {/* <Text style={styles.infoText}>Total: {chips}</Text> */}
              <Text style={styles.infoText}>Chips on win:</Text>
              <Text style={styles.infoText}>
                {winChips} x {xMulti} = {winChips * xMulti}
              </Text>
              <Text style={styles.infoText}>Chips on loss: {lossChips * lossXMulti}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1.5,
                  borderColor: COLORS.black,
                  borderRadius: 5,
                  padding: 4,
                }}>
                <Ionicons name="stats-chart" size={widthPercentageToDP(10)} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>

          <SectionList
            sections={chipUpgrades}
            style={{ height: heightPercentageToDP(50) }}
            // keyExtractor={item => item.index}
            renderSectionHeader={({ section: { title, upgradesNeeded } }) => (
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 22, color: props.totalUpgrades >= upgradesNeeded ? COLORS.black : "gray" }}>{title}</Text>
                {upgradesNeeded - props.totalUpgrades > 0 ? <Text style={{ fontSize: 20, color: COLORS.black }}>Need: {upgradesNeeded - props.totalUpgrades}</Text> : <Text style={{ fontSize: 20, color: COLORS.black }}>Need: 0</Text>}
              </View>
            )}
            renderItem={({ section: { title, upgradesNeeded }, item }) => (
              <UpgradeItems
                title={item.title}
                description={item.description}
                maxLevel={item.levels}
                cost={props.chipUpgradeState[item.index][1]}
                unlocked={props.totalUpgrades >= upgradesNeeded}
                onPress={() => {
                  // playerChips >= upgradeCost && upgradeLevel < maxLevel && totalUpgrades >= upgradesNeeded(Has enough upgrades to buy next tier)
                  if (playerChips.playerChips >= props.chipUpgradeState[item.index][1] && props.chipUpgradeState[item.index][0] < item.levels && props.totalUpgrades >= upgradesNeeded) {
                    // Increase total upgrades
                    props.setTotalUpgrades(props.totalUpgrades + 1);
                    // Update playerChips
                    playerChips.setPlayerChips(playerChips.playerChips - props.chipUpgradeState[item.index][1]);
                    // Perform upgrade affects
                    item.onPress.forEach(e => {
                      UpgradeEffects(e[0], e[1]);
                    });
                    // Set the cost of next upgrade
                    // Math.floorbasePrice * levelMulti^currLevel
                    const chipUpgrades = props.chipUpgradeState;
                    chipUpgrades[item.index] = [chipUpgrades[item.index][0] + 1, Math.floor(item.cost * Math.pow(item.levelmulti, props.chipUpgradeState[item.index][0]))];
                  }
                }}
                currLevel={props.chipUpgradeState[item.index][0]}
                levelMulti={item.levelmulti}
              />
            )}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 16,
    color: "black",
  },
});
