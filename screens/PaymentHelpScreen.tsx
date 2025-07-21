import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RequireAuth from '../components/RequireAuth';

const paymentMethods = [
    {
        id: '1',
        name: 'Thanh toán khi nhận hàng (COD)',
        icon: 'cash-outline',
        description: 'Thanh toán bằng tiền mặt khi nhận hàng',
        pros: ['Không cần thẻ ngân hàng', 'An toàn, kiểm tra hàng trước'],
        cons: ['Chỉ áp dụng cho đơn hàng dưới 2 triệu']
    },
    {
        id: '2',
        name: 'Thẻ tín dụng/ghi nợ',
        icon: 'card-outline',
        description: 'Thanh toán qua thẻ Visa, Mastercard',
        pros: ['Thanh toán nhanh chóng', 'Bảo mật cao', 'Tích điểm thẻ'],
        cons: ['Cần có thẻ ngân hàng']
    },
    {
        id: '3',
        name: 'Ví điện tử',
        icon: 'wallet-outline',
        description: 'Thanh toán qua MoMo, ZaloPay, VNPay',
        pros: ['Thanh toán nhanh', 'Có nhiều ưu đãi', 'Dễ sử dụng'],
        cons: ['Cần cài đặt app ví điện tử']
    },
    {
        id: '4',
        name: 'Chuyển khoản ngân hàng',
        icon: 'business-outline',
        description: 'Chuyển khoản trực tiếp đến tài khoản ngân hàng',
        pros: ['Không mất phí', 'An toàn'],
        cons: ['Cần thực hiện thủ công', 'Chờ xác nhận']
    }
];

const paymentFaqs = [
    {
        id: '1',
        question: 'Tôi có thể thanh toán bằng tiền mặt không?',
        answer: 'Có, bạn có thể chọn thanh toán khi nhận hàng (COD) cho đơn hàng dưới 2 triệu đồng.'
    },
    {
        id: '2',
        question: 'Thẻ của tôi bị từ chối thanh toán?',
        answer: 'Vui lòng kiểm tra: 1) Thẻ còn hạn sử dụng, 2) Đủ số dư, 3) Thông tin thẻ chính xác, 4) Thẻ được kích hoạt giao dịch online.'
    },
    {
        id: '3',
        question: 'Tôi có thể hủy thanh toán không?',
        answer: 'Bạn có thể hủy thanh toán trong vòng 30 phút sau khi thực hiện. Sau thời gian này, giao dịch sẽ được xử lý.'
    },
    {
        id: '4',
        question: 'Thông tin thanh toán có an toàn không?',
        answer: 'Chúng tôi sử dụng công nghệ mã hóa SSL để bảo vệ thông tin thanh toán của bạn. Thông tin không được lưu trữ trên hệ thống.'
    },
    {
        id: '5',
        question: 'Tôi có nhận được hóa đơn không?',
        answer: 'Có, bạn sẽ nhận được hóa đơn điện tử qua email sau khi thanh toán thành công.'
    }
];

export default function PaymentHelpScreen() {
    return (
        <RequireAuth message="Đăng nhập để xem thông tin về thanh toán">
            <View style={styles.container}>
                <Text style={styles.header}>💳 Thanh toán</Text>

                <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

                    {paymentMethods.map((method) => (
                        <View key={method.id} style={styles.methodItem}>
                            <View style={styles.methodHeader}>
                                <Ionicons name={method.icon as any} size={24} color="#007bff" />
                                <Text style={styles.methodName}>{method.name}</Text>
                            </View>
                            <Text style={styles.methodDescription}>{method.description}</Text>

                            <View style={styles.prosConsContainer}>
                                <View style={styles.prosContainer}>
                                    <Text style={styles.prosTitle}>✅ Ưu điểm:</Text>
                                    {method.pros.map((pro, index) => (
                                        <Text key={index} style={styles.prosText}>• {pro}</Text>
                                    ))}
                                </View>

                                <View style={styles.consContainer}>
                                    <Text style={styles.consTitle}>⚠️ Lưu ý:</Text>
                                    {method.cons.map((con, index) => (
                                        <Text key={index} style={styles.consText}>• {con}</Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

                    {paymentFaqs.map((faq) => (
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
                    <Text style={styles.sectionTitle}>Bảo mật thanh toán</Text>

                    <View style={styles.securityItem}>
                        <Ionicons name="shield-checkmark-outline" size={20} color="#28a745" />
                        <Text style={styles.securityText}>Mã hóa SSL 256-bit</Text>
                    </View>

                    <View style={styles.securityItem}>
                        <Ionicons name="lock-closed-outline" size={20} color="#28a745" />
                        <Text style={styles.securityText}>Không lưu trữ thông tin thẻ</Text>
                    </View>

                    <View style={styles.securityItem}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#28a745" />
                        <Text style={styles.securityText}>Tuân thủ chuẩn PCI DSS</Text>
                    </View>

                    <View style={styles.securityItem}>
                        <Ionicons name="eye-off-outline" size={20} color="#28a745" />
                        <Text style={styles.securityText}>Bảo vệ thông tin cá nhân</Text>
                    </View>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Cần hỗ trợ thanh toán?</Text>
                    <Text style={styles.contactText}>
                        Nếu bạn gặp vấn đề với thanh toán, vui lòng liên hệ:
                    </Text>
                    <View style={styles.contactInfo}>
                        <Ionicons name="call-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Hotline: 1900-xxxx</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Ionicons name="mail-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Email: payment@fashionstore.com</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
        </RequireAuth>
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
    methodItem: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    methodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    methodName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
        flex: 1,
    },
    methodDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    prosConsContainer: {
        flexDirection: 'row',
    },
    prosContainer: {
        flex: 1,
        marginRight: 8,
    },
    prosTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#28a745',
        marginBottom: 4,
    },
    prosText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    consContainer: {
        flex: 1,
        marginLeft: 8,
    },
    consTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffc107',
        marginBottom: 4,
    },
    consText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
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
    securityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    securityText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
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