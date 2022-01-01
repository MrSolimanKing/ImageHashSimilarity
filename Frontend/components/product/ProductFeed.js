import React, { PureComponent } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { FlatList, View, Dimensions } from 'react-native'
import { Rating } from 'react-native-elements'
import ProductItemHorizontal from './ProductItemHorizontal'
import { productData } from '../../data/productData'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const { height, width } = Dimensions.get("screen")

class ProductFeed extends PureComponent {
     
    constructor(props) {
        super(props)
        this.state = {
            inCart: false,
        }
        this._HeaderComponent = this._HeaderComponent.bind(this)
        this._RenderComponent = this._RenderComponent.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    addItem(){
        this.setState({ inCart: !this.state.inCart })
    }

    _HeaderComponent () {
        const { item } = this.props;
        console.log(this.state.inCart)
        return(
            <View style={{ marginBottom: 70 }}>
                <Image style={{ height: 250, width: width }} source={{ uri: item.image }} />
                <View style={{ marginLeft: 7, marginTop: 7 }}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>{item.name}</Text>
                    <Text style={{ color: "#d8d8d8", fontSize: 14, marginTop: 18 }}>{item.description}</Text>
                    
                    <View style={{  marginTop: 15, marginRight: 19, flexDirection: "row", justifyContent: "space-between"}}>
                         
                            <View style={{ flexDirection: "row" }}>
                                <Rating
                                    type="star"
                                    fractions={1}
                                    startingValue={item.rating}
                                    ratingBackgroundColor="#000"
                                    tintColor="#000"
                                    imageSize={20}
                                    style={{  }}
                                />
                                <Text style={{ color: "#fff", fontSize: 16, marginLeft: 10 }}>{String(item.rating).substring(0, 3)}</Text>
                            </View>
                        
                         
                         <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "#fff", fontSize: 16, marginLeft: 10 }}>{String(item.price).substring(0, 4)}$</Text>
                            <TouchableOpacity onPress={this.addItem}>
                                <MaterialCommunityIcons  style={{ marginLeft: 20, bottom: 5 }} name={this.state.inCart ? "cart" : "cart-plus"} color="#fff" size={26} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
        )
    }

    _RenderComponent({ item, index }) {
        const { navigation } = this.props;
        return(
            <TouchableOpacity onPress={() => navigation.push("ProductStack", {screen: "Product", params: { item: item }})}>
                <ProductItemHorizontal item={item} navigation={navigation} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                <FlatList 
                    data={productData}
                    renderItem={this._RenderComponent}
                    ListHeaderComponent={this._HeaderComponent}
                />
            </View>
        )
    }
}

export default ProductFeed
