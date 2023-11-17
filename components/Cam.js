import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid, BackHandler, Animated, Dimensions, ScrollView } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

import CamButton from './CamButton';
import RadioGroup from './RadioGroup';

export default class Cam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraPermission: null,
            type: Camera.Constants.Type.back,
            pos: new Animated.Value(-Dimensions.get("window").width / 2),
            ratios: ["4:3", "16:9"],
            whiteBalance: [],
            flashMode: [],
            pictureSizes: [],
            selected: { ratio: "4:3" }
        };
        this.isHidden = true
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
                    ToastAndroid.BOTTOM, 0, 300
                );

                this.props.route.params.refresh()
            } else {
                await MediaLibrary.createAlbumAsync('photoApp', asset, false);
                ToastAndroid.showWithGravityAndOffset(
                    'photo taken',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM, 0, 300
                );


                this.props.route.params.refresh()
            }

        }
    }

    openSettings = () => {
        if (this.isHidden) toPos = 0; else toPos = -Dimensions.get("window").width / 2
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    setCameraSettings = async () => {
        // let test = Object.getOwnPropertyNames(Camera.Constants.WhiteBalance).map((x, i) => {
        //     return {text: x, number: g}
        // })
        // console.log(test)
        let wb = Object.getOwnPropertyNames(Camera.Constants.WhiteBalance)
        let fm = Object.getOwnPropertyNames(Camera.Constants.FlashMode)
        let ps = await this.getSizes()
        let tempPS = [...ps]
        this.setState({
            whiteBalance: wb,
            flashMode: fm,
            pictureSizes: ps,
            selected: {
                ratio: "4:3",
                wb: wb[0],
                fm: fm[0],
                ps: tempPS.pop()
            }
        })
    }

    getSizes = async () => {
        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.selected.ratio)
            return (sizes)
        }
    };

    change = ({ what, text }) => {
        let temp = this.state.selected
        switch (what) {
            case "White Balance":
                temp.wb = text
                this.setState({
                    selected: temp
                })
                break;
            case "Flash Mode":
                temp.fm = text
                this.setState({
                    selected: temp
                })
                break;
            case "Camera Ratio":
                temp.ratio = text
                this.setState({
                    selected: temp
                })
                break;
            case "Picture Sizes":
                temp.ps = text
                this.setState({
                    selected: temp
                })
                break;
            default:
                break;
        }
    }

    openPicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            const data = new FormData()
            data.append('photo', {
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: result.assets[0].uri.split("/").pop()
            });
            let ip = await SecureStore.getItemAsync("ip")
            let port = await SecureStore.getItemAsync("port")
            let odp = await fetch("http://" + ip + ":" + port + "/upload", { method: "POST", body: data })
            alert(await odp.json())
        }
    }

    render() {
        if (this.state.cameraPermission == true) {
            return (
                <View style={styles.main}>
                    <Camera
                        onCameraReady={() => this.setCameraSettings()}
                        ref={ref => {
                            this.camera = ref
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}
                        ratio={this.state.selected.ratio}
                        whiteBalance={this.state.selected.wb}
                        pictureSize={this.state.selected.ps}
                        flashMode={this.state.selected.fm}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.inTop}>
                            </View>
                            <View style={styles.inBottom}>
                                <CamButton fun={this.chType} url={require('../rev.png')} color="#BBDEFB77" s="6" />
                                <CamButton fun={this.takePhoto} url={require('../plus.png')} color="#BBDEFB77" s="8" />
                                <CamButton fun={this.openSettings} url={require('../settings.png')} color="#BBDEFB77" s="6" />
                                <CamButton fun={this.openPicker} url={require('../gallery.png')} color="#BBDEFB77" s="6" />
                            </View>
                        </View>
                    </Camera>

                    <Animated.View
                        style={[
                            styles.animatedView,
                            {
                                transform: [
                                    { translateX: this.state.pos }
                                ]
                            }]} >
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>SETTINGS</Text>
                        <ScrollView style={{ width: "80%" }}>
                            <RadioGroup
                                color="yellow"
                                fun={this.change}
                                direction="column"
                                data={this.state.whiteBalance}
                                selected={this.state.selected.wb}
                                groupName="White Balance" />
                            <RadioGroup
                                color="yellow"
                                fun={this.change}
                                direction="column"
                                data={this.state.flashMode}
                                selected={this.state.selected.fm}
                                groupName="Flash Mode" />
                            <RadioGroup
                                color="yellow"
                                fun={this.change}
                                direction="column"
                                data={this.state.ratios}
                                selected={this.state.selected.ratio}
                                groupName="Camera Ratio" />
                            <RadioGroup
                                color="yellow"
                                fun={this.change}
                                direction="column"
                                data={this.state.pictureSizes}
                                selected={this.state.selected.ps}
                                groupName="Picture Sizes" />
                        </ScrollView>

                    </Animated.View>
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
    animatedView: {
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        backgroundColor: "#00000055",
        width: Dimensions.get("window").width / 2,

        alignItems: 'center',
    },
});