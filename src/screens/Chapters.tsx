import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

function Chapters(props: any) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <Text>Chapters</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Chapters;
