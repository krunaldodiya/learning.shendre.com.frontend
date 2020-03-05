import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

function EditProfile() {
  const [dob, setDob] = useState('27/06/1987');

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <TextInputMask
            style={{
              backgroundColor: 'white',
              paddingVertical: 10,
              paddingLeft: 20,
              borderRadius: 50,
              elevation: 5,
            }}
            placeholder="Date of Birth (DD/MM/YYYY)"
            type={'datetime'}
            options={{format: 'DD/MM/YYYY'}}
            value={dob}
            onChangeText={text => setDob(text)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default EditProfile;
