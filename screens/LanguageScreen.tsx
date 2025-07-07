import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const languages = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' },
];

export default function LanguageScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };
    const onPressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ngôn ngữ / Language</Text>
            {languages.map(lang => (
                <Animated.View key={lang.code} style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        style={styles.langRow}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                    >
                        <Text style={styles.langLabel}>{lang.label}</Text>
                        <Text style={styles.selected}>{lang.code === 'vi' ? '✓' : ''}</Text>
                    </TouchableOpacity>
                </Animated.View>
            ))}
            <Text style={styles.note}>Tính năng đổi ngôn ngữ sẽ được cập nhật sau.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 24 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 24, alignSelf: 'center' },
    langRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f7f7f7', borderRadius: 10, padding: 16, marginBottom: 12 },
    langLabel: { fontSize: 16, color: '#222' },
    selected: { color: '#E91E63', fontWeight: 'bold', fontSize: 18 },
    note: { color: '#888', fontSize: 14, marginTop: 32, alignSelf: 'center' },
});
