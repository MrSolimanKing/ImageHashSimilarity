import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Rating, RatingProps } from 'react-native-elements';


function ProductItem(props) {
    const { item, index, navigation } = props;

    return (
        
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("ProductStack", {screen: "Product", params: { item: item }})}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </TouchableOpacity>
            <Text numberOfLines={2} style={{ color: "#fff" }}>{item.name}</Text>
                <View style={{  marginTop: 5, flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{ flexDirection: "row"}}>
                        <Rating
                                type="star"
                                fractions={1}
                                startingValue={item.rating}
                                readonly
                                ratingBackgroundColor="#000"
                                tintColor="#000"
                                imageSize={10}
                                style={{  }}
                        />
                        <Text style={{ color: "#fff", fontSize: 14, marginLeft: 4, marginTop: -5, }}>{String(item.rating).substring(0, 3)}</Text>
                    </View>
                    <Text style={{ color: "#fff", fontSize: 14, marginLeft: 4, marginTop: -5, }}>{String(item.price).substring(0, 4)}$</Text>
                </View>
        </View>
    )
}

export default ProductItem


const styles = StyleSheet.create({
   image: {
     height: 190
   }
})