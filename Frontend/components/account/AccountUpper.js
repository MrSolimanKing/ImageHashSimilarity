import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import React from 'react'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionSheet from "react-native-actions-sheet";


const actionSheetData = [
    {
        icon: "whatsapp",
        name: "Whatsapp",
    },
    {
        icon: "email",
        name: "Email"
    }
]
const AccountUpper = (props) =>{
    const { username } = props;
    const actionSheetRef = React.useRef()


    const closeActionSheet = () => {
        actionSheetRef.current?.setModalVisible();
    }

    return (
        <View style={styles.upper}>
            <View style={{ flexDirection: "row" }}>
                <Image style={styles.image}  source={{ uri: "http://placeimg.com/640/480/abstract" }} />
                <View>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: "bold", marginTop: 20, marginLeft: 10}}>{username}</Text>
                    <Text style={{ color: '#939393', fontSize: 16, marginLeft: 11 }}>seller</Text>
                </View>
            </View>
            <Button onPress={() => closeActionSheet()} style={{ height: 40, marginTop: 'auto', marginBottom: 'auto', marginRight: 10 }}>Contact</Button>

            <ActionSheet gestureEnabled containerStyle={{  backgroundColor: '#3a3b3c' }}  ref={actionSheetRef} >
                <View style={{ marginTop: 30, marginLeft: 10, marginBottom: 20 }}>
                    {
                        actionSheetData.map((item, index) => {
                            return(
                                <TouchableOpacity key={index} style={{ marginLeft: 10, marginTop: 10, marginBottom: 20, flexDirection: "row"}}>
                                    <MaterialCommunityIcons name={item.icon} color={"#fff"} size={30} />
                                    <Text style={{ color: '#fff', fontSize: 20, marginLeft: 5}}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ActionSheet>
 
            
        </View>
    )
}

export default AccountUpper


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

// onPress={() => Linking.openURL()}