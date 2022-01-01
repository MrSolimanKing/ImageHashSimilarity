import { Button, Input } from 'native-base'
import React, { PureComponent, useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import { setUserUsername, setUserEmail, setUserPassword } from '../../store/actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) =>  {
    const { setUserEmail, setUserPassword } = props;
    
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [message, setMessage] = useState();
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false);
    const [isDisabled, setisDisabled] = useState(true);
    const [token, setToken] = useState();
    

    const login = async () => {

        setUserEmail(email)
        setUserPassword(password)
        await AsyncStorage.setItem('Email', email)
        await AsyncStorage.setItem('Password', password)
    }

    const onChangeEmail = (e) => {
        setEmail(e.toLowerCase())
    }
    const onChangePassword = (e) => {
        setPassword(e)
    }

    return (
            <View style={{ marginTop: 100, marginHorizontal: 10 }}>
                <Input
                    style={{ color: "#fff", fontSize: 16 }}
                    placeholder="Email..."
                    onChangeText={(e) => onChangeEmail(e)}
                ></Input>

                <View style={{ marginTop: 50 }}>
                    <Input
                        style={{ color: "#fff", fontSize: 16 }}
                        placeholder="Password..."
                        secureTextEntry={true}
                        onChangeText={(e) => onChangePassword(e)}
                    ></Input>
                </View>
                <Button onPress={() => login()} style={{ marginTop: 90, maxWidth: 150, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 50, paddingRight: 50}}>Log In</Button>
            </View>
        )
    }


const mapDispatchToProps = dispatch => {
    return {
        setUserEmail: (e) => dispatch(setUserEmail(e)),
        setUserPassword: (e) => dispatch(setUserPassword(e)),
    }
};

const mapStateToProps = state => {
    return {
            // userToken: state.authTokenReducer.token.token,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)