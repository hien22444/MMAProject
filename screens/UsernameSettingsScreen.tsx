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

export default function UsernameSettingsScreen() {
    const [currentUsername, setCurrentUsername] = useState('anhbakhia');
    const [newUsername, setNewUsername] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    const validateUsername = (username: string) => {
        const minLength = 3;
        const maxLength = 20;
        const validChars = /^[a-zA-Z0-9_]+$/;

        if (username.length < minLength) {
            return { isValid: false, message: `Tên người dùng phải có ít nhất ${minLength} ký tự` };
        }

        if (username.length > maxLength) {
            return { isValid: false, message: `Tên người dùng không được quá ${maxLength} ký tự` };
        }

        if (!validChars.test(username)) {
            return { isValid: false, message: 'Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới' };
        }

        if (username === currentUsername) {
            return { isValid: false, message: 'Tên người dùng mới phải khác tên hiện tại' };
        }

        return { isValid: true, message: '' };
    };

    const checkUsernameAvailability = async (username: string) => {
        setIsChecking(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock availability check
        const unavailableUsernames = ['admin', 'user', 'test', 'demo', 'guest'];
        const isAvailable = !unavailableUsernames.includes(username.toLowerCase());

        setIsChecking(false);
        return isAvailable;
    };

    const handleChangeUsername = async () => {
        const validation = validateUsername(newUsername);

        if (!validation.isValid) {
            Alert.alert('Lỗi', validation.message);
            return;
        }

        const isAvailable = await checkUsernameAvailability(newUsername);

        if (!isAvailable) {
            Alert.alert('Lỗi', 'Tên người dùng này đã được sử dụng');
            return;
        }

        Alert.alert(
            'Xác nhận thay đổi',
            `Bạn có chắc chắn muốn đổi tên người dùng từ "${currentUsername}" thành "${newUsername}" không?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Đổi tên',
                    onPress: () => {
                        setCurrentUsername(newUsername);
                        setNewUsername('');
                        Alert.alert('Thành công', 'Tên người dùng đã được thay đổi');
                    }
                }
            ]
        );
    };

    const handleCheckAvailability = async () => {
        if (!newUsername) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên người dùng mới');
            return;
        }

        const validation = validateUsername(newUsername);
        if (!validation.isValid) {
            Alert.alert('Lỗi', validation.message);
            return;
        }

        const isAvailable = await checkUsernameAvailability(newUsername);

        if (isAvailable) {
            Alert.alert('Thành công', 'Tên người dùng này có thể sử dụng');
        } else {
            Alert.alert('Lỗi', 'Tên người dùng này đã được sử dụng');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tên người dùng</Text>
                <Text style={styles.headerSubtitle}>
                    Tên người dùng sẽ hiển thị trong hồ sơ và được sử dụng để đăng nhập
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tên người dùng hiện tại</Text>
                <View style={styles.currentUsernameContainer}>
                    <Text style={styles.currentUsername}>{currentUsername}</Text>
                    <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Đang sử dụng</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đổi tên người dùng</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Tên người dùng mới</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder="Nhập tên người dùng mới"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={[styles.checkButton, isChecking && styles.checkButtonDisabled]}
                            onPress={handleCheckAvailability}
                            disabled={isChecking}
                        >
                            {isChecking ? (
                                <Text style={styles.checkButtonText}>Đang kiểm tra...</Text>
                            ) : (
                                <Text style={styles.checkButtonText}>Kiểm tra</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.requirementsContainer}>
                    <Text style={styles.requirementsTitle}>Yêu cầu tên người dùng:</Text>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>3-20 ký tự</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Chỉ chứa chữ cái, số và dấu gạch dưới</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Không được trùng với tên hiện tại</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                        <Text style={styles.requirementText}>Không được trùng với người dùng khác</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        (!newUsername || isChecking) && styles.submitButtonDisabled
                    ]}
                    onPress={handleChangeUsername}
                    disabled={!newUsername || isChecking}
                >
                    <Text style={styles.submitButtonText}>Đổi tên người dùng</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>⚠️ Lưu ý quan trọng:</Text>
                <Text style={styles.infoText}>• Tên người dùng chỉ có thể thay đổi 1 lần trong 30 ngày</Text>
                <Text style={styles.infoText}>• Sau khi đổi, bạn sẽ cần đăng nhập lại</Text>
                <Text style={styles.infoText}>• Tên người dùng cũ sẽ không thể sử dụng lại</Text>
                <Text style={styles.infoText}>• Thay đổi này sẽ ảnh hưởng đến tất cả thiết bị đăng nhập</Text>
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
    currentUsernameContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    currentUsername: {
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
    checkButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginRight: 8,
    },
    checkButtonDisabled: {
        backgroundColor: '#ccc',
    },
    checkButtonText: {
        color: '#fff',
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
    submitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
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