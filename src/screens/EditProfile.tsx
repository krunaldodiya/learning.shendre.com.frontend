import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {useSelector} from 'react-redux';
import Avatar from '../components/Avatar';
import {apiUrl} from '../libs/vars';

function EditProfile() {
  const authState = useSelector((state: any) => state.auth);

  const [user, setUser] = useState(authState.user);

  const onUploadSuccess = async (response: any) => {
    console.log(response);
  };

  const onUploadFail = async (error: any) => {
    console.log(error);
  };

  const processEditProfile = async (error: any) => {
    console.log(error);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#003333" />

      <SafeAreaView style={{flex: 1, backgroundColor: '#003333'}}>
        <View style={{flex: 1, paddingHorizontal: 50}}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 30,
            }}>
            <Avatar
              source={user.avatar}
              size={120}
              onUploadSuccess={onUploadSuccess}
              onUploadFail={onUploadFail}
              token={authState.token}
              uploadUrl={`${apiUrl}/upload/avatar`}
            />

            <Text style={{fontSize: 18, color: '#fff', marginTop: 20}}>
              Upload Your Photo
            </Text>
          </View>

          <View style={{marginBottom: 10}}>
            <TextInput
              maxLength={10}
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingLeft: 20,
                borderRadius: 50,
                elevation: 5,
              }}
              placeholder="Full Name"
              value={authState.name}
              onChangeText={fullName => {
                setUser({...user, name: fullName});
              }}
              keyboardType="numeric"
            />

            {authState.errors && authState.errors.errors.mobile && (
              <Text style={{color: 'red', marginTop: 5}}>
                {authState.errors.errors.mobile}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
            <TextInput
              maxLength={10}
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingLeft: 20,
                borderRadius: 50,
                elevation: 5,
              }}
              placeholder="Email Address"
              value={authState.email}
              onChangeText={email => {
                setUser({...user, name: email});
              }}
              keyboardType="numeric"
            />

            {authState.errors && authState.errors.errors.mobile && (
              <Text style={{color: 'red', marginTop: 5}}>
                {authState.errors.errors.mobile}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
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
              value={user.dob}
              onChangeText={text => {
                setUser({...user, dob: text});
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderRadius: 50,
              backgroundColor: '#fff',
              marginBottom: 10,
              padding: 2,
            }}>
            <View
              style={{
                flex: 1,
                padding: 12,
                backgroundColor:
                  user.gender === 'None' || user.gender === 'Male'
                    ? '#ff6347'
                    : '#fff',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  color:
                    user.gender === 'None' || user.gender === 'Male'
                      ? '#fff'
                      : '#000',
                }}>
                Male
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: user.gender === 'Female' ? '#ff6347' : '#fff',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  color: user.gender === 'Female' ? '#fff' : '#000',
                }}>
                Female
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 10}}>
            <TextInput
              maxLength={10}
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingLeft: 20,
                borderRadius: 50,
                elevation: 5,
              }}
              placeholder="School Name"
              value={authState.school}
              onChangeText={schoolName => {
                setUser({...user, school: schoolName});
              }}
              keyboardType="numeric"
            />

            {authState.errors && authState.errors.errors.mobile && (
              <Text style={{color: 'red', marginTop: 5}}>
                {authState.errors.errors.mobile}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 10}}>
            <TextInput
              maxLength={10}
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingLeft: 20,
                borderRadius: 50,
                elevation: 5,
              }}
              placeholder="Class"
              value={authState.class}
              onChangeText={className => {
                setUser({...user, class: className});
              }}
              keyboardType="numeric"
            />

            {authState.errors && authState.errors.errors.mobile && (
              <Text style={{color: 'red', marginTop: 5}}>
                {authState.errors.errors.mobile}
              </Text>
            )}
          </View>

          <View style={{marginTop: 10, marginBottom: 10}}>
            <TouchableOpacity
              onPress={processEditProfile}
              style={{
                backgroundColor: '#ff6347',
                padding: 10,
                borderRadius: 50,
                elevation: 5,
              }}>
              {authState.loading ? (
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
                  submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default EditProfile;
