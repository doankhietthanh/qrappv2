import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.loader}
        source={require('../assets/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 200,
  },
});
