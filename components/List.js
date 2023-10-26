import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Dimensions } from "react-native";

import PhotoItem from './PhotoItem';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    numColumns={this.props.col}
                    key={this.props.col}
                    data={this.props.data}
                    renderItem={({ item }) => <PhotoItem id={item.id} uri={item.uri} x={Dimensions.get("window").width} col={this.props.col} fun={this.props.fun} del={
                        this.props.del.includes(item.id)
                            ? true
                            : false
                    } />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }

});