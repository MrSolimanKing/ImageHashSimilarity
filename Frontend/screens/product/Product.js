import React, { Component } from 'react'
import { View } from 'react-native'
import ProductFeed from '../../components/product/ProductFeed'


export class Product extends Component {

    render() {
        const{ route, navigation } = this.props;
        const item = route.params.item
        return (
            <View>
                 <ProductFeed item={item} navigation={navigation} />
            </View>
        )
    }
}

export default Product
