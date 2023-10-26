import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
                borderRadius: 12,
                height: 10 * this.props.y,
                width: 10 * this.props.x,
                elevation: 3,
            }}>
                <Text style={{ fontSize: 16, color: this.props.tcolor }}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>

        );
    }
}
