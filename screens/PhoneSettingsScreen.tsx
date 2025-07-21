import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhoneSettingsScreen() {
    const [currentPhone, setCurrentPhone] = useState('0909 123 456');
    const [newPhone, setNewPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const validatePhone = (phone: string) => {
        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');

        if (cleanPhone.length !== 10) {
            return { isValid: false, message: 'Số điện thoại phải có 10 chữ số' };
        }

        if (!cleanPhone.startsWith('0')) {
            return { isValid: false, message: 'Số điện thoại phải bắt đầu bằng số 0' };
        }

        if (cleanPhone === currentPhone.replace(/\D/g, '')) {
            return { isValid: false, message: 'Số điện thoại mới phải khác số hiện tại' };
        }

        return { isValid: true, message: '' };
    };

    const formatPhoneNumber = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length === 10) {
            return `${cleanPhone.slice(0, 4)} ${cleanPhone.slice(4, 7)} ${cleanPhone.slice(7)}`;
        }
        return phone;
    };

    const sendOtp = async () => {
        const validation = validatePhone(newPhone);

        if (!validation.isValid) {
            Alert.alert('Lỗi', validation.message);
            return;
        }

        setIsVerifying(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsOtpSent(true);
        setIsVerifying(false);
        setCountdown(60);

        // Start countdown
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        Alert.alert('Thành công', `Mã OTP đã được gửi đến số ${formatPhoneNumber(newPhone)}`);
    };

    const verifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            Alert.alert('Lỗi', 'Vui lòng nhập đúng 6 chữ số OTP');
            return;
        }

        setIsVerifying(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock OTP verification (123456 is correct)
        if (otp === '123456') {
            Alert.alert(
                'Xác nhận thay đổi',
                `Bạn có chắc chắn muốn đổi số điện thoại từ "${currentPhone}" thành "${formatPhoneNumber(newPhone)}" không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    },
                    {
                        text: 'Đổi số',
                        onPress: () => {
                            setCurrentPhone(formatPhoneNumber(newPhone));
                            setNewPhone('');
                            setOtp('');
                            setIsOtpSent(false);
                            setCountdown(0);
                            Alert.alert('Thành công', 'Số điện thoại đã được thay đổi');
                        }
                    }
                ]
            );
        } else {
            Alert.alert('Lỗi', 'Mã OTP không đúng');
        }

        setIsVerifying(false);
    };

    const resendOtp = () => {
        if (countdown > 0) return;
        sendOtp();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Số điện thoại</Text>
                <Text style={styles.headerSubtitle}>
                    Số điện thoại được sử dụng để đăng nhập và nhận thông báo quan trọng
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Số điện thoại hiện tại</Text>
                <View style={styles.currentPhoneContainer}>
                    <Text style={styles.currentPhone}>{currentPhone}</Text>
                    <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Đã xác thực</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đổi số điện thoại</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Số điện thoại mới</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newPhone}
                            onChangeText={(text) => setNewPhone(formatPhoneNumber(text))}
                            placeholder="Nhập số điện thoại mới"
                            keyboardType="phone-pad"
                            maxLength={12}
                        />
                        <TouchableOpacity
                            style={[styles.sendOtpButton, isVerifying && styles.sendOtpButtonDisabled]}
                            onPress={sendOtp}
                            disabled={isVerifying}
                        >
                            {isVerifying ? (
                                <Text style={styles.sendOtpButtonText}>Đang gửi...</Text>
                            ) : (
                                <Text style={styles.sendOtpButtonText}>Gửi OTP</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {isOtpSent && (
                    <View style={styles.otpSection}>
                        <Text style={styles.label}>Mã xác thực OTP</Text>
                        <Text style={styles.otpDescription}>
                            Nhập mã 6 chữ số đã được gửi đến {formatPhoneNumber(newPhone)}
                        </Text>

                        <View style={styles.otpInputContainer}>
                            <TextInput
                                style={styles.otpInput}
                                value={otp}
                                onChangeText={setOtp}
                                placeholder="000000"
                                keyboardType="number-pad"
                                maxLength={6}
                                textAlign="center"
                            />
                        </View>

                        <View style={styles.otpActions}>
                            <TouchableOpacity
                                style={[styles.verifyButton, (!otp || otp.length !== 6 || isVerifying) && styles.verifyButtonDisabled]}
                                onPress={verifyOtp}
                                disabled={!otp || otp.length !== 6 || isVerifying}
                            >
                                {isVerifying ? (
                                    <Text style={styles.verifyButtonText}>Đang xác thực...</Text>
                                ) : (
                                    <Text style={styles.verifyButtonText}>Xác thực</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.resendButton, countdown > 0 && styles.resendButtonDisabled]}
                                onPress={resendOtp}
                                disabled={countdown > 0}
                            >
                                <Text style={styles.resendButtonText}>
                                    {countdown > 0 ? `Gửi lại (${countdown}s)` : 'Gửi lại'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.requirementsContainer}>
                    <Text style={styles.requirementsTitle}>Yêu cầu số điện thoại:</Text>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>10 chữ số</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Bắt đầu bằng số 0</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Số điện thoại hợp lệ tại Việt Nam</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Không được trùng với số hiện tại</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>ℹ️ Thông tin bảo mật:</Text>
                <Text style={styles.infoText}>• Mã OTP có hiệu lực trong 5 phút</Text>
                <Text style={styles.infoText}>• Bạn có thể gửi lại OTP sau 60 giây</Text>
                <Text style={styles.infoText}>• Số điện thoại mới sẽ được xác thực</Text>
                <Text style={styles.infoText}>• Thay đổi này sẽ ảnh hưởng đến tất cả thiết bị</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    currentPhoneContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    currentPhone: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#28a745',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#28a745',
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    sendOtpButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginRight: 8,
    },
    sendOtpButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendOtpButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    otpSection: {
        marginBottom: 20,
    },
    otpDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    otpInputContainer: {
        marginBottom: 16,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 8,
        backgroundColor: '#fff',
    },
    otpActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    verifyButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        flex: 1,
        marginRight: 12,
        alignItems: 'center',
    },
    verifyButtonDisabled: {
        backgroundColor: '#ccc',
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    resendButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#007bff',
    },
    resendButtonDisabled: {
        borderColor: '#ccc',
    },
    resendButtonText: {
        color: '#007bff',
        fontSize: 14,
        fontWeight: '500',
    },
    requirementsContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    requirementText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
    },
    infoSection: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
        lineHeight: 20,
    },
}); 