import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.fun(this.props.text)} style={[{ flexDirection: "row", marginTop: 10, alignItems: 'center', }]}>
                <View style={[styles.center, styles.btOuter]}>
                    <View style={[styles.btInner, { opacity: this.props.op }]}></View>
                </View>
                <Text style={{ color: "white", marginLeft: 10 }}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btOuter: {
        borderWidth: 2,
        borderColor: "#2196F3",
        borderRadius: 5,
        width: 30,
        height: 30
    },
    btInner: {
        width: 8,
        height: 8,
        borderRadius: 2,
        backgroundColor: "#2196F3",
    }
});