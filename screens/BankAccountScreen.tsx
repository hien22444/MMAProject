import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Pressable } from 'react-native';

export default function BankAccountScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <Text style={styles.header}>Tài khoản / Thẻ ngân hàng</Text>
            <Text style={styles.text}>Bạn chưa liên kết tài khoản/thẻ ngân hàng nào.</Text>
            <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
                <Pressable
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
                >
                    <Text style={styles.cardTitle}>Thêm tài khoản/thẻ mới</Text>
                </Pressable>
                <Text style={styles.cardDesc}>Liên kết tài khoản ngân hàng để thanh toán nhanh chóng và an toàn hơn.</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 40 },
    icon: { width: 60, height: 60, marginBottom: 16 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    text: { fontSize: 16, color: '#666', marginBottom: 24 },
    card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 20, width: '90%', alignItems: 'center', marginTop: 8 },
    button: { paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#E91E63', borderRadius: 8, marginBottom: 10 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
    cardDesc: { fontSize: 14, color: '#888', textAlign: 'center' },
});
