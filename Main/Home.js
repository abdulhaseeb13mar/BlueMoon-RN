/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import {colors} from '../Resuables/frequentColors';
import {Measurements} from '../Resuables/Measurement';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Data from '../dummyData';
import Loop from '../Resuables/looping';
import MyHeader from '../Resuables/MyHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import RefNavigation from '../Resuables/RefNavigation';
import {connect} from 'react-redux';
import {setCurrentProductAction} from '../reduxStore/actions';

function Home(props) {
  useEffect(() => {
    setNewArrival();
    setSuggested();
  }, []);
  const [NewCategory, setNewCategory] = useState([]);
  const [suggestedCategory, setSuggestedCategory] = useState([]);

  const setNewArrival = () => {
    const newArrival = Data.product.filter((item) => item.categoryId === '1');
    setNewCategory(newArrival);
  };
  const setSuggested = () => {
    const suggested = Data.product.filter((item) => item.categoryId === '2');
    setSuggestedCategory(suggested);
  };

  const GoToExplore = () => RefNavigation.Navigate('Explore');
  const GotoSearch = () => RefNavigation.Navigate('SearchLamps');
  const GoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    RefNavigation.Navigate('SingleProduct');
  };
  return (
    <WrapperScreen style={{backgroundColor: colors.secondary}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <MyHeader
          leftIcon={Entypo}
          rightIcon={Entypo}
          Title="LAMP"
          leftIconName="dots-three-horizontal"
          rightIconName="magnifying-glass"
          leftIconAction={GoToExplore}
          rightIconAction={GotoSearch}
        />
        <View style={{marginVertical: Measurements.height * 0.015}}>
          {NewCategory.length > 0 && (
            <Loop
              data={NewCategory}
              renderItem={({item}) => (
                <LandingTile
                  item={item}
                  GoToSingleProduct={GoToSingleProduct}
                />
              )}
            />
          )}
          <View style={styles.divider}>
            <View style={styles.divider2} />
          </View>
        </View>
        <View
          style={{
            ...styles.SG_1,
            backgroundColor: suggestedCategory.length > 0 && colors.primary,
          }}>
          <Text style={styles.SG_2}>Suggest For you</Text>
          <View>
            {suggestedCategory.length > 0 && (
              <Loop
                data={suggestedCategory}
                renderItem={({item}) => (
                  <SuggestedTile
                    item={item}
                    GoToSingleProduct={GoToSingleProduct}
                  />
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const LandingTile = ({item, GoToSingleProduct}) => {
  return (
    <TouchableOpacity
      onPress={() => GoToSingleProduct(item)}
      style={styles.LT_1}>
      <ImageBackground
        source={item.images}
        style={styles.LT_2}
        resizeMode="center"
      />
      <View style={styles.LT_3}>
        <Text style={styles.LT_4}>{item.productName}</Text>
        <Text style={styles.LT_5}>${item.price}</Text>
      </View>
      <View style={styles.ratingView}>
        <AntDesign
          name="star"
          color="#ffce33"
          size={Measurements.width * 0.04}
        />
        <Text style={{...styles.ratingText, fontWeight: 'bold'}}>
          {item.raiting}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const SuggestedTile = ({item, GoToSingleProduct}) => {
  return (
    <TouchableOpacity
      onPress={() => GoToSingleProduct(item)}
      style={styles.ST_1}>
      <ImageBackground
        source={item.images}
        style={styles.ST_2}
        resizeMode="center"
      />
      <View style={styles.ST_3}>
        <Text style={styles.ST_4}>{item.productName}</Text>
        <View style={styles.ST_5}>
          <Text style={styles.ST_6}>${item.price}</Text>
          <View style={styles.ratingView}>
            <AntDesign
              name="star"
              color="#ffce33"
              size={Measurements.width * 0.04}
            />
            <Text style={styles.ratingText}>{item.raiting}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ST_6: {
    fontSize: Measurements.width * 0.036,
    color: colors.darkGray,
  },
  ST_5: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  ST_4: {
    width: '100%',
    fontSize: Measurements.width * 0.038,
    fontWeight: 'bold',
    color: colors.primary,
  },
  ST_3: {
    width: '100%',
    marginTop: 5,
  },
  ST_2: {
    width: Measurements.width * 0.3,
    height: Measurements.height * 0.15,
  },
  ST_1: {
    padding: Measurements.width * 0.028,
    width: Measurements.width * 0.4,
    marginHorizontal: Measurements.width * 0.02,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  LT_5: {
    width: '30%',
    textAlign: 'right',
    fontSize: Measurements.width * 0.05,
    fontWeight: '700',
    color: colors.primary,
  },
  LT_4: {
    width: '70%',
    fontSize: Measurements.width * 0.05,
    fontWeight: 'bold',
    color: colors.primary,
  },
  LT_3: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  LT_2: {
    width: Measurements.width * 0.55,
    height: Measurements.height * 0.3,
  },
  LT_1: {
    borderColor: colors.lightGrey2,
    borderWidth: 1.5,
    padding: Measurements.width * 0.028,
    width: Measurements.width * 0.8,
    marginHorizontal: Measurements.width * 0.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  SG_2: {
    marginVertical: Measurements.height * 0.018,
    color: colors.lightGrey2,
    fontWeight: 'bold',
    fontSize: 15,
  },
  SG_1: {
    marginTop: Measurements.height * 0.02,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    paddingBottom: Measurements.height * 0.052,
    paddingLeft: Measurements.width * 0.06,
  },
  divider2: {
    borderColor: colors.lightGrey3,
    borderWidth: 1,
    width: '60%',
  },
  divider: {display: 'flex', alignItems: 'center', marginTop: 5},
  ratingView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: Measurements.width * 0.036,
    marginLeft: Measurements.width * 0.015,
    color: colors.primary,
  },
});

export default connect(null, {setCurrentProductAction})(Home);
