import {inject, observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const PlayerModal = ({store, qualities, speeds}: any) => {
  const {player} = store;
  const {rate, quality, showModal, setShowModal, setSpeed, setQuality} = player;

  return (
    <View>
      <Modal
        isVisible={showModal}
        style={styles.bottomModal}
        onRequestClose={() => setShowModal(false, false)}>
        <View style={styles.modalContent}>
          <View>
            <View style={{marginBottom: 15, marginTop: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={styles.key}>Speed</Text>
              </View>

              <View style={styles.keyWrapper}>
                {speeds.map((speedData: any) => {
                  return (
                    <TouchableOpacity
                      key={speedData}
                      onPress={() => setSpeed(speedData)}
                      style={[
                        styles.valueWrapper,
                        rate === speedData && styles.selectedValueWrapper,
                      ]}>
                      <Text
                        style={[
                          styles.value,
                          rate === speedData && styles.selectedValue,
                        ]}>
                        {speedData}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={{marginBottom: 10, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={styles.key}>Quality</Text>
              </View>

              <View style={styles.keyWrapper}>
                {qualities.map((qualityData: any) => {
                  return (
                    <TouchableOpacity
                      key={qualityData}
                      onPress={() => setQuality(qualityData)}
                      style={[
                        styles.valueWrapper,
                        quality === qualityData && styles.selectedValueWrapper,
                      ]}>
                      <Text
                        style={[
                          styles.value,
                          quality === qualityData && styles.selectedValue,
                        ]}>
                        {qualityData}p
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomModal: {justifyContent: 'flex-end', margin: 0},
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  key: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  keyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  value: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal',
  },
  valueWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  selectedValue: {
    color: '#fff',
  },
  selectedValueWrapper: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
});

export default inject('store')(observer(PlayerModal));
