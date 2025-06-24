import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import GlobalColors from "../../constants/colors";
import Entypo from "@expo/vector-icons/Entypo";

export default function Coupon({
  coupon,
  selectedCoupon,
  handleChoose,
  totalOrderValue,
}: any) {
  return (
    <Pressable
      style={[
        styles.container,
        coupon.minOrderValue > totalOrderValue && styles.disabled,
      ]}
      onPress={
        coupon.minOrderValue > totalOrderValue
          ? null
          : handleChoose.bind(null, coupon)
      }
    >
      <View
        style={{
          position: "relative",
          width: 90,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            left: -4,
            top: 7,
            width: 10,
            height: 100,
            gap: 5,
            flexDirection: "column",
          }}
        >
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor: "white",
                }}
              />
            ))}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: GlobalColors.primary,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 55,

              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {coupon.discountValue}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ gap: 3 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {coupon.title}
          </Text>
          <Text style={{ fontSize: 14 }}>{coupon.description}</Text>
          <Text style={{ fontSize: 12, color: "#333" }}>
            {coupon.expiryDate}
          </Text>
        </View>
        <View
          style={[
            styles.ratioBox,
            coupon.id === selectedCoupon.id
              ? styles.filledRatio
              : styles.outlineRatio,
          ]}
        >
          {coupon.id === selectedCoupon.id && (
            <Entypo name="check" size={18} color="#fff" />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
  },
  ratioBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: GlobalColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {},
  outlineRatio: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: GlobalColors.primary,
  },
  filledRatio: {
    backgroundColor: GlobalColors.primary,
  },
  disabled: {
    opacity: 0.7,
  },
});
