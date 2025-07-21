import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "../types/navigation";
import { CommonActions } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const { login, currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    // If user is already logged in, redirect to the appropriate screen
    if (currentUser) {
      try {
        if (currentUser.role === "admin") {
          // Sử dụng navigate thay vì dispatch để tránh lỗi
          navigation.navigate("AdminTab");
        } else {
          navigation.navigate("Tab");
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  }, [currentUser, navigation]);

  const handleLogin = () => {
    setError("");
    console.log("Attempting login with:", username, password);
    const success = login(username, password);
    console.log("Login result:", success);

    if (!success) {
      setError("Invalid username or password");
    }
    // The useEffect will handle navigation when currentUser changes
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Nhập email"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mật khẩu:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Nhập mật khẩu"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Test buttons */}
      <View style={styles.testContainer}>
        <Text style={styles.testTitle}>Test Credentials:</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#28a745" }]}
          onPress={() => {
            setUsername("admin");
            setPassword("123");
          }}
        >
          <Text style={styles.buttonText}>Fill Admin Credentials</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007bff" }]}
          onPress={() => {
            setUsername("user@test.com");
            setPassword("user123");
          }}
        >
          <Text style={styles.buttonText}>Fill User Credentials</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Admin: admin / 123</Text>
        <Text style={styles.hintText}>User: user@test.com / user123</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    marginRight: 5,
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
  hint: {
    marginTop: 40,
    alignItems: "center",
  },
  hintText: {
    color: "#888",
    fontSize: 12,
  },
  testContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  testTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
