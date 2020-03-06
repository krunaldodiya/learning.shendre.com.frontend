import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screens} from '../libs/screens';

function Home(props: any) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity
            onPress={() => props.navigation.push(screens.EditProfile)}>
            <Text>edit profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;
