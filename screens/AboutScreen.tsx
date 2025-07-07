import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Pressable } from 'react-native';

export default function AboutScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };
    const onPressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.header}>Giới thiệu</Text>
            <Text style={styles.text}>Ứng dụng mua sắm hiện đại, an toàn và tiện lợi cho mọi người.{"\n"}Phiên bản 1.0.0</Text>
            <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
                <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}>
                    <Text style={styles.cardTitle}>Liên hệ hỗ trợ</Text>
                </Pressable>
                <Text style={styles.cardDesc}>Email: support@shoppr.vn{"\n"}Hotline: 1900 1234</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 40 },
    logo: { width: 80, height: 80, marginBottom: 16 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    text: { fontSize: 16, color: '#666', marginBottom: 24, textAlign: 'center' },
    card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 20, width: '90%', alignItems: 'center', marginTop: 8 },
    button: { paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#E91E63', borderRadius: 8, marginBottom: 10, shadowColor: '#E91E63', shadowOpacity: 0.15, shadowRadius: 6, elevation: 2 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
    cardDesc: { fontSize: 14, color: '#888', textAlign: 'center' },
});
