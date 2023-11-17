import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";
import * as SecureStore from 'expo-secure-store';

import MyButton from './MyButton';

export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vis: false,
            ip: "",
            port: "",
            opIp: "",
            opPort: "",
        };
    }

    componentDidMount = async () => {
        if (await SecureStore.getItemAsync("ip")) {
            this.setState({
                ip: await SecureStore.getItemAsync("ip"),
                opIp: await SecureStore.getItemAsync("ip")
            })
        }

        if (await SecureStore.getItemAsync("port")) {
            this.setState({
                port: await SecureStore.getItemAsync("port"),
                opPort: await SecureStore.getItemAsync("port")
            })
        }
    }

    open = () => {
        this.setState({
            vis: true
        })
    }

    cancel = () => {
        this.setState({
            vis: false
        })
    }

    save = async () => {
        if (this.state.ip.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g)) {
            if (parseInt(this.state.port) >= 1 && parseInt(this.state.port) <= 65535) {
                this.setState({
                    vis: false
                })
                await SecureStore.setItemAsync("ip", this.state.ip);
                await SecureStore.setItemAsync("port", this.state.port);

                // fetch("http://" + this.state.ip + ":" + this.state.port + "/exists", { method: 'GET' })
                //     .then(response => response.json())
                //     .then(
                //         data => console.log(data)
                //     )
                // let result = await fetch("http://" + this.state.ip + ":" + this.state.port + "/upload", { method: "GET" })
                // if (await result.json() == "yes") {
                //     console.log("yes")

                // } else {
                //     console.log("hmm")
                // }
                this.setState({
                    opIp: this.state.ip,
                    opPort: this.state.port
                })
            } else {
                alert("wrong port")
            }
        } else {
            alert("wrong IP address")
        }
    }

    updateIP = (x) => {
        let temp = x.slice(-1)
        if (temp.match(/[0-9]|\./g) || x.length == 0) {
            this.setState({
                ip: x
            })
        }
    }
    updatePORT = (x) => {
        let temp = x.slice(-1)
        if (temp.match(/[0-9]/g) || x.length == 0) {
            if (x.length == 1 && x == "0") {

            } else {
                this.setState({
                    port: x
                })
            }
        }
    }

    render() {
        return (
            <View style={[styles.center, { flex: 1 }]}>
                <Dialog.Container visible={this.state.vis}>
                    <Dialog.Title>Address IP and Port</Dialog.Title>
                    <Dialog.Description>
                        Do you want to change address and port to server?
                    </Dialog.Description>
                    <Dialog.Input label="Address IP:" value={this.state.ip} onChangeText={(event) => this.updateIP(event)} />
                    <Dialog.Input label="Port:" value={this.state.port} onChangeText={(event) => this.updatePORT(event)} />
                    <Dialog.Button label="Cancel" onPress={this.cancel} />
                    <Dialog.Button label="Save" onPress={this.save} />
                </Dialog.Container>
                <Text style={{ fontSize: 20 }}>Current IP:</Text>
                <Text style={{ fontSize: 15, borderBottomColor: "#2196F3", borderBottomWidth: 1, marginBottom: 10, }}>{this.state.opIp}</Text>
                <Text style={{ fontSize: 20 }}>Current Port:</Text>
                <Text style={{ fontSize: 15, marginBottom: 30, borderBottomColor: "#2196F3", borderBottomWidth: 1, }}>{this.state.opPort}</Text>
                <MyButton fun={this.open} text="Edit" color="#2196F3" tcolor="white" x="10" y="4" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
