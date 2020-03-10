import {inject, observer} from 'mobx-react';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Avatar from '../components/Avatar';
import {getMediaFile} from '../libs/media';
import {theme} from '../libs/theme';
import {apiUrl} from '../libs/vars';

function EditProfile({store, navigation}: any) {
  const {auth, user} = store;

  const {authUser} = auth;
  const {updateProfile, loading} = user;

  const [editableUser, setEditableUser] = useState(authUser);

  const onUploadSuccess = async ({filename}: any) => {
    const userData = {...editableUser, avatar: filename};
    user.addUser(userData);
  };

  const onUploadFail = async (error: any) => {
    console.log(error);
  };

  const processUpdateProfile = async () => {
    updateProfile({user: editableUser, navigation});
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={{flex: 1, paddingHorizontal: 50}}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 30,
              }}>
              <Avatar
                source={getMediaFile('avatar', editableUser.avatar)}
                size={120}
                onUploadSuccess={onUploadSuccess}
                onUploadFail={onUploadFail}
                token={auth.token}
                uploadUrl={`${apiUrl}/upload/avatar`}
              />

              <Text style={{fontSize: 18, color: '#fff', marginTop: 20}}>
                Upload Your Photo
              </Text>
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Full Name"
                value={editableUser.name}
                onChangeText={fullName => {
                  setEditableUser({...editableUser, name: fullName});
                }}
              />

              {auth.errors && auth.errors.errors.name && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {auth.errors.errors.name}
                </Text>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Email Address"
                value={editableUser.email}
                onChangeText={emailAddress => {
                  setEditableUser({...editableUser, email: emailAddress});
                }}
              />

              {auth.errors && auth.errors.errors.email && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {auth.errors.errors.email}
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
                value={editableUser.dob}
                onChangeText={text => {
                  setEditableUser({...editableUser, dob: text});
                }}
              />

              {auth.errors && auth.errors.errors.dob && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {auth.errors.errors.dob}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderRadius: 50,
                backgroundColor: '#fff',
                marginBottom: 10,
                padding: 2,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setEditableUser({...editableUser, gender: 'Male'});
                }}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor:
                    editableUser.gender === 'Male' ? '#ff6347' : '#fff',
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 14,
                    color: editableUser.gender === 'Male' ? '#fff' : '#000',
                  }}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditableUser({...editableUser, gender: 'Female'});
                }}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor:
                    editableUser.gender === 'Female' ? '#ff6347' : '#fff',
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 14,
                    color: editableUser.gender === 'Female' ? '#fff' : '#000',
                  }}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="School Name"
                value={editableUser.school}
                onChangeText={schoolName => {
                  setEditableUser({...editableUser, school: schoolName});
                }}
              />

              {auth.errors && auth.errors.errors.school && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {auth.errors.errors.school}
                </Text>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Class"
                value={editableUser.class}
                onChangeText={className => {
                  setEditableUser({...editableUser, class: className});
                }}
              />

              {auth.errors && auth.errors.errors.class && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {auth.errors.errors.class}
                </Text>
              )}
            </View>

            <View style={{marginTop: 10, marginBottom: 10}}>
              <TouchableOpacity
                onPress={processUpdateProfile}
                disabled={loading}
                style={{
                  backgroundColor: '#ff6347',
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default inject('store')(observer(EditProfile));
