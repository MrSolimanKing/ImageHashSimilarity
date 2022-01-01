import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from 'expo-image-picker';


const CameraSearch = (props) => {
    const { navigation } = props;
    const actionSheetRef = React.useRef()

    const closeActionSheet = () => {
        actionSheetRef.current?.setModalVisible();
    }
    const [image, setImage] = React.useState(null);

    React.useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);


      const ChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          type: 'image',
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
             actionSheetRef.current?.setModalVisible();
             setImage(result.uri);
             navigation.navigate("SearchResults", { image: result })
        }
      };



    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          type: 'image',
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
             actionSheetRef.current?.setModalVisible();
             setImage(result.uri);
             navigation.navigate("SearchResults", { image: result })
             onClose()
        }
      };


    return (
        <View>
            <Ionicons onPress={() => closeActionSheet()} name="camera" color='#fff' size={25} />
            <ActionSheet gestureEnabled containerStyle={{  backgroundColor: '#fff' }}  ref={actionSheetRef} >
                <View style={{ marginTop: 30, marginLeft: 10, marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => ChooseImage()} style={{flexDirection: 'row', marginBottom: 20}}>
                            <MaterialCommunityIcons style={{marginRight: 5}} name="image" color="#000000" size={30} />
                            <Text style={{color: '#000000', marginTop: 'auto', marginBottom: 'auto'}}>Gallery</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => pickImage()} style={{flexDirection: 'row', marginBottom: 20}}>
                            <MaterialCommunityIcons style={{marginRight: 5}} name="camera" color="#000000" size={30} />
                            <Text style={{color: '#000000', marginTop: 'auto', marginBottom: 'auto'}}>Camera</Text>
                        </TouchableOpacity>
                </View>
            </ActionSheet>
        </View>
    )
}


export default CameraSearch
