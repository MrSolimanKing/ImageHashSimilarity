import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text } from 'react-native'
import { View, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import CameraSearch from './CameraSearch'

const { width, height } = Dimensions.get("window")

const HomeTap = (props) =>{
    const { navigation } = props;
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      
      if (!result.cancelled) {
        
        setImage(result.uri);
      }
    }


    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchStack", { screen: "Search" })} style={styles.search}>
                <View style={styles.searchHeader}>
                  <Ionicons style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 10}} name="search-outline" color='#fff' size={19} />
                  <Text style={{ marginTop: 'auto', marginBottom: 8, marginLeft: 7, color: '#e2e2e2', fontSize: 16 }}>Search</Text>
                   
                   <View style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: "auto", marginRight: 10}}>
                      <CameraSearch navigation={navigation} />
                   </View>
                  
                </View>
                  
        </TouchableWithoutFeedback>
    )
}

export default HomeTap

const styles = StyleSheet.create({
    search: {
        width: width,
        height: 50,
        backgroundColor: '#272727'
    },
    subHeader: {
        width: '100%',
        paddingHorizontal: 5,
        backgroundColor: '#000000',
        flexDirection: 'row',
        width: width,
        height: 50
      },
      searchHeader: {
        backgroundColor: '#272727',
        flexDirection: 'row',
        marginLeft: 14,
        width: Dimensions.get('screen').width - 35,
        height: 36,
        marginTop: 7
      }
})