import React, { PureComponent } from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'native-base'

export class UnAuthUser extends PureComponent {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 100}}>
                <MaterialCommunityIcons name={"account"} size={180} color={"#fff"} />
                <View style={{ marginTop: 120 }}>
                        <Button onPress={() => navigation.navigate("Login")}>Log In</Button>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25, marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 20}}>Or</Text>
                        <Button variant="outline" onPress={() => navigation.navigate("Signup")}>Sign Up</Button>
                </View>
            </View>
        )
    }
}

export default UnAuthUser
