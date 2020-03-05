import React from 'react';
import {Button, SafeAreaView, StatusBar, TextInput, View} from 'react-native';
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
        <View style={{flex: 1, padding: 10}}>
          <View style={{marginBottom: 10}}>
            <TextInput
              maxLength={4}
              style={{borderWidth: 1, borderColor: '#bbb', paddingLeft: 10}}
              value={otpState.clientOtp}
              onChangeText={otpNumber => dispatch(setClientOtp(otpNumber))}
              keyboardType="numeric"
            />
          </View>

          <View style={{marginBottom: 10}}>
            <Button title="verify otp" onPress={processVerifyOtp} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default VerifyOtp;
