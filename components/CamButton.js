import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class Screen1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.fun()} style={{
                backgroundColor: this.props.color,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5 * this.props.s,
                height: 10 * this.props.s,
                width: 10 * this.props.s,
            }}>
                <Image
                    style={{
                        height: "60%",
                        width: "60%",
                        resizeMode: 'contain',
                    }}
                    source={this.props.url}
                />
            </TouchableOpacity>

        );
    }
}
