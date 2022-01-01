import React from "react";
import { View, Text, InteractionManager, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input, CloseIcon, Spinner } from "native-base";



class SearchTap extends React.PureComponent {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = {
           keyword: '',
           search_results: [],
           loading: false,
           isKeyboardOpen: true,
        }
    }



    handleSearch = async ({value}) => {
        
    }

    onChangeText({value}) {
        if(value.length > 0) {
            this.setState({keyword: value})
            this.handleSearch({value})
        }
        else {
            this.setState({keyword: ''})
            const value = ''
            this.handleSearch({value})
        }
    }
    
    setToNull(){
        this.setState({keyword: ''})
        const value = ''
        this.handleSearch({value})
    }

    componentDidMount(){
          this.props.navigation.addListener('focus', () => {
            try{
                // setTimeout(() => {}, 300)
                if(this.state.isKeyboardOpen){
                    this.inputRef.current.focus()
                }
            }
            catch{}
          })
          this.props.navigation.addListener('blur', () => {this.setState({ isKeyboardOpen: false })})
    }

    render() {
        const { navigation } = this.props
        function navigateBack(){navigation.goBack()}
        
        return (
            <View style={styles.subHeader}>
            <View style={styles.backArrow}>
            <TouchableOpacity onPress={navigateBack}>
                <Ionicons name="arrow-back-outline" color='#fff' size={30} />
            </TouchableOpacity>
            </View>
            <View style={styles.searchHeader}>
            <Input
                placeholder="Search"
                ref={this.inputRef}
                value={this.state.keyword}
                onChangeText={(value) => this.onChangeText({ value })}
                selectionColor="#fff"
                borderWidth={0}
                style={{ color: '#fff', fontSize: 15, borderWidth: 0}}
                w={{
                    base: "100%",
                    md: "100%",
                }}
                InputRightElement={
                    <>
                    {!this.state.loading ? (
                        <>
                        {this.state.keyword.length > 0 ? (
                            <TouchableOpacity style={{ marginRight: 10, borderWidth: 0 }} onPress={() => this.setToNull()}>
                                <CloseIcon
                                    onPress={() => this.setToNull()}
                                    size={3}
                                    color="muted.100"
                                /> 
                            </TouchableOpacity>
                        ): null}
                        </>
                    ):(<Spinner color="#fff" style={{marginRight: 10}}  />)}</>
                  }
                />
            </View>
        </View>
        )
    }
}

export default SearchTap


const styles = StyleSheet.create({
    subHeader: {
      width: '100%',
      paddingHorizontal: 5,
      backgroundColor: '#000000',
      flexDirection: 'row',
      width: Dimensions.get('screen').width,
      height: 54
    },
    searchHeader: {
      backgroundColor: '#272727',
      flexDirection: 'row',
      marginLeft: 14,
      width: Dimensions.get('screen').width - 60,
      height: 40,
      marginTop: 7
    },
    backArrow: {
        marginTop: 'auto', marginBottom: 'auto'
    }
  });
