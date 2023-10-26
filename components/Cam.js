import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid, BackHandler } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

import CamButton from './CamButton';

export default class Cam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraPermission: null,
            type: Camera.Constants.Type.back,
        };
    }

    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({
            cameraPermission: status == 'granted'
        });
    }

    componentWillUnmount = async () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.route.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    chType = () => {
        if (this.state.type == Camera.Constants.Type.front) {
            this.setState({
                type: Camera.Constants.Type.back
            })
        } else {
            this.setState({
                type: Camera.Constants.Type.front
            })
        }

    }

    takePhoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync()
            let asset = await MediaLibrary.createAssetAsync(foto.uri)

            let exis = await MediaLibrary.getAlbumAsync("photoApp")

            if (exis !== null) {
                await MediaLibrary.addAssetsToAlbumAsync([asset], exis, false)
                ToastAndroid.showWithGravityAndOffset(
                    'photo taken',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM, 0, 400
                );

                this.props.route.params.refresh()
            } else {
                await MediaLibrary.createAlbumAsync('photoApp', asset, false);
                ToastAndroid.showWithGravityAndOffset(
                    'photo taken',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM, 0, 400
                );


                this.props.route.params.refresh()
            }

        }
    }

    render() {
        if (this.state.cameraPermission == true) {
            return (
                <View style={styles.main}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // ref na później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.inTop}>
                            </View>
                            <View style={styles.inBottom}>
                                <CamButton fun={this.chType} url={require('../rev.png')} color="#BBDEFB77" s="6" />
                                <CamButton fun={this.takePhoto} url={require('../plus.png')} color="#BBDEFB77" s="8" />
                            </View>
                        </View>
                    </Camera>
                </View>
            )
        } else if (this.state.cameraPermission == false) {
            return (
                <View style={styles.ew}>
                    <Text style={{ fontSize: 20 }}>
                        Brak uprawnień do aparatu :\
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
    center: {
        flex: 1,
        justifyContent: 'center',
    },
    ew: {
        flex: 1,
        alignItems: 'center',
    },
    main: {
        flex: 1
    },
    inTop: {
        flex: 6,
    },
    inBottom: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});