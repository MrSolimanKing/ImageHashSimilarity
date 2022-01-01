import React, { PureComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { setUserEmail, setUserUsername } from '../../store/actions/AuthActions';

import AccountUpper from '../../components/account/AccountUpper';
import AccountFeed from '../../components/account/AccountFeed';

const actionSheetRef = React.createRef()

export class Account extends PureComponent {
    
    state = {
        username: ""
    }

    getUserName = async () => {
        const user = await AsyncStorage.getItem('Username');
        console.log(user)
        this.setState({ username: user  })
    } 

    componentDidMount(){
        const { usernameRedux, navigation } = this.props;

        if(String(usernameRedux).length === 0){
            this.getUserName()
        }
        else{
            this.setState({ username: usernameRedux  })
        }

        
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.username.length > 0 && (
                    <AccountFeed username={this.state.username} navigation={this.props.navigation} />
                )}
            </View>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setUserEmail: (e) => dispatch(setUserEmail(e)),
        setUserUsername: (e) => dispatch(setUserUsername(e)),
    }
};

const mapStateToProps = state => {
    return {
            usernameRedux: state.accountAuthReducer.userUsername,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)



const styles = StyleSheet.create({
    image: {
        height: 100, width: 100, borderRadius: 100
    },
    container: {
        flex: 1,
    },
    upper: {
        marginTop: 30,
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})



const handleLogOut = async () => {
    await AsyncStorage.removeItem('Email');
    this.props.setUserEmail("")
}
{/* <Button onPress={() => handleLogOut()}>Log out</Button> */}
