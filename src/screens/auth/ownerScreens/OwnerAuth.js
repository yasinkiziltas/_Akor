import React from 'react'
import OwnerLogin from '../ownerScreens/OwnerLogin'
import OwnerRegister from '../ownerScreens/OwnerRegister'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CustomHeader from '../../../components/CustomHeader'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { ownerAuth, ownerAuth2 } from '../../../constants/images'
import { SIZES } from '../../../constants/theme'
import * as Animatable from 'react-native-animatable';

export default function OwnerAuth({ navigation }) {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Giriş' },
    { key: 'second', title: 'Kayıt Ol' },
  ]);

  const FirstScreen = () => (
    <OwnerLogin navigation={navigation} />
  );

  const SecondScreen = () => (
    <OwnerRegister navigation={navigation} />
  );

  const renderTabBar = props => (
    <TabBar
      labelStyle={{
        fontSize: 18,
        fontWeight: 'bold'
      }}
      {...props}
      indicatorStyle={{ backgroundColor: 'gray' }}
      style={{ backgroundColor: '#ff4f5a' }}
    />
  );

  const renderScene = SceneMap({
    first: FirstScreen,
    second: SecondScreen,
  });

  return (
    <>
      <View style={{ marginTop: 15 }}>
        <CustomHeader
          navigation={navigation}
          isBack={true}
        />
      </View>

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
        <Text style={styles.titleSubText}>Sahne arkadaşını bulmak için en uygun platform!</Text>

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
    flex: 1 / 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: SIZES.width / 1.15,
    height: SIZES.height / 3
  },
  titleText: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleSubText: {
    color: 'gray',
    fontSize: 12
  }
})