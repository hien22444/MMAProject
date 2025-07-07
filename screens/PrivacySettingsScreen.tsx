import React, { useRef } from 'react';
import { View, Text, StyleSheet, Switch, Animated, Pressable, Alert } from 'react-native';

export default function PrivacySettingsScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };
    const onPressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };
    const handleAdvancedSettings = () => {
        Alert.alert('Cài đặt nâng cao', 'Tính năng sẽ sớm cập nhật!');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cài đặt riêng tư</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Ẩn thông tin cá nhân</Text>
                <Switch value={false} disabled thumbColor="#fff" trackColor={{ false: '#ccc', true: '#E91E63' }} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Chặn người lạ xem hồ sơ</Text>
                <Switch value={true} disabled thumbColor="#fff" trackColor={{ false: '#ccc', true: '#E91E63' }} />
            </View>
            <Text style={styles.note}>Các tuỳ chọn riêng tư sẽ được cập nhật thêm.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 24 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 24, alignSelf: 'center' },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, backgroundColor: '#f7f7f7', borderRadius: 10, padding: 16 },
    label: { fontSize: 16, color: '#222' },
    note: { color: '#888', fontSize: 14, marginTop: 32, alignSelf: 'center' },
    advancedButton: {
        backgroundColor: '#E91E63',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 32,
        alignItems: 'center',
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 4,
    },
    advancedButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});
