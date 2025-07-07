import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const orderFaqs = [
    {
        id: '1',
        question: 'Làm thế nào để đặt hàng?',
        answer: 'Bạn có thể đặt hàng bằng cách: 1) Chọn sản phẩm từ trang chủ, 2) Thêm vào giỏ hàng, 3) Kiểm tra giỏ hàng và chọn phương thức thanh toán, 4) Xác nhận đơn hàng.'
    },
    {
        id: '2',
        question: 'Tôi có thể hủy đơn hàng không?',
        answer: 'Bạn có thể hủy đơn hàng trong vòng 2 giờ sau khi đặt hàng. Sau thời gian này, đơn hàng sẽ được xử lý và không thể hủy.'
    },
    {
        id: '3',
        question: 'Làm sao để theo dõi đơn hàng?',
        answer: 'Bạn có thể theo dõi đơn hàng trong mục "Lịch sử đơn hàng" trong tài khoản cá nhân. Chúng tôi cũng sẽ gửi email cập nhật trạng thái đơn hàng.'
    },
    {
        id: '4',
        question: 'Tôi có thể thay đổi địa chỉ giao hàng không?',
        answer: 'Bạn có thể thay đổi địa chỉ giao hàng trong vòng 1 giờ sau khi đặt hàng. Liên hệ với chúng tôi qua hotline để được hỗ trợ.'
    },
    {
        id: '5',
        question: 'Đơn hàng tối thiểu là bao nhiêu?',
        answer: 'Hiện tại chúng tôi không có yêu cầu đơn hàng tối thiểu. Bạn có thể đặt hàng với bất kỳ giá trị nào.'
    }
];

export default function OrderHelpScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>📋 Về đơn hàng</Text>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

                    {orderFaqs.map((faq) => (
                        <View key={faq.id} style={styles.faqItem}>
                            <View style={styles.questionRow}>
                                <Ionicons name="help-circle-outline" size={20} color="#007bff" />
                                <Text style={styles.question}>{faq.question}</Text>
                            </View>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hướng dẫn đặt hàng</Text>

                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepText}>1</Text>
                        </View>
                        <Text style={styles.stepDescription}>Chọn sản phẩm từ trang chủ hoặc tìm kiếm</Text>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepText}>2</Text>
                        </View>
                        <Text style={styles.stepDescription}>Xem chi tiết sản phẩm và thêm vào giỏ hàng</Text>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepText}>3</Text>
                        </View>
                        <Text style={styles.stepDescription}>Kiểm tra giỏ hàng và chọn phương thức thanh toán</Text>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepText}>4</Text>
                        </View>
                        <Text style={styles.stepDescription}>Xác nhận thông tin và hoàn tất đơn hàng</Text>
                    </View>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Cần hỗ trợ thêm?</Text>
                    <Text style={styles.contactText}>
                        Nếu bạn cần hỗ trợ thêm về đơn hàng, vui lòng liên hệ với chúng tôi:
                    </Text>
                    <View style={styles.contactInfo}>
                        <Ionicons name="call-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Hotline: 1900-xxxx</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Ionicons name="mail-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Email: support@fashionstore.com</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    faqItem: {
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
        color: '#333',
    },
    answer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginLeft: 28,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepDescription: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    contactSection: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    contactText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    contactDetail: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
}); 