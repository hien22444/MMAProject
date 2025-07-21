import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RequireAuth from '../components/RequireAuth';

const contactMethods = [
    {
        id: '1',
        name: 'Hotline',
        number: '1900-xxxx',
        description: 'Hỗ trợ 24/7 cho các vấn đề khẩn cấp',
        icon: 'call-outline',
        color: '#28a745',
        action: () => Linking.openURL('tel:1900-xxxx')
    },
    {
        id: '2',
        name: 'Chat trực tuyến',
        number: 'Chat với CSKH',
        description: 'Hỗ trợ nhanh chóng qua chat',
        icon: 'chatbubbles-outline',
        color: '#007bff',
        action: () => alert('Chức năng chat sẽ được mở')
    },
    {
        id: '3',
        name: 'Email',
        number: 'support@fashionstore.com',
        description: 'Gửi email cho các vấn đề chi tiết',
        icon: 'mail-outline',
        color: '#ffc107',
        action: () => Linking.openURL('mailto:support@fashionstore.com')
    },
    {
        id: '4',
        name: 'Facebook',
        number: 'Fashion Store Official',
        description: 'Theo dõi và liên hệ qua Facebook',
        icon: 'logo-facebook',
        color: '#1877f2',
        action: () => Linking.openURL('https://facebook.com/fashionstore')
    },
    {
        id: '5',
        name: 'Zalo',
        number: 'Fashion Store Zalo',
        description: 'Liên hệ qua Zalo Official Account',
        icon: 'chatbubble-outline',
        color: '#0068ff',
        action: () => Linking.openURL('https://zalo.me/fashionstore')
    }
];

const supportHours = [
    {
        day: 'Thứ 2 - Thứ 6',
        hours: '8:00 - 22:00',
        status: 'Mở cửa'
    },
    {
        day: 'Thứ 7',
        hours: '8:00 - 20:00',
        status: 'Mở cửa'
    },
    {
        day: 'Chủ nhật',
        hours: '9:00 - 18:00',
        status: 'Mở cửa'
    }
];

const commonIssues = [
    {
        id: '1',
        title: 'Đơn hàng bị lỗi',
        description: 'Đơn hàng không hiển thị hoặc bị lỗi',
        solution: 'Kiểm tra email xác nhận hoặc liên hệ hotline'
    },
    {
        id: '2',
        title: 'Thanh toán thất bại',
        description: 'Không thể thanh toán đơn hàng',
        solution: 'Kiểm tra thông tin thẻ hoặc thử phương thức khác'
    },
    {
        id: '3',
        title: 'Giao hàng chậm',
        description: 'Đơn hàng chưa được giao đúng hạn',
        solution: 'Theo dõi trạng thái đơn hàng hoặc liên hệ CSKH'
    },
    {
        id: '4',
        title: 'Sản phẩm bị lỗi',
        description: 'Sản phẩm nhận được có vấn đề',
        solution: 'Chụp ảnh và liên hệ để đổi trả'
    }
];

export default function ContactHelpScreen() {
    return (
        <RequireAuth message="Đăng nhập để xem thông tin liên hệ hỗ trợ">
            <View style={styles.container}>
                <Text style={styles.header}>📞 Liên hệ hỗ trợ</Text>

                <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phương thức liên hệ</Text>

                    {contactMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={styles.contactItem}
                            onPress={method.action}
                        >
                            <View style={styles.contactHeader}>
                                <Ionicons name={method.icon as any} size={24} color={method.color} />
                                <View style={styles.contactInfo}>
                                    <Text style={styles.contactName}>{method.name}</Text>
                                    <Text style={styles.contactNumber}>{method.number}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#ccc" />
                            </View>
                            <Text style={styles.contactDescription}>{method.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giờ làm việc</Text>

                    {supportHours.map((schedule, index) => (
                        <View key={index} style={styles.scheduleItem}>
                            <View style={styles.scheduleHeader}>
                                <Text style={styles.scheduleDay}>{schedule.day}</Text>
                                <Text style={styles.scheduleStatus}>{schedule.status}</Text>
                            </View>
                            <Text style={styles.scheduleHours}>{schedule.hours}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vấn đề thường gặp</Text>

                    {commonIssues.map((issue) => (
                        <View key={issue.id} style={styles.issueItem}>
                            <View style={styles.issueHeader}>
                                <Ionicons name="warning-outline" size={20} color="#ffc107" />
                                <Text style={styles.issueTitle}>{issue.title}</Text>
                            </View>
                            <Text style={styles.issueDescription}>{issue.description}</Text>
                            <View style={styles.solutionContainer}>
                                <Ionicons name="bulb-outline" size={16} color="#28a745" />
                                <Text style={styles.solutionText}>{issue.solution}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin liên hệ chi tiết</Text>

                    <View style={styles.infoItem}>
                        <Ionicons name="business-outline" size={20} color="#007bff" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Địa chỉ công ty:</Text>
                            <Text style={styles.infoValue}>123 Nguyễn Huệ, Quận 1, TP.HCM</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={20} color="#007bff" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Giờ làm việc:</Text>
                            <Text style={styles.infoValue}>8:00 - 22:00 (Thứ 2 - Chủ nhật)</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="mail-outline" size={20} color="#007bff" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Email chung:</Text>
                            <Text style={styles.infoValue}>info@fashionstore.com</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="call-outline" size={20} color="#007bff" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Tổng đài:</Text>
                            <Text style={styles.infoValue}>1900-xxxx (Miễn phí)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hướng dẫn liên hệ hiệu quả</Text>

                    <View style={styles.tipItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.tipText}>Chuẩn bị thông tin đơn hàng trước khi liên hệ</Text>
                    </View>

                    <View style={styles.tipItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.tipText}>Mô tả vấn đề rõ ràng và chi tiết</Text>
                    </View>

                    <View style={styles.tipItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.tipText}>Chụp ảnh minh chứng nếu có vấn đề với sản phẩm</Text>
                    </View>

                    <View style={styles.tipItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.tipText}>Lưu lại mã đơn hàng để tra cứu nhanh</Text>
                    </View>
                </View>

                <View style={styles.emergencySection}>
                    <Text style={styles.emergencyTitle}>🚨 Khẩn cấp</Text>
                    <Text style={styles.emergencyText}>
                        Nếu bạn gặp vấn đề khẩn cấp, vui lòng gọi ngay:
                    </Text>
                    <TouchableOpacity
                        style={styles.emergencyButton}
                        onPress={() => Linking.openURL('tel:1900-xxxx')}
                    >
                        <Ionicons name="call" size={24} color="#fff" />
                        <Text style={styles.emergencyButtonText}>Gọi ngay: 1900-xxxx</Text>
                    </TouchableOpacity>
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
    contactItem: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    contactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    contactInfo: {
        flex: 1,
        marginLeft: 12,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    contactNumber: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: '500',
    },
    contactDescription: {
        fontSize: 14,
        color: '#666',
        marginLeft: 36,
    },
    scheduleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    scheduleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scheduleDay: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    scheduleStatus: {
        fontSize: 12,
        color: '#28a745',
        backgroundColor: '#e8f5e8',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    scheduleHours: {
        fontSize: 14,
        color: '#666',
    },
    issueItem: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    issueHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    issueTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
    issueDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        marginLeft: 28,
    },
    solutionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 28,
    },
    solutionText: {
        fontSize: 14,
        color: '#28a745',
        fontWeight: '500',
        marginLeft: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    infoContent: {
        flex: 1,
        marginLeft: 12,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        color: '#666',
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
    emergencySection: {
        backgroundColor: '#fff3cd',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ffeaa7',
    },
    emergencyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#856404',
        marginBottom: 8,
    },
    emergencyText: {
        fontSize: 14,
        color: '#856404',
        marginBottom: 16,
    },
    emergencyButton: {
        backgroundColor: '#dc3545',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    emergencyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
}); 