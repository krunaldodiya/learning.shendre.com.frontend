import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <Text>Home</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;
