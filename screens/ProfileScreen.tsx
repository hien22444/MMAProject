import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const handlePress = (label: string) => {
    if (label === "Đơn hàng của tôi") {
      navigation.navigate("OrderHistory");
    } else if (label === "Địa chỉ giao hàng") {
      navigation.navigate("ShippingAddress");
    } else if (label === "Cài đặt tài khoản") {
      navigation.navigate("AccountSettings");
    } else if (label === "Trung tâm trợ giúp") {
      navigation.navigate("HelpCenter");
    } else if (label === "Chính sách & Điều khoản") {
      navigation.navigate("Policy");
    } else if (label === "Giới thiệu") {
      navigation.navigate("About");
    } else if (label === "Chỉnh sửa hồ sơ") {
      navigation.navigate("MyProfile");
    } else if (label === "Đăng xuất") {
      handleLogout();
    } else {
      Alert.alert("Tính năng", `Bạn đã chọn: ${label}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!currentUser ? (
        // Guest Profile View
        <>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740",
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Khách</Text>
            <Text style={styles.info}>
              Đăng nhập để sử dụng đầy đủ tính năng
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Ionicons name="log-in-outline" size={20} color="#fff" />
                <Text style={styles.actionText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => navigation.navigate("Register")}
              >
                <Ionicons name="person-add-outline" size={20} color="#007bff" />
                <Text style={styles.secondaryButtonText}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tính năng cho khách</Text>
            {renderItem("Trung tâm trợ giúp", "help-circle-outline")}
            {renderItem("Chính sách & Điều khoản", "document-text-outline")}
            {renderItem("Giới thiệu", "information-circle-outline")}
          </View>
        </>
      ) : (
        // Logged in user profile
        <>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740",
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>
              {currentUser?.role === "admin" ? "Administrator" : "Nguyễn Văn A"}
            </Text>
            <Text style={styles.info}>{currentUser?.email}</Text>
            <Text style={styles.info}>0909 123 456</Text>
            {currentUser?.role === "admin" && (
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>Admin</Text>
              </View>
            )}

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handlePress("Chỉnh sửa hồ sơ")}
              >
                <Ionicons name="create-outline" size={20} color="#fff" />
                <Text style={styles.actionText}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Danh sách chức năng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tài khoản</Text>
            {renderItem("Đơn hàng của tôi", "cube-outline")}
            {renderItem("Địa chỉ giao hàng", "location-outline")}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hỗ trợ & Cài đặt</Text>
            {renderItem("Cài đặt tài khoản", "settings-outline")}
            {renderItem("Trung tâm trợ giúp", "help-circle-outline")}
            {renderItem("Chính sách & Điều khoản", "document-text-outline")}
            {renderItem("Đăng xuất", "log-out-outline")}
          </View>
        </>
      )}
    </ScrollView>
  );

  function renderItem(label: string, iconName: any) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => handlePress(label)}>
        <Ionicons
          name={iconName}
          size={22}
          color="#444"
          style={styles.itemIcon}
        />
        <Text style={styles.itemLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007bff",
  },
  secondaryButtonText: {
    color: "#007bff",
    marginLeft: 6,
    fontSize: 14,
  },
  adminBadge: {
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  adminBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemIcon: {
    marginRight: 15,
  },
  itemLabel: {
    fontSize: 16,
    color: "#333",
  },
});
