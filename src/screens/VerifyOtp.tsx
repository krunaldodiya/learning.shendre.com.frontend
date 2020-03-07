import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {getPermission} from '../libs/permission';
import {theme} from '../libs/theme';
import {setClientOtp, verifyOtp} from '../store/actions/otp';

const IMEI = require('react-native-imei');

function VerifyOtp(props: any) {
  const otpState = useSelector((state: any) => state.otp);
  const dispatch = useDispatch();

  const processVerifyOtp = async () => {
    getPermission(PERMISSIONS.ANDROID.READ_PHONE_STATE).then(async () => {
      const imei = await IMEI.getImei();

      dispatch(
        verifyOtp(
          otpState.mobile,
          otpState.clientOtp,
          imei[0],
          props.navigation,
        ),
      );
    });
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
                {otpState.mobile}
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
              value={otpState.clientOtp}
              onChangeText={otpNumber => dispatch(setClientOtp(otpNumber))}
              keyboardType="numeric"
            />

            {otpState.errors && otpState.errors.errors.otp && (
              <Text style={{color: 'red', marginTop: 5}}>
                {otpState.errors.errors.otp}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={processVerifyOtp}
              style={{
                backgroundColor: '#ff6347',
                padding: 10,
                borderRadius: 50,
                elevation: 5,
              }}>
              {otpState.loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: '#fff',
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

export default VerifyOtp;
