import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import RootStackScreen from './routing/index'
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { NativeBaseProvider, Box } from 'native-base';
import { Provider } from 'react-redux';
import configureStore from './store/store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const store = configureStore();

const { height, width } = Dimensions.get("window")


const MyTheme = {
  colors: {
    primary: '#000000',
    background: '#000',
    // card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(42, 42, 42)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)
  const [token, setToken] = useState(null);


  useEffect(() => {
      _retrieveUser()
  }, [])

  axios.defaults.baseURL='http://192.168.43.246:8000'
  
  const _retrieveUser = async () => {
      try {
          const auth_token = await AsyncStorage.getItem('Username');
           
      } catch (error) {
        
      }
    };


  return (
    <SafeAreaView style={styles.container}>
        <Provider store={store} token={token}> 
            <NativeBaseProvider>
            <StatusBar hidden={false}/>
              <View style={{flex: 1}}>
                    <NavigationContainer userToken={token} theme={MyTheme}>
                        <RootStackScreen userToken={token} />
                    </NavigationContainer>
                </View>
            </NativeBaseProvider>
        </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
