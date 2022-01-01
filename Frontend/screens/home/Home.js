import React, { Component } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import HomeTap from '../../components/home/HomeTap'
import { productData } from '../../data/productData'
import ProductItem from '../../components/product/ProductItem'
import SwiperComponent from '../../components/home/Swiper'

const { height, width } = Dimensions.get("window")

export class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        this._HeaderComponent = this._HeaderComponent.bind(this)
        this._RenderComponent = this._RenderComponent.bind(this)
    }
    
    _HeaderComponent(){
       const { navigation } = this.props
       return(
           <View style={{ marginBottom: 30 }}>
               <SwiperComponent navigation={navigation} />
           </View>
       )
    }

    _RenderComponent({ item, index }){
        const { navigation } = this.props
        return (
            <View style={styles.item}>
                <ProductItem navigation={navigation} item={item} index={index}/>
            </View>
        )
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ marginBottom: 50 }}>
                <View style={{ marginBottom: 10 }}>
                    <HomeTap navigation={navigation} />
                </View>
                <FlatList 
                   data={productData}
                   renderItem={this._RenderComponent}
                   ListHeaderComponent={this._HeaderComponent}
                   numColumns={2}
                   columnWrapperStyle={styles.container}
                />
            </View>
        )
    }
}

export default Home


const styles = StyleSheet.create({
    container: {
       marginLeft: "auto", marginRight: "auto",
    },
    item: {
        height: 250, 
        width: width / 2 - 30,
        marginLeft: 10,
        marginRight: 10, 
        marginBottom: 25
     //    Dimensions
    }
 })
