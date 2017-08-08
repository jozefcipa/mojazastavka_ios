import React from "react";
import {Dimensions, Image, StatusBar, Text, View} from "react-native";
import Constants from "../Constants";
import loadingGif from "../assets/loader.gif";

export default (props) => {

    if (!props.show) {
        return <View/>; // return empty view
    }

    if (props.type === Constants.LOADING_INDICATOR) {
        return (
            <View>
                <StatusBar networkActivityIndicatorVisible={true}/>
            </View>
        );
    } else {
        return (
            <View style={
                {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                <StatusBar networkActivityIndicatorVisible={props.type == Constants.LOADING_FULL}/>
                <View style={
                    {
                        backgroundColor: 'white',
                        borderRadius: 5,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 30,
                        paddingRight: 30,
                        alignItems: 'center',
                        width: Dimensions.get('window').width - 40,
                    }
                }>
                    <Image source={loadingGif} style={{marginBottom: 10}}/>
                    <Text>{props.text || 'Načítava sa...' }</Text>
                </View>
            </View>
        );
    }
}