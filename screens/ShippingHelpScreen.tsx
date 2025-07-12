import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RequireAuth from '../components/RequireAuth';

const shippingFaqs = [
    {
        id: '1',
        question: 'Thời gian giao hàng là bao lâu?',
        answer: 'Thời gian giao hàng từ 1-3 ngày làm việc tùy thuộc vào khu vực. Khu vực nội thành TP.HCM: 1-2 ngày, các tỉnh khác: 2-3 ngày.'
    },
    {
        id: '2',
        question: 'Phí vận chuyển là bao nhiêu?',
        answer: 'Phí vận chuyển cố định 30.000đ cho tất cả đơn hàng. Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên.'
    },
    {
        id: '3',
        question: 'Tôi có thể chọn thời gian giao hàng không?',
        answer: 'Có, bạn có thể chọn khung giờ giao hàng: Sáng (8h-12h), Chiều (13h-17h), Tối (18h-21h) khi đặt hàng.'
    },
    {
        id: '4',
        question: 'Làm sao để theo dõi đơn hàng?',
        answer: 'Bạn sẽ nhận được SMS và email cập nhật trạng thái đơn hàng. Cũng có thể theo dõi trong mục "Lịch sử đơn hàng".'
    },
    {
        id: '5',
        question: 'Đơn hàng bị giao sai địa chỉ thì sao?',
        answer: 'Nếu đơn hàng bị giao sai, vui lòng liên hệ ngay với chúng tôi qua hotline để được hỗ trợ và điều chỉnh.'
    }
];

const shippingMethods = [
    {
        id: '1',
        name: 'Giao hàng tiêu chuẩn',
        time: '1-3 ngày',
        fee: '30.000đ',
        description: 'Giao hàng trong giờ hành chính'
    },
    {
        id: '2',
        name: 'Giao hàng nhanh',
        time: '2-4 giờ',
        fee: '50.000đ',
        description: 'Giao hàng trong ngày (chỉ áp dụng nội thành)'
    },
    {
        id: '3',
        name: 'Giao hàng miễn phí',
        time: '1-3 ngày',
        fee: 'Miễn phí',
        description: 'Áp dụng cho đơn hàng từ 500.000đ'
    }
];

export default function ShippingHelpScreen() {
    return (
        <RequireAuth message="Đăng nhập để xem thông tin về vận chuyển và giao hàng">
            <View style={styles.container}>
                <Text style={styles.header}>🚚 Vận chuyển & Giao hàng</Text>

                <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>

                    {shippingMethods.map((method) => (
                        <View key={method.id} style={styles.methodItem}>
                            <View style={styles.methodHeader}>
                                <Text style={styles.methodName}>{method.name}</Text>
                                <Text style={styles.methodFee}>{method.fee}</Text>
                            </View>
                            <Text style={styles.methodTime}>⏱ Thời gian: {method.time}</Text>
                            <Text style={styles.methodDescription}>{method.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

                    {shippingFaqs.map((faq) => (
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
                    <Text style={styles.sectionTitle}>Khu vực giao hàng</Text>

                    <View style={styles.areaItem}>
                        <Ionicons name="location-outline" size={20} color="#28a745" />
                        <View style={styles.areaInfo}>
                            <Text style={styles.areaName}>Nội thành TP.HCM</Text>
                            <Text style={styles.areaTime}>Giao hàng: 1-2 ngày</Text>
                        </View>
                    </View>

                    <View style={styles.areaItem}>
                        <Ionicons name="location-outline" size={20} color="#ffc107" />
                        <View style={styles.areaInfo}>
                            <Text style={styles.areaName}>Ngoại thành TP.HCM</Text>
                            <Text style={styles.areaTime}>Giao hàng: 2-3 ngày</Text>
                        </View>
                    </View>

                    <View style={styles.areaItem}>
                        <Ionicons name="location-outline" size={20} color="#dc3545" />
                        <View style={styles.areaInfo}>
                            <Text style={styles.areaName}>Các tỉnh khác</Text>
                            <Text style={styles.areaTime}>Giao hàng: 2-3 ngày</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Lưu ý khi nhận hàng</Text>

                    <View style={styles.noteItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.noteText}>Kiểm tra sản phẩm trước khi ký nhận</Text>
                    </View>

                    <View style={styles.noteItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.noteText}>Từ chối nhận hàng nếu sản phẩm bị hư hỏng</Text>
                    </View>

                    <View style={styles.noteItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.noteText}>Giữ lại biên nhận để đổi trả nếu cần</Text>
                    </View>

                    <View style={styles.noteItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.noteText}>Liên hệ ngay nếu có vấn đề với đơn hàng</Text>
                    </View>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Cần hỗ trợ về vận chuyển?</Text>
                    <Text style={styles.contactText}>
                        Nếu bạn có thắc mắc về vận chuyển, vui lòng liên hệ:
                    </Text>
                    <View style={styles.contactInfo}>
                        <Ionicons name="call-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Hotline: 1900-xxxx</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Ionicons name="mail-outline" size={16} color="#007bff" />
                        <Text style={styles.contactDetail}>Email: shipping@fashionstore.com</Text>
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
        padding: 12,
        marginBottom: 12,
    },
    methodHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    methodName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    methodFee: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
    methodTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    methodDescription: {
        fontSize: 14,
        color: '#666',
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
    areaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    areaInfo: {
        marginLeft: 12,
        flex: 1,
    },
    areaName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    areaTime: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
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