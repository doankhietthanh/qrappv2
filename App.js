import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Login from './src/screen/Login';
import Scanner from './src/screen/Scanner';
import Splash from './src/screen/Splash';

const Stack = createNativeStackNavigator();

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    const run = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null && value !== '') {
          setToken(value);
        }
        // setLoading(false);
      } catch (error) {}
    };
    run();
  }, []);
  const handleOnClickBack = async () => {
    try {
      await AsyncStorage.setItem('token', '');

      setToken('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loading && (
          <Stack.Screen
            component={Splash}
            name="Splash"
            options={{headerShown: false}}
          />
        )}
        {token && !loading ? (
          <Stack.Screen
            name="Scanner"
            options={{
              headerRight: () => (
                <Icon
                  size={20}
                  name="logout"
                  solid
                  color="#000"
                  onPress={handleOnClickBack}
                />
              ),
            }}>
            {props => <Scanner {...props} setToken={setToken} token={token} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => <Login {...props} setToken={setToken} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
