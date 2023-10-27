import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';

import MyButton from './MyButton';

export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    del = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.route.params.id])
        this.props.route.params.refresh()
        this.props.navigation.goBack()
    }

    share = async () => {
        if (Sharing.isAvailableAsync()) {
            Sharing.shareAsync(this.props.route.params.uri)
        } else {
            alert("it is imposible to share right now")
        }
    }

    render() {
        return (
            <View style={{ flex: 1, margin: 20 }}>
                <View style={{ flex: 2 }}>
                    <Image
                        style={{
                            borderRadius: 12,
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain"
                        }}
                        source={{ uri: this.props.route.params.uri }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly', }}>
                    <MyButton fun={this.del} text="Delete" color="#2196F3" tcolor="white" x="10" y="4" />
                    <MyButton fun={this.share} text="Share" color="#2196F3" tcolor="white" x="10" y="4" />
                </View>

            </View>
        );
    }
}
