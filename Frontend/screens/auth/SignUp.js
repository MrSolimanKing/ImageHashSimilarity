import { Button, Input } from 'native-base'
import React, { PureComponent, useState } from 'react'
import { View, Text,   } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setUserUsername, setUserEmail, setUserPassword } from '../../store/actions/AuthActions';
import { connect } from 'react-redux';

const SignUp = (props) =>  {
    const { setUserUsername, setUserEmail, setUserPassword } = props;

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    
    const [message, setMessage] = useState();
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false);
    const [isDisabled, setisDisabled] = useState(true);
    const [errorMassage, setErrorMassage] = useState("");

    React.useEffect(() => {
        if(email.length >= 1 && password.length >= 1){
            setisDisabled(false)
        }
        else if( email.length < 1 || password.length < 1){
            setisDisabled(true)
        }
    }, [email | password]);
    


    const onChnageUsername = (e) => {
        setUsername(e.toLowerCase())
      }
      const onChnageEmail = (e) => {
        setEmail(e.toLowerCase())
      }
      const onChnagePassword = (e) => {
        setPassword(e)
      }
      const onChnageRepeatPassword = (e) => {
        setRepeatPassword(e)
      }


      const saveData = async () => {
            if( email.length < 1 || password.length < 1){
                setErrorMassage("The password length should be more than 8")
            }
            else{
                setLoading(true)
                setTimeout( async ()  => {
                    setLoading(false)
                    setUserUsername(username)
                    setUserEmail(email)
                    await AsyncStorage.setItem('Email', email)
                    await AsyncStorage.setItem('Username', username)
                }, 600);
            }
      }

    return (
            <KeyboardAwareScrollView style={{ paddingTop: 100, marginHorizontal: 10 }}>
                <Input
                    style={{ color: "#fff", fontSize: 16 }}
                    placeholder="Username..."
                    onChangeText={(e) => onChnageUsername(e)}
                ></Input>

                <View style={{ marginTop: 30 }}>
                    <Input
                        style={{ color: "#fff", fontSize: 16 }}
                        placeholder="Email..."
                        onChangeText={(e) => onChnageEmail(e)}
                    ></Input>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Input
                        style={{ color: "#fff", fontSize: 16 }}
                        placeholder="Password..."
                        secureTextEntry={true}
                        onChangeText={(e) => onChnagePassword(e)}
                    ></Input>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Input
                        style={{ color: "#fff", fontSize: 16 }}
                        placeholder="Repeat password..."
                        secureTextEntry={true}
                        onChangeText={(e) => onChnageRepeatPassword(e)}
                    ></Input>
                </View>
                <Text style={{ color: "#bb2e3e", fontSize: 15, marginLeft: "auto", marginRight: "auto", marginTop: 20}}>{errorMassage}</Text>
                <Button onPress={() => saveData()}  isLoading={loading} style={{ marginTop: 50, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 50, paddingRight: 50}}>
                   {!loading && ( <Text style={{ color: "#fff", fontSize: 16 }}>Sign up</Text>)}
                </Button>
            </KeyboardAwareScrollView>
        )
    }


const mapDispatchToProps = dispatch => {
    return {
        setUserUsername: (e) => dispatch(setUserUsername(e)),
        setUserEmail: (e) => dispatch(setUserEmail(e)),
        setUserPassword: (e) => dispatch(setUserPassword(e)),
    }
};

const mapStateToProps = state => {
    // console.log(state.accountAuthReducer)
    return {
            // userToken: state.authTokenReducer.token.token,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)