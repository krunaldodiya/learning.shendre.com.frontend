import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {theme} from '../libs/theme';

function MainHeader(props: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.primary,
        padding: 15,
        alignItems: 'center',
      }}>
      <View style={{}}>
        <Icon
          type="SimpleLineIcons"
          name="menu"
          color="#fff"
          size={18}
          style={{marginRight: 15}}
          onPress={() => props.navigation.openDrawer()}
        />
      </View>

      <View style={{}}>
        <Text style={{color: '#fff', fontSize: 18, textTransform: 'uppercase'}}>
          Home
        </Text>
      </View>
    </View>
  );
}

export default MainHeader;
