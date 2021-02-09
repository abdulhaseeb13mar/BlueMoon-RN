/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import Data from '../dummyData';
import {colors} from '../Resuables/frequentColors';
import {Measurements} from '../Resuables/Measurement';
import Loop from '../Resuables/looping';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import MyHeader from '../Resuables/MyHeader';
import NavigationRef from '../Resuables/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {setCurrentProductAction} from '../reduxStore/actions';

function Explore(props) {
  useEffect(() => {
    changeTab(Data.catagory[0]);
  }, []);
  const [categories, setCategories] = useState(Data.catagory);
  const [currentCat, setCurrentCat] = useState(Data.catagory[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const changeTab = (tab) => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  const GotoSearch = () => NavigationRef.Navigate('SearchLamps');
  const GoToHome = () => NavigationRef.Navigate('Home');
  const GoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    NavigationRef.Navigate('SingleProduct');
  };

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container}>
        <MyHeader
          leftIcon={Entypo}
          rightIcon={Entypo}
          Title="Explore"
          leftIconName="home"
          rightIconName="magnifying-glass"
          leftIconAction={GoToHome}
          rightIconAction={GotoSearch}
        />
        <View style={styles.listingWrapper}>
          <Loop
            data={categories}
            renderItem={({item}) => (
              <Tabs item={item} currentCat={currentCat} changeTab={changeTab} />
            )}
          />
        </View>
        <View style={styles.PaintingTilesWrapper}>
          {tabProducts.length > 0 &&
            tabProducts.map((item, index) => {
              return (
                <ExploreTile
                  key={item.id}
                  item={{...item}}
                  GoToSingleProduct={GoToSingleProduct}
                />
              );
            })}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export const ExploreTile = ({item, GoToSingleProduct}) => {
  return (
    <TouchableOpacity
      onPress={() => GoToSingleProduct(item)}
      style={styles.ExploreTileWrapper}>
      <View style={styles.EP_2}>
        <ImageBackground
          source={item.images}
          style={styles.EP_3}
          resizeMode="center"
        />
      </View>
      <View style={styles.EP_4}>
        <Text style={styles.EP_5}>{item.productName}</Text>
        <Text style={styles.EP_6}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Tabs = ({item, currentCat, changeTab}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => changeTab(item)}>
      {item.catagory === currentCat.catagory ? (
        <View style={{...styles.tabIndicator}} />
      ) : null}
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.catagory === currentCat.catagory ? 'black' : colors.lightGrey3,
        }}>
        {item.catagory}
      </Text>
    </TouchableOpacity>
  );
};

export default connect(null, {setCurrentProductAction})(Explore);

const styles = StyleSheet.create({
  EP_6: {
    fontSize: Measurements.width * 0.036,
    color: colors.orange,
    fontWeight: 'bold',
  },
  EP_5: {
    width: '100%',
    fontSize: Measurements.width * 0.038,
    fontWeight: 'bold',
    color: colors.primary,
  },
  EP_4: {
    width: Measurements.width * 0.38,
    marginTop: Measurements.height * 0.006,
  },
  EP_3: {
    width: Measurements.width * 0.4,
    height: Measurements.width * 0.6,
  },
  EP_2: {
    backgroundColor: colors.secondary,
    paddingVertical: Measurements.height * 0.01,
    paddingHorizontal: Measurements.width * 0.02,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  ExploreTileWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    marginVertical: Measurements.height * 0.008,
  },
  PaintingTilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  container: {flex: 1},
  tabIndicator: {
    width: 7,
    height: 7,
    borderWidth: 1.8,
    borderRadius: 50,
    marginTop: -6,
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  HomeTabsText: {
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: Measurements.width * 0.045,
    height: Measurements.width * 0.1,
    paddingHorizontal: Measurements.width * 0.02,
    paddingTop: Measurements.width * 0.02,
  },
});
