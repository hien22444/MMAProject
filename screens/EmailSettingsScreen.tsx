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

export default function EmailSettingsScreen() {
    const [currentEmail, setCurrentEmail] = useState('h*********3@gmail.com');
    const [newEmail, setNewEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { isValid: false, message: 'Email không đúng định dạng' };
        }

        if (email === currentEmail) {
            return { isValid: false, message: 'Email mới phải khác email hiện tại' };
        }

        return { isValid: true, message: '' };
    };

    const sendVerificationCode = async () => {
        const validation = validateEmail(newEmail);

        if (!validation.isValid) {
            Alert.alert('Lỗi', validation.message);
            return;
        }

        setIsVerifying(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsCodeSent(true);
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

        Alert.alert('Thành công', `Mã xác thực đã được gửi đến ${newEmail}`);
    };

    const verifyCode = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            Alert.alert('Lỗi', 'Vui lòng nhập đúng 6 chữ số mã xác thực');
            return;
        }

        setIsVerifying(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock verification (123456 is correct)
        if (verificationCode === '123456') {
            Alert.alert(
                'Xác nhận thay đổi',
                `Bạn có chắc chắn muốn đổi email từ "${currentEmail}" thành "${newEmail}" không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    },
                    {
                        text: 'Đổi email',
                        onPress: () => {
                            setCurrentEmail(newEmail);
                            setNewEmail('');
                            setVerificationCode('');
                            setIsCodeSent(false);
                            setCountdown(0);
                            Alert.alert('Thành công', 'Email đã được thay đổi');
                        }
                    }
                ]
            );
        } else {
            Alert.alert('Lỗi', 'Mã xác thực không đúng');
        }

        setIsVerifying(false);
    };

    const resendCode = () => {
        if (countdown > 0) return;
        sendVerificationCode();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Email nhận hóa đơn</Text>
                <Text style={styles.headerSubtitle}>
                    Email được sử dụng để nhận hóa đơn, thông báo quan trọng và khôi phục tài khoản
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Email hiện tại</Text>
                <View style={styles.currentEmailContainer}>
                    <Text style={styles.currentEmail}>{currentEmail}</Text>
                    <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Đã xác thực</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đổi email</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email mới</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newEmail}
                            onChangeText={setNewEmail}
                            placeholder="Nhập email mới"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={[styles.sendCodeButton, isVerifying && styles.sendCodeButtonDisabled]}
                            onPress={sendVerificationCode}
                            disabled={isVerifying}
                        >
                            {isVerifying ? (
                                <Text style={styles.sendCodeButtonText}>Đang gửi...</Text>
                            ) : (
                                <Text style={styles.sendCodeButtonText}>Gửi mã</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {isCodeSent && (
                    <View style={styles.verificationSection}>
                        <Text style={styles.label}>Mã xác thực</Text>
                        <Text style={styles.verificationDescription}>
                            Nhập mã 6 chữ số đã được gửi đến {newEmail}
                        </Text>

                        <View style={styles.codeInputContainer}>
                            <TextInput
                                style={styles.codeInput}
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                                placeholder="000000"
                                keyboardType="number-pad"
                                maxLength={6}
                                textAlign="center"
                            />
                        </View>

                        <View style={styles.verificationActions}>
                            <TouchableOpacity
                                style={[styles.verifyButton, (!verificationCode || verificationCode.length !== 6 || isVerifying) && styles.verifyButtonDisabled]}
                                onPress={verifyCode}
                                disabled={!verificationCode || verificationCode.length !== 6 || isVerifying}
                            >
                                {isVerifying ? (
                                    <Text style={styles.verifyButtonText}>Đang xác thực...</Text>
                                ) : (
                                    <Text style={styles.verifyButtonText}>Xác thực</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.resendButton, countdown > 0 && styles.resendButtonDisabled]}
                                onPress={resendCode}
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
                    <Text style={styles.requirementsTitle}>Yêu cầu email:</Text>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Đúng định dạng email</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Email phải tồn tại và có thể nhận thư</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Không được trùng với email hiện tại</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Email chưa được sử dụng bởi tài khoản khác</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>ℹ️ Thông tin quan trọng:</Text>
                <Text style={styles.infoText}>• Mã xác thực có hiệu lực trong 10 phút</Text>
                <Text style={styles.infoText}>• Bạn có thể gửi lại mã sau 60 giây</Text>
                <Text style={styles.infoText}>• Email mới sẽ được xác thực trước khi thay đổi</Text>
                <Text style={styles.infoText}>• Hóa đơn và thông báo sẽ được gửi đến email mới</Text>
                <Text style={styles.infoText}>• Kiểm tra thư mục spam nếu không nhận được mã</Text>
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
    currentEmailContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    currentEmail: {
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
    sendCodeButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginRight: 8,
    },
    sendCodeButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendCodeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    verificationSection: {
        marginBottom: 20,
    },
    verificationDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    codeInputContainer: {
        marginBottom: 16,
    },
    codeInput: {
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
    verificationActions: {
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