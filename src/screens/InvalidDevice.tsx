import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {theme} from '../libs/theme';

function InvalidDevice(props: any) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: 28, textAlign: 'center'}}>
            Device already registered.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default InvalidDevice;
