import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import RadioButton from './RadioButton';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    change = (el) => {
        console.log(el)
        // this.setState({
        //     data: this.state.data.map((x) => {
        //         return {
        //             text: x.text,
        //             op: x.text == el
        //                 ? 1
        //                 : 0
        //         }
        //     })
        // })
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 10, flexDirection: this.props.direction }}>
                <Text style={{ fontSize: 15, color: this.props.color }}>{this.props.groupName}:</Text>
                {this.props.data.map((x) => {
                    return <RadioButton op={0} text={x} fun={this.change} />
                })}
            </View>
        );
    }
}
