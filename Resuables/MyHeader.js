import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../Resuables/frequentColors';
import {Measurements} from '../Resuables/Measurement';

function MyHeader(props) {
  const LeftIconLibrary = props.leftIcon;
  const RightIconLibrary = props.rightIcon;
  return (
    <View style={styles.HeaderBarWrapper}>
      <View style={styles.HeaderBarInnerWrapper}>
        <TouchableOpacity
          onPress={props.leftIconAction}
          style={styles.IconWrap}>
          <LeftIconLibrary
            name={props.leftIconName}
            size={Measurements.width * 0.065}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>{props.Title}</Text>
        <TouchableOpacity
          onPress={props.rightIconAction}
          style={styles.IconWrap}>
          <RightIconLibrary
            name={props.rightIconName}
            size={Measurements.width * 0.065}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: Measurements.width * 0.08,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Measurements.width * 0.93,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.015,
  },
});

export default MyHeader;
