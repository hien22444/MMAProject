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
import { useAuth } from '../contexts/AuthContext';

export default function ChangePasswordScreen() {
    const { currentUser } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
            errors: {
                length: password.length < minLength,
                upperCase: !hasUpperCase,
                lowerCase: !hasLowerCase,
                numbers: !hasNumbers,
                specialChar: !hasSpecialChar,
            }
        };
    };

    const handleChangePassword = () => {
        // Validate current password
        if (currentPassword !== currentUser?.password) {
            Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng');
            return;
        }

        // Validate new password
        const validation = validatePassword(newPassword);
        if (!validation.isValid) {
            Alert.alert('Lỗi', 'Mật khẩu mới không đáp ứng yêu cầu bảo mật');
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }

        // Check if new password is same as current
        if (currentPassword === newPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới phải khác mật khẩu hiện tại');
            return;
        }

        // Success
        Alert.alert(
            'Thành công',
            'Mật khẩu đã được thay đổi thành công',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                    }
                }
            ]
        );
    };

    const validation = validatePassword(newPassword);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
                <Text style={styles.headerSubtitle}>
                    Đảm bảo mật khẩu mới của bạn mạnh và khác với mật khẩu hiện tại
                </Text>
            </View>

            <View style={styles.form}>
                {/* Current Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mật khẩu hiện tại</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={!showCurrentPassword}
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            <Ionicons
                                name={showCurrentPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* New Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mật khẩu mới</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            placeholder="Nhập mật khẩu mới"
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            <Ionicons
                                name={showNewPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Password Requirements */}
                {newPassword.length > 0 && (
                    <View style={styles.requirementsContainer}>
                        <Text style={styles.requirementsTitle}>Yêu cầu mật khẩu:</Text>
                        <View style={styles.requirementItem}>
                            <Ionicons
                                name={validation.errors.length ? 'close-circle' : 'checkmark-circle'}
                                size={16}
                                color={validation.errors.length ? '#dc3545' : '#28a745'}
                            />
                            <Text style={[styles.requirementText, validation.errors.length && styles.errorText]}>
                                Ít nhất 8 ký tự
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons
                                name={validation.errors.upperCase ? 'close-circle' : 'checkmark-circle'}
                                size={16}
                                color={validation.errors.upperCase ? '#dc3545' : '#28a745'}
                            />
                            <Text style={[styles.requirementText, validation.errors.upperCase && styles.errorText]}>
                                Có chữ hoa (A-Z)
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons
                                name={validation.errors.lowerCase ? 'close-circle' : 'checkmark-circle'}
                                size={16}
                                color={validation.errors.lowerCase ? '#dc3545' : '#28a745'}
                            />
                            <Text style={[styles.requirementText, validation.errors.lowerCase && styles.errorText]}>
                                Có chữ thường (a-z)
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons
                                name={validation.errors.numbers ? 'close-circle' : 'checkmark-circle'}
                                size={16}
                                color={validation.errors.numbers ? '#dc3545' : '#28a745'}
                            />
                            <Text style={[styles.requirementText, validation.errors.numbers && styles.errorText]}>
                                Có số (0-9)
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons
                                name={validation.errors.specialChar ? 'close-circle' : 'checkmark-circle'}
                                size={16}
                                color={validation.errors.specialChar ? '#dc3545' : '#28a745'}
                            />
                            <Text style={[styles.requirementText, validation.errors.specialChar && styles.errorText]}>
                                Có ký tự đặc biệt (!@#$%^&*)
                            </Text>
                        </View>
                    </View>
                )}

                {/* Confirm Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons
                                name={showConfirmPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                    {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                        <Text style={styles.errorText}>Mật khẩu không khớp</Text>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        (!currentPassword || !newPassword || !confirmPassword || !validation.isValid || newPassword !== confirmPassword) &&
                        styles.submitButtonDisabled
                    ]}
                    onPress={handleChangePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword || !validation.isValid || newPassword !== confirmPassword}
                >
                    <Text style={styles.submitButtonText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>💡 Lưu ý bảo mật:</Text>
                <Text style={styles.infoText}>• Không chia sẻ mật khẩu với người khác</Text>
                <Text style={styles.infoText}>• Sử dụng mật khẩu khác nhau cho các tài khoản</Text>
                <Text style={styles.infoText}>• Thay đổi mật khẩu định kỳ</Text>
                <Text style={styles.infoText}>• Bật xác thực 2 yếu tố nếu có thể</Text>
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
    form: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
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
    eyeButton: {
        padding: 12,
    },
    requirementsContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginTop: 8,
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
    errorText: {
        color: '#dc3545',
    },
    submitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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