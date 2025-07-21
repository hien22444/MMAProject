import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RequireAuth from '../components/RequireAuth';

const refundPolicies = [
    {
        id: '1',
        title: 'Đổi trả trong 7 ngày',
        description: 'Đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng',
        conditions: ['Sản phẩm còn nguyên vẹn', 'Còn tem mác', 'Chưa sử dụng'],
        icon: 'calendar-outline'
    },
    {
        id: '2',
        title: 'Hoàn tiền 100%',
        description: 'Hoàn tiền 100% giá trị sản phẩm nếu có lỗi từ nhà sản xuất',
        conditions: ['Sản phẩm bị lỗi', 'Có bằng chứng rõ ràng', 'Trong thời hạn bảo hành'],
        icon: 'card-outline'
    },
    {
        id: '3',
        title: 'Đổi size/màu',
        description: 'Đổi size hoặc màu sắc khác nếu còn hàng',
        conditions: ['Trong vòng 3 ngày', 'Còn hàng trong kho', 'Sản phẩm nguyên vẹn'],
        icon: 'shirt-outline'
    }
];

const refundSteps = [
    {
        step: '1',
        title: 'Liên hệ hỗ trợ',
        description: 'Gọi hotline hoặc chat với CSKH để báo cáo vấn đề'
    },
    {
        step: '2',
        title: 'Chụp ảnh sản phẩm',
        description: 'Chụp ảnh sản phẩm và gửi cho chúng tôi để kiểm tra'
    },
    {
        step: '3',
        title: 'Gửi sản phẩm về',
        description: 'Đóng gói và gửi sản phẩm về kho của chúng tôi'
    },
    {
        step: '4',
        title: 'Kiểm tra và xử lý',
        description: 'Chúng tôi kiểm tra và xử lý đổi trả trong 3-5 ngày'
    },
    {
        step: '5',
        title: 'Hoàn tiền/Đổi hàng',
        description: 'Hoàn tiền vào tài khoản hoặc gửi sản phẩm mới'
    }
];

const refundFaqs = [
    {
        id: '1',
        question: 'Tôi có thể đổi trả sản phẩm không vừa size không?',
        answer: 'Có, bạn có thể đổi size trong vòng 3 ngày kể từ ngày nhận hàng, miễn là còn hàng trong kho và sản phẩm còn nguyên vẹn.'
    },
    {
        id: '2',
        question: 'Thời gian hoàn tiền là bao lâu?',
        answer: 'Thời gian hoàn tiền từ 3-7 ngày làm việc tùy thuộc vào phương thức thanh toán ban đầu.'
    },
    {
        id: '3',
        question: 'Tôi phải trả phí vận chuyển khi đổi trả không?',
        answer: 'Nếu lỗi từ chúng tôi, bạn không phải trả phí vận chuyển. Nếu đổi trả do lý do cá nhân, bạn sẽ chịu phí vận chuyển về.'
    },
    {
        id: '4',
        question: 'Sản phẩm đã sử dụng có đổi trả được không?',
        answer: 'Không, chúng tôi chỉ chấp nhận đổi trả sản phẩm chưa sử dụng, còn nguyên vẹn và tem mác.'
    },
    {
        id: '5',
        question: 'Tôi có thể đổi trả sản phẩm khuyến mãi không?',
        answer: 'Có, sản phẩm khuyến mãi vẫn được đổi trả theo chính sách thông thường.'
    }
];

export default function RefundHelpScreen() {
    return (
        <RequireAuth message="Đăng nhập để xem thông tin về hoàn trả và hoàn tiền">
            <View style={styles.container}>
                <Text style={styles.header}>🔄 Hoàn trả & Hoàn tiền</Text>

                <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chính sách đổi trả</Text>

                    {refundPolicies.map((policy) => (
                        <View key={policy.id} style={styles.policyItem}>
                            <View style={styles.policyHeader}>
                                <Ionicons name={policy.icon as any} size={24} color="#007bff" />
                                <Text style={styles.policyTitle}>{policy.title}</Text>
                            </View>
                            <Text style={styles.policyDescription}>{policy.description}</Text>

                            <Text style={styles.conditionsTitle}>Điều kiện:</Text>
                            {policy.conditions.map((condition, index) => (
                                <View key={index} style={styles.conditionItem}>
                                    <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                                    <Text style={styles.conditionText}>{condition}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quy trình đổi trả</Text>

                    {refundSteps.map((step) => (
                        <View key={step.step} style={styles.stepItem}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepText}>{step.step}</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>{step.title}</Text>
                                <Text style={styles.stepDescription}>{step.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

                    {refundFaqs.map((faq) => (
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
                    <Text style={styles.sectionTitle}>Lưu ý quan trọng</Text>

                    <View style={styles.noteItem}>
                        <Ionicons name="warning-outline" size={20} color="#ffc107" />
                        <Text style={styles.noteText}>Sản phẩm phải còn nguyên vẹn, chưa sử dụng</Text>
                    </View>

                    <View style={styles.noteItem}>
                        <Ionicons name="warning-outline" size={20} color="#ffc107" />
                        <Text style={styles.noteText}>Tem mác và phụ kiện đi kèm phải còn đầy đủ</Text>
                    </View>

                    <View style={styles.noteItem}>
                        <Ionicons name="warning-outline" size={20} color="#ffc107" />
                        <Text style={styles.noteText}>Không áp dụng cho sản phẩm đã giảm giá sâu</Text>
                    </View>

                    <View style={styles.noteItem}>
                        <Ionicons name="warning-outline" size={20} color="#ffc107" />
                        <Text style={styles.noteText}>Chỉ áp dụng cho khách hàng mua hàng chính hãng</Text>
                    </View>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Cần hỗ trợ đổi trả?</Text>
                    <Text style={styles.contactText}>
                        Nếu bạn cần hỗ trợ về đổi trả, vui lòng liên hệ:
                    </Text>
                    <View style={styles.contactInfo}>
                        <Ionicons name="call-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Hotline: 1900-xxxx</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Ionicons name="mail-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Email: refund@fashionstore.com</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Ionicons name="time-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Giờ làm việc: 8h-22h (Thứ 2 - Chủ nhật)</Text>
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
    policyItem: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    policyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    policyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
        flex: 1,
    },
    policyDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    conditionsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    conditionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    conditionText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
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
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    noteText: {
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