import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Modal, ViewStyle, KeyboardAvoidingView } from "react-native";
import { PlayerCard } from "../../utils/types";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../utils/constants";

type DefaultModalContainer = {
  modalVisible: boolean;
  setModalVisible: any;
  style?: ViewStyle;
  body: any;
  header: string;
  headerColor?: string;
  bodyColor?: string;
  onShow?: Function;
};

export const DefaultModalContainer = (props: DefaultModalContainer) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={props.modalVisible} supportedOrientations={["portrait"]} onShow={() => props.onShow && props.onShow()}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TouchableOpacity activeOpacity={0.5} style={styles.modalBlurContainer} onPress={() => props.setModalVisible(false)} />
          <View
            style={{
              backgroundColor: props.headerColor ? props.headerColor : COLORS.standDarkGreen,
              width: widthPercentageToDP(85),
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              padding: 4,
            }}>
            <Text style={{ color: "white", fontSize: 18, paddingLeft: 5 }}>{props.header}</Text>
          </View>
          <View
            style={{
              backgroundColor: props.bodyColor ? props.bodyColor : COLORS.white,
              width: widthPercentageToDP(85),
              maxHeight: heightPercentageToDP(65),
              borderBottomStartRadius: 15,
              borderBottomEndRadius: 15,
              padding: 12,
            }}>
            {props.body}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBlurContainer: {
    backgroundColor: "black",
    opacity: 0.5,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  modalContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
