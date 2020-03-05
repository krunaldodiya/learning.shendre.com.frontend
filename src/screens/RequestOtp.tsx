import React from 'react';
import {Button, SafeAreaView, StatusBar, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setMobile, requestOtp} from '../store/actions/otp';

function RequestOtp(props: any) {
  const otpState = useSelector((state: any) => state.otp);
  const dispatch = useDispatch();

  const processRequestOtp = async () => {
    dispatch(requestOtp(otpState.mobile, props.navigation));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <View style={{marginBottom: 10}}>
            <TextInput
              maxLength={10}
              style={{borderWidth: 1, borderColor: '#bbb', paddingLeft: 10}}
              value={otpState.mobile}
              onChangeText={mobileNumber => dispatch(setMobile(mobileNumber))}
              keyboardType="numeric"
            />
          </View>

          <View style={{marginBottom: 10}}>
            <Button title="request otp" onPress={processRequestOtp} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default RequestOtp;
