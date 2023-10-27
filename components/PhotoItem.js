import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

export default class PhotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            op: this.props.del
                ? 1
                : 0
        };
    }

    clicked = () => {
        this.props.goto({ id: this.props.id, uri: this.props.uri })
    }

    pressed = () => {
        this.setState({
            op: this.state.op == 0
                ? 1
                : 0
        })
        this.props.fun(this.props.id)
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
                            height: (this.props.x / this.props.col) - 20,
                        }}
                        source={{ uri: this.props.uri }}
                    />
                    <View style={{
                        opacity: this.state.op,
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
                    <Text style={{ position: "absolute", right: 5, bottom: 5, color: "white" }}>{this.props.id}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
