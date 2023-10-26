import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from "expo-font";

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            color: "white"
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('./sup.ttf'),
        });
        this.setState({ loaded: true, color: "white" })
    }

    test = () => {
        this.props.navigation.navigate("gallery")
    }

    render() {
        return (
            <View style={styles.center}>
                {this.state.loaded
                    ?
                    <TouchableOpacity onPress={() => this.test()} style={[styles.center]}>
                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 60,
                            color: "white",
                        }}>Camera</Text>

                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 20,
                            color: "white"
                        }}>Do photos like any</Text>

                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 20,
                            color: "white"
                        }}>other person</Text>
                    </TouchableOpacity>
                    :
                    <ActivityIndicator size="large" color="#2196F3" />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2196F3",
    }
});