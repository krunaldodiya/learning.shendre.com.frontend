import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {theme} from '../libs/theme';

function InvalidDevice(props: any) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <Text>Invalid Device</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default InvalidDevice;
