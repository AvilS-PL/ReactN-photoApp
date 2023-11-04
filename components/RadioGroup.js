import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import RadioButton from './RadioButton';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 10, flexDirection: this.props.direction }}>
                <Text style={{ fontSize: 15, color: this.props.color }}>{this.props.groupName}:</Text>
                {this.props.data.map((x) => {
                    return <RadioButton
                        key={x}
                        op={
                            this.props.selected == x
                                ? 1
                                : 0
                        }
                        text={x}
                        fun={this.props.fun}
                        groupName={this.props.groupName} />
                })}
            </View>
        );
    }
}
