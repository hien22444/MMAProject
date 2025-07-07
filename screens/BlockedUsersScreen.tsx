import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const blockedUsers = [
    { id: '1', name: 'Nguyễn Văn A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', reason: 'Spam tin nhắn' },
    { id: '2', name: 'Trần Thị B', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', reason: 'Bình luận không phù hợp' },
    { id: '3', name: 'Lê Văn C', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', reason: 'Lừa đảo' },
];

export default function BlockedUsersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Người dùng đã bị chặn</Text>
            {blockedUsers.length === 0 ? (
                <Text style={styles.text}>Bạn chưa chặn người dùng nào.</Text>
            ) : (
                <FlatList
                    data={blockedUsers}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userRow}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.reason}>{item.reason}</Text>
                            </View>
                            <Text style={styles.unblock}>Bỏ chặn</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 24 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
    text: { fontSize: 16, color: '#666', alignSelf: 'center', marginTop: 32 },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
    name: { fontSize: 16, fontWeight: '500', color: '#222' },
    reason: { fontSize: 13, color: '#888', marginTop: 2 },
    unblock: {
        color: '#E91E63',
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: '#fff0f6',
        overflow: 'hidden',
    },
});
