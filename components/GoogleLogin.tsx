import React, { useEffect } from 'react';
import { Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '../contexts/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const { login } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '1077647505488-j3v58hrh7l3e5srgpmklgv0rhhn1he74.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const getUserInfo = async () => {
        try {
          const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${response.authentication?.accessToken}` },
          });
          const userInfo = await res.json();

          // Gọi hàm login từ context, truyền email + password rỗng
          login(userInfo.email, ''); // Bạn có thể sửa thành login({...}) nếu dùng kiểu object
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      };

      getUserInfo();
    }
  }, [response]);

  return (
    <Button
      title="Login with Google"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
};

export default GoogleLogin;
