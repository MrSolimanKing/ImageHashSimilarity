import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import axios from 'axios'
import { FlatList } from 'react-native'
import ProductItemHorizontal from '../../components/product/ProductItemHorizontal'
import { Button } from 'native-base'


const { height, width } = Dimensions.get("window") 

function _renderItem({ item , index }){
    return(
        <ProductItemHorizontal item={item} index={index} />
    )
}




const SearchResults = (props) => {
    const [ data, setData ] = React.useState([])
    const [ imageKind, setImageKind ] = React.useState('')
    const getResults = () => {
        const ProImage = props.route.params.image
        const formData = new FormData()
        const File = {
            name: "image.png",
            uri: ProImage.uri,
            type: 'multipart/form-data'
        }
        formData.append('image', File);
        axios.post(`/product/api/GetProductPyCamera/`, formData)
        .then((response) => {
           setData(response.data.results)
           setImageKind(response.data.kind)
        })
        .catch((error) => {
            // console.log(error)
            for (const property in error.response.data) {
                console.log(`${property}: ${error.response.data[property]}`);
            }
        })
    }

    React.useEffect(() => {
        getResults()
    }, [])

    
    const ProImage = props.route.params.image.uri
    function _HeaderComponent(){
        return(
            <View style={{ width: width, height: 170, backgroundColor: "#3a3b3c", marginBottom: 50, }}>
               <View style={{  }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>The Image: </Text>
                    <Text style={{ color: "#fff", fontSize: 20, marginRight: 20 }}>Image Type: 
                    <Text style={{ color: "#bb2e3e" }}>  {imageKind}</Text>
                    </Text>
                    </View>
                    <Image style={{ height: 100, width: 100, marginTop: 20, marginLeft: 20 }} source={{ uri: ProImage }} />
               </View>
        </View>
        )
    }

    return (
        <View>
            <FlatList 
              data={data}
              renderItem={_renderItem}
              keyExtractor={(item, index) => String(index)}
            //   ListHeaderComponent={() => _headerComponent()}
                ListHeaderComponent={_HeaderComponent}
            /> 
        </View>
    )
}

export default SearchResults
