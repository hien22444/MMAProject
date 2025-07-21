import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setError('Password must include uppercase letter and special character');
      return;
    }

    try {
      const success = await register(email, password);
      if (!success) {
        setError('User already exists');
      } else {
        navigation.replace('ProfileInfo');
      }
    } catch (err) {
      console.log(err);
      setError('Registration failed');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Sign up with one of the following</Text>

      {/* Social Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#000" />
          <Text style={styles.socialText}>With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="facebook-square" size={20} color="#000" />
          <Text style={styles.socialText}>With Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <Text style={styles.label}>Email*</Text>
      <View style={styles.inputContainer}>
        <Entypo name="email" size={20} color="#777" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password*</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#777" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password*</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#777" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flex: 0.48,
    justifyContent: 'center',
    gap: 6,
  },
  socialText: {
    fontSize: 14,
    color: '#333',
  },
  label: {
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
    color: '#222',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4A00E0',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  linkText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4A00E0',
  },
});
