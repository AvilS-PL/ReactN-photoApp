import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class PhotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let hei = (this.props.x / this.props.col) - 20
        if ((this.props.x / this.props.col) - 20 > 200) {
            hei = 200
        }
        return (
            <View style={{
                width: (this.props.x / this.props.col) - 20,
                height: hei,
                borderRadius: 12,

                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',

                marginHorizontal: 10,
                marginTop: 10
            }}>
                <Image
                    style={{
                        width: (this.props.x / this.props.col) - 20,
                        height: (this.props.x / this.props.col) - 20,
                    }}
                    source={{ uri: this.props.uri }}
                />
                <Text style={{ position: "absolute", right: 5, bottom: 5, color: "white" }}>12123</Text>
            </View>
        );
    }
}
