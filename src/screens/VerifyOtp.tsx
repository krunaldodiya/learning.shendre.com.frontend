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
import {useDispatch, useSelector} from 'react-redux';
import {setClientOtp, verifyOtp} from '../store/actions/otp';

const IMEI = require('react-native-imei');

function VerifyOtp(props: any) {
  const otpState = useSelector((state: any) => state.otp);
  const dispatch = useDispatch();

  const processVerifyOtp = async () => {
    const imei = await IMEI.getImei();
    dispatch(
      verifyOtp(otpState.mobile, otpState.clientOtp, imei[0], props.navigation),
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 50}}>
          <View style={{marginBottom: 20}}>
            <TextInput
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
                  request otp
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
