import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ToastAndroid } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';

import MyButton from './MyButton';

export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    del = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.route.params.data.id])
        this.props.route.params.refresh()
        this.props.navigation.goBack()
    }

    share = async () => {
        if (Sharing.isAvailableAsync()) {
            Sharing.shareAsync(this.props.route.params.data.uri)
        } else {
            alert("it is imposible to share right now")
        }
    }

    upload = async () => {
        const data = new FormData()
        data.append('photo', {
            uri: this.props.route.params.data.uri,
            type: 'image/jpeg',
            name: this.props.route.params.data.filename
        });
        let ip = await SecureStore.getItemAsync("ip")
        let port = await SecureStore.getItemAsync("port")
        let result = await fetch("http://" + ip + ":" + port + "/upload", { method: "POST", body: data })
        alert(await result.json())

    }

    render() {
        return (
            <View style={{ flex: 1, margin: 20 }}>
                <View style={{ flex: 6 }}>
                    <Image
                        style={{
                            height: "100%",
                            // width: "100%",
                            resizeMode: "contain",
                        }}
                        source={{ uri: this.props.route.params.data.uri }}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 20 }}>{this.props.route.params.data.height} x {this.props.route.params.data.width}</Text>
                </View>
                <View style={{ flex: 3, flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly', }}>
                    <MyButton fun={this.del} text="Delete" color="#2196F3" tcolor="white" x="10" y="4" />
                    <MyButton fun={this.share} text="Share" color="#2196F3" tcolor="white" x="10" y="4" />
                    <MyButton fun={this.upload} text="Upload" color="#2196F3" tcolor="white" x="10" y="4" />
                </View>

            </View>
        );
    }
}
