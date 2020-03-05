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
import {requestOtp, setMobile} from '../store/actions/otp';

function RequestOtp(props: any) {
  const otpState = useSelector((state: any) => state.otp);
  const dispatch = useDispatch();

  const processRequestOtp = async () => {
    dispatch(requestOtp(otpState.mobile, props.navigation));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, padding: 50}}>
          <View style={{marginBottom: 20}}>
            <TextInput
              maxLength={10}
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingLeft: 20,
                borderRadius: 50,
                elevation: 5,
              }}
              placeholder="Mobile Number"
              value={otpState.mobile}
              onChangeText={mobileNumber => dispatch(setMobile(mobileNumber))}
              keyboardType="numeric"
            />

            {otpState.errors && otpState.errors.errors.mobile && (
              <Text style={{color: 'red', marginTop: 5}}>
                {otpState.errors.errors.mobile}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={processRequestOtp}
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

export default RequestOtp;
