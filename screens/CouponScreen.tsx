import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import GlobalColors from "../constants/colors";
import Coupon from "../components/Coupon/Coupon";
import { useCart } from "../contexts/CartContext";

type CouponType = {
  id: string;
  title: string;
  discountValue: string;
  minOrderValue: string;
  code: string;
  expiryDate: string;
  description: string;
  isUsed: boolean;
  isExpired: boolean;
};

const list = [
  {
    id: "1",
    title: "Coupon 1",
    discountValue: "10%",
    minOrderValue: "500000",
    code: "SALE10",
    expiryDate: "30/06/2023",
    description: "Giảm 10% cho đơn hàng từ 500K",
    isUsed: false,
    isExpired: false,
  },
  {
    id: "2",
    title: "Coupon 2",
    discountValue: "50%",
    minOrderValue: "300000",
    code: "SALE20",
    expiryDate: "30/06/2023",
    description: "Giảm 10% cho đơn hàng từ 300K",
    isUsed: false,
    isExpired: false,
  },
  {
    id: "3",
    title: "Coupon 3",
    discountValue: "30%",
    minOrderValue: "100000",
    code: "SALE50",
    expiryDate: "30/06/2023",
    description: "Giảm 10% cho đơn hàng từ 100K",
    isUsed: false,
    isExpired: false,
  },
];

export default function CouponScreen({ navigation, route }: any) {
  const { coupon, setCoupon } = useCart();

  const totalOrderValue = route.params.totalAmount;
  const handleComplete = () => {
    const discount =
      (totalOrderValue *
        Number(selectedCoupon.discountValue.replace("%", ""))) /
      100;

    setCoupon(discount.toString());
    navigation.goBack();
  };

  const [selectedCoupon, setSelectedCoupon] = React.useState({
    id: "",
    title: "",
    discountValue: "",
    minOrderValue: "",
    code: "",
    expiryDate: "",
    description: "",
    isUsed: false,
    isExpired: false,
  });

  const [inputCode, setInputCode] = React.useState("");

  const handleApplyCode = () => {
    const coupon = list.filter((coupon) => coupon.code === inputCode)[0];

    if (coupon) {
      setSelectedCoupon({
        id: coupon?.id,
        title: coupon.title,
        discountValue: coupon.discountValue,
        minOrderValue: coupon.minOrderValue,
        code: coupon.code,
        expiryDate: coupon.expiryDate,
        description: coupon.description,
        isUsed: coupon.isUsed,
        isExpired: coupon.isExpired,
      });
    }
  };

  const handleInputChange = (code: string) => {
    setInputCode(code.toUpperCase().trim());
  };

  const handleChoose = (item: CouponType) => {
    setSelectedCoupon({
      id: item?.id,
      title: item.title,
      discountValue: item.discountValue,
      minOrderValue: item.minOrderValue,
      code: item.code,
      expiryDate: item.expiryDate,
      description: item.description,
      isUsed: item.isUsed,
      isExpired: item.isExpired,
    });
  };

  const renderCoupon = (coupon: any) => (
    <Coupon
      coupon={coupon}
      selectedCoupon={selectedCoupon}
      handleChoose={handleChoose}
      totalOrderValue={totalOrderValue}
      key={coupon.id}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            padding: 15,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            placeholder="Nhập mã voucher"
            style={{
              flex: 1,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
              fontSize: 16,
              fontWeight: "bold",
            }}
            value={inputCode}
            onChangeText={handleInputChange}
          />
          <View
            style={{
              width: 100,
              height: 42,
              backgroundColor: GlobalColors.primary,
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <Pressable
              style={{ height: "100%", width: "100%" }}
              onPress={handleApplyCode}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                  Áp dụng
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 15 }}>
          <Text style={{ fontSize: 16 }}>Mã giảm giá</Text>
          <FlatList
            data={list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderCoupon(item)}
          />
        </View>
      </View>

      {selectedCoupon?.code != "" && totalOrderValue > 0 && (
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            gap: 10,
          }}
        >
          <Text>1 voucher đã được chọn.</Text>
          <Text>
            <Text style={{ fontWeight: "bold", color: "green" }}>
              Đã áp dụng ưu đãi giá
            </Text>
            , giảm{" "}
            <Text style={{ fontWeight: "bold", color: "orange" }}>
              -đ
              {(
                (totalOrderValue *
                  Number(selectedCoupon.discountValue.replace("%", ""))) /
                100 /
                1000
              ).toFixed(2)}
              k
            </Text>
          </Text>
          <View
            style={{
              width: "100%",
              height: 42,
              backgroundColor: GlobalColors.primary,
              borderRadius: 5,
            }}
          >
            <Pressable
              style={{ height: "100%", width: "100%" }}
              onPress={handleComplete}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                  Đồng ý
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
