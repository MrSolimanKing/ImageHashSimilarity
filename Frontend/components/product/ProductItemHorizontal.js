import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Rating, RatingProps } from 'react-native-elements';
import { productData } from '../../data/productData'

function ProductItemHorizontal(props) {
    const { item,  navigation } = props;

    return (
        
        <View>
            <View style={{ flexDirection: "row"}}>
                {/* <TouchableOpacity onPress={() => navigation.navigate("ProductStack", {screen: "Product", params: { item: item }})}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </TouchableOpacity> */}
                <Image style={styles.image} source={{ uri: item.image }} />
                    <Text numberOfLines={2} style={{ color: "#fff", marginLeft: 10, flex: 1, flexWrap: 'wrap' }}>{productData[Math.floor((Math.random() * 11) + 1)].name}</Text>
                    <View style={{ marginRight: "auto", marginTop: 5, top: 40, left: 135, position: "absolute"}}>
                        <View style={{  flexDirection: "row" }}>
                            <Rating
                                type="star"
                                fractions={1}
                                startingValue={item.rating}
                                readonly
                                ratingBackgroundColor="#000"
                                tintColor="#000"
                                imageSize={13}
                                style={{  }}
                            />
                            <Text style={{ color: "#fff", fontSize: 14, marginLeft: 4, marginTop: -5, }}>{String(productData[Math.floor((Math.random() * 11) + 1)].rating).substring(0, 3)}</Text>
                        </View>
                    </View>

            </View>
        </View>
    )
}

export default ProductItemHorizontal


const styles = StyleSheet.create({
   image: {
     height: 130, 
     width: 120,
     marginBottom: 20,
     marginLeft: 10
   }
})