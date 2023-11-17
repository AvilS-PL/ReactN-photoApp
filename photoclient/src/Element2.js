

import React, { Component } from 'react'

export default class Element2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    openRename = async (x) => {
        let p = prompt("What name do you want?", x.split(".")[0])
        if (p == null || p == "") {
            window.alert("changes weren't saved")
        } else {
            await this.rename(x, p)
        }
    }

    rename = async (x, p) => {
        try {
            const data = new FormData()
            data.append("name", x)
            data.append("newName", p)

            await fetch("http://localhost:3000/rename", { method: "PATCH", body: data })
            await this.props.refresh()
        } catch (ex) {
            console.log(ex)
        }
    }

    selectOne = (x) => {
        let temp = [...this.state.selected]
        console.log(x)
        temp.push(x)
        this.setState(temp)
    }

    render() {
        return (
            <div className="element">
                <p>{this.props.x}</p>
                <img src={"http://192.168.119.107:3000/photos/" + this.props.x} />
                <button onClick={() => this.openRename(this.props.x)}>Rename</button>
                <input type="checkbox" value={this.props.x} onClick={() => this.selectOne(this.props.x)} />
            </div>
        );
    }
}
