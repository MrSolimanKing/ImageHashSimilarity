import React, { PureComponent } from 'react'
import { FlatList, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import AccountUpper from './AccountUpper'
import { productData as accountData } from '../../data/productData'
import ProductItem from '../product/ProductItem'

const { width, height } = Dimensions.get("screen")

export class AccountFeed extends PureComponent {
    constructor(props) {
        super(props)
        this._HeaderComponent = this._HeaderComponent.bind(this)
        this._RenderComponent = this._RenderComponent.bind(this)
    }

    componentDidMount(){}
    
    
    _HeaderComponent(){
        return(
            <View style={{ marginBottom: 60}}>
                <AccountUpper username={this.props.username} />
            </View>
        )
    }

    _RenderComponent({ item, index }) {
       return(
           <View style={styles.item}>
               <ProductItem item={item} index={index} navigation={this.props.navigation} />
           </View>
       )
    }

    render() {
        const { username } = this.props;
        return (
            <View>
                <FlatList 
                   data={accountData}
                   ListHeaderComponent={this._HeaderComponent}
                   renderItem={this._RenderComponent}
                   numColumns={2}
                   columnWrapperStyle={styles.container}
                />
            </View>
        )
    }
}

export default AccountFeed



const styles = StyleSheet.create({
   container: {
      marginLeft: "auto", marginRight: "auto",
   },
   item: {
       height: 250, 
       width: width / 2 - 30,
       marginLeft: 10,
       marginRight: 10, 
       marginBottom: 20
    //    Dimensions
   }
})