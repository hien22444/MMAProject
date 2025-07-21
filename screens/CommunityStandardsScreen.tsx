import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const standards = [
    {
        title: 'Không spam, quảng cáo',
        desc: 'Không gửi tin nhắn rác, quảng cáo không mong muốn cho người khác.',
    },
    {
        title: 'Tôn trọng người dùng khác',
        desc: 'Không sử dụng ngôn từ thô tục, xúc phạm, kỳ thị hoặc phân biệt đối xử.',
    },
    {
        title: 'Không lừa đảo',
        desc: 'Không thực hiện các hành vi gian lận, lừa đảo trong giao dịch.',
    },
    {
        title: 'Bảo vệ thông tin cá nhân',
        desc: 'Không chia sẻ thông tin cá nhân của người khác khi chưa được phép.',
    },
    {
        title: 'Báo cáo hành vi xấu',
        desc: 'Nếu phát hiện hành vi vi phạm, hãy sử dụng chức năng báo cáo để chúng tôi xử lý.',
    },
];

export default function CommunityStandardsScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
            <Text style={styles.header}>Tiêu chuẩn cộng đồng</Text>
            <Text style={styles.text}>Vui lòng tuân thủ các tiêu chuẩn cộng đồng để đảm bảo môi trường mua bán an toàn, văn minh.</Text>
            {standards.map((item, idx) => (
                <View key={idx} style={styles.card}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
            ))}
            <Text style={styles.footer}>Vi phạm tiêu chuẩn có thể dẫn đến khoá tài khoản hoặc hạn chế tính năng.</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 24 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
    text: { fontSize: 16, color: '#666', marginBottom: 24, alignSelf: 'center', textAlign: 'center' },
    card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 2, elevation: 1 },
    cardTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4, color: '#E91E63' },
    cardDesc: { fontSize: 14, color: '#444' },
    footer: { color: '#E91E63', fontSize: 14, marginTop: 18, textAlign: 'center', fontWeight: 'bold' },
});
