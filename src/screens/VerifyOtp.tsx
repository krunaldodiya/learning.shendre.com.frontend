import {observer} from 'mobx-react';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {PERMISSIONS} from 'react-native-permissions';
import {getPermission} from '../libs/permission';
import {theme} from '../libs/theme';
import AppStore from '../mst/store/appStore';

const IMEI = require('react-native-imei');

function VerifyOtp(props: any) {
  const {otp} = AppStore;

  const {
    verifyOtp,
    setClientOtp,
    loading,
    mobile,
    clientOtp,
    getError,
    isDisabled,
  } = otp;

  const processVerifyOtp = async () => {
    const hasPermission = await getPermission(
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
    );

    if (!hasPermission) {
      return Alert.alert('Permission Denied', 'Can not process');
    }

    const uniqueId = getUniqueId();
    const imei = await IMEI.getImei();

    await verifyOtp(mobile, clientOtp, uniqueId, imei, props.navigation);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1, padding: 50, justifyContent: 'center'}}>
          <View>
            <View style={{marginBottom: 30}}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 26,
                  textTransform: 'uppercase',
                }}>
                Verify Otp
              </Text>
            </View>

            <View style={{marginBottom: 50}}>
              <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                Please enter verification code send to
              </Text>

              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 16,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                {mobile}
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 20}}>
            <TextInput
              placeholder="OTP"
              maxLength={4}
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingLeft: 20,
                borderRadius: 50,
                elevation: 5,
              }}
              value={clientOtp}
              onChangeText={otpNumber => setClientOtp(otpNumber)}
              keyboardType="numeric"
            />

            {getError('otp') && (
              <Text style={{color: 'red', marginTop: 5}}>
                {getError('otp')}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={processVerifyOtp}
              disabled={isDisabled('clientOtp')}
              style={{
                backgroundColor: isDisabled('clientOtp') ? '#bbb' : '#ff6347',
                padding: 10,
                borderRadius: 50,
                elevation: 5,
              }}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: isDisabled('clientOtp') ? '#ddd' : '#fff',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 18,
                  }}>
                  verify otp
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default observer(VerifyOtp);
