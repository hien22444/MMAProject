import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const InfoItem = ({
    label,
    value,
    onPress,
}: {
    label: string;
    value?: string;
    onPress?: () => void;
}) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueContainer}>
            {value && <Text style={styles.value}>{value}</Text>}
            <Feather name="chevron-right" size={20} color="gray" />
        </View>
    </TouchableOpacity>
);

const AccountSecurityScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = (label: string) => {
        if (label === 'Hồ sơ của tôi') {
            navigation.navigate('MyProfile');

        } else {
            // Với các mục khác, bạn có thể dùng Alert hoặc để trống
            console.log(`Đã chọn: ${label}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tài Khoản</Text>

            <InfoItem label="Hồ sơ của tôi" onPress={() => handlePress('Hồ sơ của tôi')} />
            <InfoItem label="Tên người dùng" value="7dxofpzngl" />
            <InfoItem label="Điện thoại" value="*****95" />
            <InfoItem label="Email nhận hóa đơn" value="h*********3@gmail.com" />
            <InfoItem label="Tài khoản mạng xã hội" onPress={() => handlePress('Tài khoản mạng xã hội')} />
            <InfoItem label="Đổi mật khẩu" onPress={() => handlePress('Đổi mật khẩu')} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 14,
        color: 'gray',
        fontWeight: '500',
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        marginRight: 8,
        fontSize: 14,
        color: '#555',
    },
});

export default AccountSecurityScreen;
