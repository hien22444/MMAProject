import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chính sách và Điều khoản</Text>

            <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
            <Text style={styles.text}>
                Chào mừng bạn đến với ứng dụng của chúng tôi. Khi bạn sử dụng ứng dụng này, bạn đã đồng ý tuân thủ các điều khoản và chính sách được quy định tại đây.
            </Text>

            <Text style={styles.sectionTitle}>2. Quyền riêng tư</Text>
            <Text style={styles.text}>
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Mọi dữ liệu cá nhân được thu thập sẽ được xử lý và lưu trữ an toàn.
            </Text>

            <Text style={styles.sectionTitle}>3. Điều khoản sử dụng</Text>
            <Text style={styles.text}>
                Người dùng không được sử dụng ứng dụng cho các mục đích vi phạm pháp luật hoặc gây ảnh hưởng xấu đến hệ thống và cộng đồng.
            </Text>

            <Text style={styles.sectionTitle}>4. Sửa đổi chính sách</Text>
            <Text style={styles.text}>
                Chúng tôi có thể cập nhật chính sách và điều khoản này bất cứ lúc nào. Các thay đổi sẽ được thông báo trong ứng dụng.
            </Text>

            <Text style={styles.sectionTitle}>5. Liên hệ</Text>
            <Text style={styles.text}>
                Nếu bạn có bất kỳ câu hỏi nào về điều khoản hoặc chính sách, vui lòng liên hệ với chúng tôi qua Trung tâm hỗ trợ.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
    },
});

export default PolicyScreen;
