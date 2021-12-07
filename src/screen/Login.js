import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const Login = ({setToken}) => {
  const [studentID, setStudentID] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = () => {
    Keyboard.dismiss();
    if (studentID == '') {
      ToastAndroid.showWithGravity(
        'StudentID is empty',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    if (name == '') {
      ToastAndroid.showWithGravity(
        'Name is empty',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    setLoading(true);
    fetch('https://qr-server-191.herokuapp.com/getToken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentID,
        name,
      }),
    })
      .then(res => res.json())
      .then(async result => {
        setLoading(false);
        if (result.success) {
          try {
            await AsyncStorage.setItem('token', result.data.token);
            setToken(result.data.token);
          } catch (error) {
            console.log(error);
          }
        } else {
          ToastAndroid.showWithGravity(
            result.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.coverLoading}>
          <LottieView
            style={styles.loader}
            source={require('../assets/loader_login.json')}
            autoPlay
            loop
          />
        </View>
      )}
      <View style={styles.box}>
        <Text style={styles.welcome}>Welcome!</Text>
        <TextInput
          style={styles.textInput}
          value={studentID}
          onChangeText={setStudentID}
          placeholder={'Student ID'}
          placeholderTextColor={'#666'}
        />
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder={'Name'}
          placeholderTextColor={'#666'}
        />
        <TouchableNativeFeedback
          onPress={handleOnSubmit}
          background={TouchableNativeFeedback.Ripple('#fff', false)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={styles.mark} />
      <View style={styles.mark2} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  box: {
    width: '80%',
  },
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#dfe3ed',
    marginVertical: 5,
    paddingHorizontal: 20,
    color: '#555',
    borderRadius: 7,
    zIndex: 20,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#ff5c2c',

    marginVertical: 17,
    paddingVertical: 13,
    borderRadius: 7,
    zIndex: 20,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  welcome: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  mark: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#feded4',
    borderRadius: 1000,
    bottom: 0,
    right: 0,
    transform: [
      {
        translateX: 150,
      },
      {
        translateY: 150,
      },
    ],
  },
  mark2: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#ffbeab',
    borderRadius: 1000,
    bottom: 0,
    left: 0,
    transform: [
      {
        translateX: -100,
      },
      {
        translateY: 100,
      },
    ],
  },
  coverLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000024',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
});
