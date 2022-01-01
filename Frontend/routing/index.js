import React, { useState, useEffect, Component } from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/home/Home';
import Search from '../screens/search/Search';
import Product from '../screens/product/Product';
import Account from '../screens/account/Account';
import UnAuthUser from '../screens/auth/UnauthUser';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import SearchResults from '../screens/search/SearchResults';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch, useSelector } from 'react-redux';


const options = {
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: '#000000',
        elevation: 1,
        height: 50,
        elevation: 1, // remove shadow on Android
        shadowOpacity: 1, // remove shadow on iOS
        borderBottomWidth: 1 
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    animation: 'slide_from_right'
}


const HomeStack = createNativeStackNavigator()
const HomeStackScreen = () => {
    return(
        <HomeStack.Navigator name="PostCommentsScreen">
            <HomeStack.Screen options={({}) => ({...options, headerShown: false})} name="Home" component={Home} />
            <HomeStack.Screen options={({}) => ({...options, headerShown: true, headerTitle: "", animation: 'simple_push'})} name="SearchResults" component={SearchResults} />
        </HomeStack.Navigator>
    )
}


const SearchStack = createNativeStackNavigator()
const SearchStackScreen = () => {
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen options={({}) => ({...options, headerShown: false})} name="Search" component={Search} />
        </SearchStack.Navigator>
    )
}


// const SearchResultsStack = createNativeStackNavigator()
// const SearchResultsScreen = () => {
//     return(
//         <SearchResultsStack.Navigator>
//             <SearchResultsStack.Screen options={({}) => ({...options, headerShown: false})} name="SearchResults" component={SearchResults} />
//         </SearchResultsStack.Navigator>
//     )
// }


const ProductStack = createNativeStackNavigator()
const ProductStackScreen = () => {
    return(
        <ProductStack.Navigator
            screenOptions={{
                headerShown: true,
                animation: 'slide_from_bottom'
            }}
        >
            <ProductStack.Screen options={({}) => ({...options, headerShown: true})} name="Product" component={Product} />
        </ProductStack.Navigator>
    )
}


const AccountStack = createNativeStackNavigator()
const AccountStackScreen = () => {
    const [ isAuthUser, setIsAuthUser ] = React.useState(false)
    const [ authRedux, setAuthRedux ] = React.useState(false)
    const getAuth = async () => {
        try {
            // const data = await AsyncStorage.getItem('Email');
            const data = await AsyncStorage.getItem('Username');
            // console.log(data)
            if (data !== null) {
                    setIsAuthUser(true)
            }
            else{
                setIsAuthUser(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const state = useSelector(state => state.accountAuthReducer)
    
    React.useEffect(() => {
        getAuth()
    }, [state])

    React.useEffect(() => {
        getAuth()
    }, [])

    return(
        <AccountStack.Navigator>
            {isAuthUser ?(
                <AccountStack.Screen options={({}) => ({...options, headerShown: false})} name="Account" component={Account} />
            ):(
                <>
                    <AccountStack.Screen options={({}) => ({...options, headerShown: true, headerTitle: "Authentication"})} name="Authentication" component={UnAuthUser} />
                    <AccountStack.Screen options={({}) => ({...options, headerShown: true, headerTitle: "Log in"})} name="Login" component={Login} />
                    <AccountStack.Screen options={({}) => ({...options, headerShown: true, headerTitle:"Sign up"})} name="Signup" component={SignUp} />
                </>
            )}
            
        </AccountStack.Navigator>
    )
}



const Tabs = createBottomTabNavigator();
export function TabsScreen ({ navigation, route, userToken }) {
    return (
        <Tabs.Navigator
            optimizationsEnabled={true}
            headerShown='none'
            headerMode="none"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                lazy: true,
            }}
            defaultScreenOptions={{
            headerForeInset: { top: 'never', bottom: 'never'},
            }}

            tabBarOptions={{
                keyboardHidesTabBar: true,
                inactiveTintColor: 'rgb(182, 182, 182)',
                activeTintColor: '#fff',
                activeBackgroundColor: '#000000',
                inactiveBackgroundColor: '#000000',
                    style: {
                          backgroundColor: '#fff',
                    }
             }}
        >
            <Tabs.Screen name="HomeTap" 
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: ({focused, color, size }) => (
                            <MaterialCommunityIcons name={focused? 'home': 'home-outline'} color={color} size={30} />
                        ),
                    }}
            ></Tabs.Screen>
            
            
            <Tabs.Screen name="AccountTap" component={AccountStackScreen}
            options={({ route }) => ({
                tabBarIcon: ({focused, color, size }) => (
                    <MaterialCommunityIcons name={focused? 'account': 'account-outline'} color={color} size={30} />
                    ),
            })}
            ></Tabs.Screen>
        </Tabs.Navigator>
    )
}


const RootStack = createNativeStackNavigator();
const RootStackScreen = ({ userToken }) => {
    return (
        <RootStack.Navigator
            headerMode="none"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}
        >
            <RootStack.Screen 
                name="App" 
                children={()=><TabsScreen />}
            />
            <RootStack.Screen 
                options={{
                    animation: 'slide_from_bottom'
                }}
                name="ProductStack" 
                children={()=><ProductStackScreen />}
            />

            <RootStack.Screen 
                options={{
                    animation: 'none'
                }}
                name="SearchStack" 
                children={()=><SearchStackScreen />}
            />
            
        </RootStack.Navigator>
    )
}


export default RootStackScreen;