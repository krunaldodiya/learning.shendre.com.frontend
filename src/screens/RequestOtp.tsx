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
import {theme} from '../libs/theme';

function RequestOtp(props: any) {
  const otpState = useSelector((state: any) => state.otp);
  const dispatch = useDispatch();

  const processRequestOtp = async () => {
    dispatch(requestOtp(otpState.mobile, props.navigation));
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
                Request Otp
              </Text>
            </View>

            <View style={{marginBottom: 50}}>
              <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                Please enter your mobile to receive verification code.
              </Text>
            </View>
          </View>

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
              autoFocus={true}
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
