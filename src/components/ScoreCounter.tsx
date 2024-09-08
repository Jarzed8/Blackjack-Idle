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
import {Card, Hand} from '../utils/types';
import {PlayerCardTouchable} from './PlayerCardTouchable';
import {ShuffleXCards} from '../utils/ShuffleXCards';
import {DealCards, SetHand, Hit} from '../utils/DealCards';
import {HitStandButton} from './HitStandButton';
import {GetHouseScore} from '../utils/GameMode';

type BothNumber = {numbers: [number, number]};
type OneNumber = {number: number};

const OneNumber = (props: OneNumber) => {
  return <Text style={styles.totalText}>{props.number}</Text>;
};

const BothNumber = (props: BothNumber) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.totalText}>{props.numbers[0]}</Text>
      <Text style={styles.totalText}> / </Text>
      <Text style={styles.totalText}>{props.numbers[1]}</Text>
    </View>
  );
};

const ChooseNumber = (props: BothNumber) => {
  if (props.numbers[1] === 0) {
    return <OneNumber number={props.numbers[0]} />;
  } else if (props.numbers[0] > 21) {
    return <OneNumber number={props.numbers[1]} />;
  } else {
    return <BothNumber numbers={props.numbers} />;
  }
};

export const ScoreCounter = (props: BothNumber) => {
  return (
    <View>
      <ChooseNumber numbers={props.numbers} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '600',
  },
});
