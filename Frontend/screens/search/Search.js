import React, { Component } from 'react'
import { View } from 'react-native'
import SearchTap from '../../components/home/SearchTap'

export class Search extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <SearchTap navigation={navigation} />
            </View>
        )
    }
}

export default Search
