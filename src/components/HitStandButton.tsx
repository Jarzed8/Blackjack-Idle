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
import type {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {PlayerCard} from '../utils/types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/constants';
import {DealCards, Hit} from '../utils/DealCards';

interface HitStandButton {
  hit: any;
  stand: any;
  style?: ViewStyle;
}

export const HitStandButton = (props: HitStandButton) => {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={props.hit}
        style={[
          styles.buttonContainer,
          {borderColor: COLORS.hitDarkRed, backgroundColor: COLORS.hitRed},
        ]}>
        <Text style={styles.buttonText}>Hit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.stand}
        style={[
          styles.buttonContainer,
          {
            borderColor: COLORS.standDarkGreen,
            backgroundColor: COLORS.standGreen,
          },
        ]}>
        <Text style={styles.buttonText}>Stand</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(8),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    height: heightPercentageToDP(7),
    aspectRatio: 2.5,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
  buttonText: {
    fontSize: 22,
    textDecorationLine: 'underline',
    color: COLORS.white,
  },
});
