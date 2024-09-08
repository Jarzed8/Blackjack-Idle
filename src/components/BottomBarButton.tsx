import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {PlayerCard} from '../utils/types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/constants';
import {ChipUpgrades} from './modals/ChipUpgrades';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const BottomBarButton = (props: {title: string; onPress: any}) => {
  let color = '';
  switch (props.title) {
    case 'Chip Upgrades':
      color = COLORS.black;
      break;
    case 'Gold Chip Upgrades':
      color = COLORS.gold;
      break;
    case 'Dollar Upgrades':
      color = COLORS.moneyGreen;
      break;
    default:
      color = COLORS.hitRed;
      break;
  }
  return (
    <TouchableOpacity
      onPress={() => props.onPress(true)}
      style={styles.container}>
      <MaterialCommunityIcons
        name="poker-chip"
        size={widthPercentageToDP(7)}
        color={color}
      />
      <Text style={[styles.text, {color: color}]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: heightPercentageToDP(8),
    width: widthPercentageToDP(19),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 2,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 6,
    backgroundColor: COLORS.white,
    marginHorizontal: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
