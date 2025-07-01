import { View, Text, Pressable, StyleSheet } from "react-native";
import GlobalColors from "../../constants/colors";
import React from "react";

export default function BottomSheet({
  isModalOpen,
  setIsModalOpen,
  children,
}: any) {
  return (
    <Pressable style={styles.backdrop} onPress={() => setIsModalOpen(false)}>
      <View style={styles.middle} onStartShouldSetResponder={() => true}>
        <Pressable style={styles.bottomSheet}>
          <View style={styles.line} />
          {children}
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  middle: {
    width: "100%",
    height: "70%",
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    position: "absolute",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },

  line: {
    width: 80,
    height: 4,
    backgroundColor: GlobalColors.primary,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
});
