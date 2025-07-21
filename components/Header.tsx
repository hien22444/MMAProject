import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#1959af",
    borderRadius: 10,
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});

export default Header;
