import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

export default class PhotoItem extends Component {
    constructor(props) {
        super(props);
    }

    clicked = () => {
        this.props.goto({ data: this.props.data })
    }

    pressed = () => {
        this.props.fun(this.props.data.id)
    }

    render() {
        let hei = (this.props.x / this.props.col) - 20
        if ((this.props.x / this.props.col) - 20 > 200) {
            hei = 200
        }
        return (
            <TouchableOpacity onPress={() => this.clicked()} onLongPress={() => this.pressed()} style={{
                width: (this.props.x / this.props.col) - 20,
                height: hei,
                borderRadius: 12,

                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',

                marginHorizontal: 10,
                marginTop: 10

            }}>
                <View>
                    <Image
                        style={{
                            width: (this.props.x / this.props.col) - 20,
                            height: ((this.props.x / this.props.col) - 20) > 200 ? 200 : (this.props.x / this.props.col) - 20,
                        }}
                        source={{ uri: this.props.data.uri }}
                    />
                    <View style={{
                        opacity: this.props.del,
                        position: "absolute",
                        backgroundColor: "#00000077",
                        width: "100%",
                        height: "100%",

                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                width: 100 - (this.props.col * 15),
                                height: 100 - (this.props.col * 15),
                            }}
                            source={require("../plus.png")}
                        />
                    </View>
                    <Text style={{ position: "absolute", right: 5, bottom: 5, color: "white" }}>{this.props.data.id}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
