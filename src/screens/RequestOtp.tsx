import {observer} from 'mobx-react';
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
import {theme} from '../libs/theme';
import AppStore from '../mst/store/appStore';

function RequestOtp(props: any) {
  const {otp} = AppStore;

  const {requestOtp, setMobile, loading, mobile, getError, isDisabled} = otp;

  const processRequestOtp = async () => {
    await requestOtp(mobile, props.navigation);
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
              value={mobile}
              onChangeText={mobileNumber => setMobile(mobileNumber)}
              keyboardType="numeric"
              autoFocus={true}
            />

            {getError('mobile') && (
              <Text style={{color: 'red', marginTop: 5}}>
                {getError('mobile')}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={processRequestOtp}
              disabled={isDisabled('mobile')}
              style={{
                backgroundColor: isDisabled('mobile') ? '#bbb' : '#ff6347',
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
                    color: isDisabled('mobile') ? '#ddd' : '#fff',
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

export default observer(RequestOtp);
