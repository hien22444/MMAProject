import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialAccount {
    id: string;
    name: string;
    icon: string;
    color: string;
    isConnected: boolean;
    email?: string;
}

export default function SocialAccountsScreen() {
    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
        {
            id: '1',
            name: 'Facebook',
            icon: 'logo-facebook',
            color: '#1877f2',
            isConnected: true,
            email: 'user@facebook.com'
        },
        {
            id: '2',
            name: 'Google',
            icon: 'logo-google',
            color: '#db4437',
            isConnected: false
        },
        {
            id: '3',
            name: 'Apple',
            icon: 'logo-apple',
            color: '#000000',
            isConnected: false
        }
    ]);

    const handleConnect = (account: SocialAccount) => {
        Alert.alert(
            `Kết nối ${account.name}`,
            `Bạn có muốn kết nối tài khoản ${account.name} không?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Kết nối',
                    onPress: () => {
                        setSocialAccounts(prev =>
                            prev.map(acc =>
                                acc.id === account.id
                                    ? { ...acc, isConnected: true, email: `user@${account.name.toLowerCase()}.com` }
                                    : acc
                            )
                        );
                        Alert.alert('Thành công', `Đã kết nối tài khoản ${account.name}`);
                    }
                }
            ]
        );
    };

    const handleDisconnect = (account: SocialAccount) => {
        Alert.alert(
            `Ngắt kết nối ${account.name}`,
            `Bạn có chắc chắn muốn ngắt kết nối tài khoản ${account.name} không?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Ngắt kết nối',
                    style: 'destructive',
                    onPress: () => {
                        setSocialAccounts(prev =>
                            prev.map(acc =>
                                acc.id === account.id
                                    ? { ...acc, isConnected: false, email: undefined }
                                    : acc
                            )
                        );
                        Alert.alert('Thành công', `Đã ngắt kết nối tài khoản ${account.name}`);
                    }
                }
            ]
        );
    };

    const handleRemoveAccount = (account: SocialAccount) => {
        Alert.alert(
            'Xóa tài khoản',
            `Bạn có chắc chắn muốn xóa tài khoản ${account.name} khỏi danh sách không?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: () => {
                        setSocialAccounts(prev => prev.filter(acc => acc.id !== account.id));
                        Alert.alert('Thành công', `Đã xóa tài khoản ${account.name}`);
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tài khoản mạng xã hội</Text>
                <Text style={styles.headerSubtitle}>
                    Kết nối tài khoản mạng xã hội để đăng nhập nhanh và bảo mật hơn
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tài khoản đã kết nối</Text>

                {socialAccounts.filter(account => account.isConnected).map(account => (
                    <View key={account.id} style={styles.accountItem}>
                        <View style={styles.accountInfo}>
                            <View style={[styles.iconContainer, { backgroundColor: account.color }]}>
                                <Ionicons name={account.icon as any} size={24} color="#fff" />
                            </View>
                            <View style={styles.accountDetails}>
                                <Text style={styles.accountName}>{account.name}</Text>
                                <Text style={styles.accountEmail}>{account.email}</Text>
                                <View style={styles.statusContainer}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>Đã kết nối</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.disconnectButton]}
                                onPress={() => handleDisconnect(account)}
                            >
                                <Text style={styles.disconnectButtonText}>Ngắt kết nối</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.removeButton]}
                                onPress={() => handleRemoveAccount(account)}
                            >
                                <Ionicons name="trash-outline" size={16} color="#dc3545" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {socialAccounts.filter(account => account.isConnected).length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="link-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>Chưa có tài khoản nào được kết nối</Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Kết nối tài khoản mới</Text>

                {socialAccounts.filter(account => !account.isConnected).map(account => (
                    <TouchableOpacity
                        key={account.id}
                        style={styles.accountItem}
                        onPress={() => handleConnect(account)}
                    >
                        <View style={styles.accountInfo}>
                            <View style={[styles.iconContainer, { backgroundColor: account.color }]}>
                                <Ionicons name={account.icon as any} size={24} color="#fff" />
                            </View>
                            <View style={styles.accountDetails}>
                                <Text style={styles.accountName}>{account.name}</Text>
                                <Text style={styles.accountDescription}>
                                    Kết nối để đăng nhập nhanh hơn
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="add-circle-outline" size={24} color="#007bff" />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>ℹ️ Thông tin bảo mật:</Text>
                <Text style={styles.infoText}>• Chúng tôi chỉ truy cập thông tin cần thiết</Text>
                <Text style={styles.infoText}>• Bạn có thể ngắt kết nối bất cứ lúc nào</Text>
                <Text style={styles.infoText}>• Dữ liệu được mã hóa và bảo vệ</Text>
                <Text style={styles.infoText}>• Không chia sẻ thông tin với bên thứ ba</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    accountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    accountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    accountDetails: {
        flex: 1,
    },
    accountName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    accountEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    accountDescription: {
        fontSize: 14,
        color: '#666',
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
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginLeft: 8,
    },
    disconnectButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    disconnectButtonText: {
        fontSize: 12,
        color: '#666',
    },
    removeButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dc3545',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 12,
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