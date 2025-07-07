import React, { useRef } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function ChatSettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cài đặt Chat</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Nhận tin nhắn từ người lạ</Text>
                <Switch value={false} disabled thumbColor="#fff" trackColor={{ false: '#ccc', true: '#E91E63' }} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Thông báo khi có tin nhắn mới</Text>
                <Switch value={true} disabled thumbColor="#fff" trackColor={{ false: '#ccc', true: '#E91E63' }} />
            </View>
            <Text style={styles.note}>Các cài đặt chat nâng cao sẽ được cập nhật sau.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 24 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 24, alignSelf: 'center' },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, backgroundColor: '#f7f7f7', borderRadius: 10, padding: 16 },
    label: { fontSize: 16, color: '#222' },
    note: { color: '#888', fontSize: 14, marginTop: 32, alignSelf: 'center' },
});
