import React from 'react'
import OwnerLogin from '../ownerScreens/OwnerLogin'
import OwnerRegister from '../ownerScreens/OwnerRegister'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { ownerAuth, ownerAuth2 } from '../../../constants/images'
import { SIZES } from '../../../constants/theme'
import * as Animatable from 'react-native-animatable';

const FirstScreen = () => (
  <OwnerLogin />
);

const SecondScreen = () => (
  <OwnerRegister />
);

const renderTabBar = props => (
  <TabBar
    labelStyle={{
      fontWeight: 'bold'
    }}
    {...props}
    indicatorStyle={{ backgroundColor: 'black' }}
    style={{ backgroundColor: '#ff4f5a' }}
  />
);

const renderScene = SceneMap({
  first: FirstScreen,
  second: SecondScreen,
});

export default function OwnerAuth() {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Giriş' },
    { key: 'second', title: 'Kayıt Ol' },
  ]);

  return (
    <>
      <Animatable.View
      animation="slideInUp"
      style={styles.container}>
        <ImageBackground
          imageStyle={{
            borderRadius: 30,
          }}
          source={ownerAuth2}
          style={styles.img}
        />
        <Text style={styles.titleText}>AKOR</Text>
      </Animatable.View>


      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SIZES.width }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: SIZES.width / 1.1,
    height: SIZES.height / 2
  },
  titleText: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})