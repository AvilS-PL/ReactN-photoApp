import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import MyButton from './MyButton';
import List from './List';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryPermission: null,
            data: [],
            col: 4,
            del: []
        };
    }

    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        this.setState({
            galleryPermission: status == "granted"
        })
        if (status == "granted") {
            this.refr()
        }
    }

    refr = async () => {
        let exis = await MediaLibrary.getAlbumAsync("photoApp")
        if (exis !== null) {
            let obj = await MediaLibrary.getAssetsAsync({
                mediaType: 'photo',
                album: exis,
                sortBy: ['creationTime'],
                first: 100
            })
            this.setState({
                data: obj.assets
            })
        } else {
            this.setState({
                data: []
            })
        }
    }

    goToCamera = () => {
        this.props.navigation.navigate("camera", { refresh: this.refr })
    }

    chLayout = () => {
        let i = this.state.col
        if (i < 4) {
            i++
        } else {
            i = 1
        }
        this.setState({
            col: i
        });
    }

    delPhoto = async () => {
        if (this.state.del.length == 0) {
            alert("select at least one photo")

        } else {
            await MediaLibrary.deleteAssetsAsync(this.state.del);
            this.setState({
                del: []
            })
            this.refr()
            ToastAndroid.showWithGravityAndOffset(
                'selected photos deleted',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM, 0, 50
            );
        }
    }

    addPhotoToDel = async (x) => {
        let temp = [...this.state.del]
        if (temp.includes(x)) {
            temp.splice(temp.indexOf(x), 1)
        } else {
            temp.push(x)
        }
        this.setState({
            del: temp
        })
    }

    goToPhoto = (x) => {
        console.log(x.data.uri)
        this.props.navigation.navigate("photo", { data: x.data, refresh: this.refr })
    }

    render() {
        if (this.state.galleryPermission == true) {

            return (
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <View style={styles.top}>
                        <MyButton fun={this.chLayout} text="Layout" color="#2196F3" tcolor="white" x="10" y="4" />
                        <MyButton fun={this.goToCamera} text="Camera" color="#2196F3" tcolor="white" x="10" y="4" />
                        <MyButton fun={this.delPhoto} text="Delete" color="#2196F3" tcolor="white" x="10" y="4" />
                    </View>
                    <View style={styles.bot}>
                        <List data={this.state.data} col={this.state.col} fun={this.addPhotoToDel} del={this.state.del} goto={this.goToPhoto} />
                    </View>
                </View>
            )
        } else if (this.state.galleryPermission == false) {
            return (
                <View style={styles.ew}>
                    <Text style={{ fontSize: 20 }}>
                        Brak uprawnień do galerii :\
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="100%" color="#2196F3" />
                </View>
            )
        }

    }
}
const styles = StyleSheet.create({
    top: {
        flex: 1,
        backgroundColor: "#BBDEFB",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bot: {
        flex: 10,
        backgroundColor: "white",
    },
    ew: {
        flex: 1,
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
    }
});