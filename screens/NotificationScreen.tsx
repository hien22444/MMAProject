import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
    { id: '1', title: 'Đơn hàng của bạn đang được xử lý' },
    { id: '2', title: 'Sản phẩm yêu thích đang giảm giá!' },
    { id: '3', title: 'Giao hàng thành công. Cảm ơn bạn!' },
    { id: '4', title: 'Tài khoản của bạn vừa được cập nhật' },
];

export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>🔔 Thông báo</Text>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text style={styles.notificationText}>{item.title}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    notificationItem: {
        paddingVertical: 14,
    },
    notificationText: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
});
