import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setInitialScreen} from '../store/actions/set_initial_screen';

function Login(props: any) {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Login</Text>

      <Button
        title="change"
        onPress={() => {
          dispatch(setInitialScreen('Home'));
          props.navigation.replace('Home');
        }}
      />
    </View>
  );
}

export default Login;
