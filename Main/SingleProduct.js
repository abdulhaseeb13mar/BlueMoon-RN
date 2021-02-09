/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import WrapperScreen from '../Resuables/WrapperScreen';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationRef from '../Resuables/RefNavigation';
import StarRating from '../starRating/index';
import {setCurrentProductAction} from '../reduxStore/actions';

function Booking(props) {
  const [noOfItem, setNoOfItem] = useState(1);
  const product = props.product;

  const proceedToBookings = () => {
    props.setCurrentProductAction({...product, quantity: noOfItem});
    NavigationRef.Navigate('PersonalInfo');
  };

  const goBack = () => NavigationRef.GoBack();
  const increaseItem = () => setNoOfItem(noOfItem + 1);
  const decreaseItem = () => noOfItem !== 1 && setNoOfItem(noOfItem - 1);

  return (
    <WrapperScreen style={{backgroundColor: colors.secondary}}>
      <View style={styles.pt_imgBackWrapper}>
        <TouchableOpacity style={styles.crossWrapper} onPress={goBack}>
          <Entypo name="cross" size={Measurements.width * 0.07} color="black" />
        </TouchableOpacity>
        <ImageBackground
          source={product.images}
          style={styles.pt_imageBackground}
          imageStyle={{width: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.PD_1}>
        <View style={styles.detailWrapper}>
          <View style={styles.PD_2} />
          <View style={styles.PD_3}>
            <View>
              <Text style={styles.PD_4}>{product.productName}</Text>
              <View style={styles.PD_5}>
                <StarRating
                  rating={product.raiting}
                  size={Measurements.width * 0.25}
                />
                <Text style={styles.PD_6}>{product.raiting}</Text>
              </View>
            </View>
            <View style={styles.PD_7}>
              <TouchableOpacity onPress={decreaseItem} style={styles.PD_8}>
                <Entypo name="minus" color="white" size={20} />
              </TouchableOpacity>
              <Text style={styles.PD_9}>{noOfItem}</Text>
              <TouchableOpacity onPress={increaseItem} style={styles.PD_10}>
                <Entypo name="plus" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.PD_11}>{product.discription}</Text>
          <View style={styles.PD_12}>
            <View style={styles.PD_13}>
              <Text style={styles.PD_14}>${product.price}/</Text>
              <Text style={styles.PD_15}>Price</Text>
            </View>
            <View>
              <Button
                raised
                title="SHOP NOW"
                buttonStyle={styles.confirmButton}
                titleStyle={styles.buttonText}
                onPress={proceedToBookings}
              />
            </View>
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.currentProductReducer,
  };
};

export default connect(mapStateToProps, {setCurrentProductAction})(
  React.memo(Booking),
);

const styles = StyleSheet.create({
  PD_15: {
    alignSelf: 'flex-end',
    color: colors.lightGrey3,
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.035,
  },
  PD_14: {
    fontSize: Measurements.width * 0.065,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  PD_13: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  PD_12: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PD_11: {
    width: '100%',
    fontSize: Measurements.width * 0.04,
    lineHeight: Measurements.height * 0.03,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: colors.lightGrey3,
  },
  PD_10: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
  },
  PD_9: {
    fontSize: Measurements.width * 0.05,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  PD_8: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
  },
  PD_7: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Measurements.width * 0.3,
    paddingHorizontal: Measurements.width * 0.04,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 40,
  },
  PD_6: {
    marginLeft: Measurements.width * 0.045,
    color: colors.secondary,
    fontSize: Measurements.width * 0.045,
    fontWeight: 'bold',
  },
  PD_5: {
    width: Measurements.width * 0.55,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  PD_4: {
    color: colors.secondary,
    fontSize: Measurements.width * 0.05,
    fontWeight: 'bold',
    width: Measurements.width * 0.55,
  },
  PD_3: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PD_2: {
    width: Measurements.width * 0.25,
    height: Measurements.width * 0.0095,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  PD_1: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: colors.primary,
    height: Measurements.height * 0.45 + 44,
  },
  buttonText: {fontWeight: 'bold', color: colors.primary},
  confirmButton: {
    width: Measurements.width * 0.52,
    paddingVertical: Measurements.height * 0.017,
    backgroundColor: colors.secondary,
    borderRadius: 50,
  },
  crossWrapper: {
    position: 'absolute',
    padding: Measurements.width * 0.002,
    backgroundColor: 'white',
    borderRadius: 7,
    top: Measurements.height * 0.023,
    right: Measurements.width * 0.05,
  },

  detailWrapper: {
    height: Measurements.height * 0.45,
    paddingHorizontal: Measurements.width * 0.045,
    paddingVertical: Measurements.height * 0.02,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pt_imgBackWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Measurements.height * 0.55 - 22,
  },
  pt_imageBackground: {
    width: '90%',
    height: Measurements.height * 0.46 - 22,
    marginTop: Measurements.height * 0.05,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
