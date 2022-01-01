import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import { TopProducts } from '../../data/TopProducts';

const SwiperComponent = (props) => {
    const { navigation } = props;

    function navigate(item){
        navigation.navigate("ProductStack", {screen: "Product", params: { item: item }})
    }

    return (
        <View>
          {TopProducts.length > 1 ? (
              <Swiper style={styles.wrapper} dotStyle={{ top: 20 }} pointerEvents={'auto'} activeDotColor="#fff" activeDotStyle={{ top: 20 }}>
              {TopProducts.map((item, index) => (
                  <TouchableOpacity onPress={() => navigate(item)} activeOpacity={.6} key={item.id} style={styles.slide1}>
                  <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%'}} />
                  <Text style={{ position: 'absolute', fontSize: 30, fontWeight: 'bold', bottom: 10, right: 10}}>{String(item.price).substring(0, 4)}$</Text>
                </TouchableOpacity>
              ))}
          </Swiper>
            ): null}
        </View>
    )
}

export default SwiperComponent


const styles = StyleSheet.create({
    wrapper: {height: 200,},
    slide1: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1c1c1c'
    },
    titleArt: {
       
    },
    text: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      bottom: 0,
      zIndex: 10
    }
})