import { useState, useEffect } from 'react'

function App(props) {

    const openRename = async (x) => {
        let p = prompt("What name do you want?", x.split(".")[0])
        if (p == null || p == "") {
            window.alert("changes weren't saved")
        } else {
            await rename(x, p)
        }
    }

    const rename = async (x, p) => {
        try {
            const data = new FormData()
            data.append("name", x)
            data.append("newName", p)

            await fetch("http://192.168.119.107:3000/rename", { method: "PATCH", body: data })
            await props.refresh()
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div className="element">
            <p>{props.x}</p>
            <img src={"http://192.168.119.107:3000/photos/" + props.x} />
            <button onClick={() => openRename(props.x)}>Rename</button>
            <button onClick={() => test()}>test</button>
            <input type="checkbox" value={props.x} checked={props.selected} onChange={() => props.selectOne(props.x)} />
        </div>
    );
}

export default App;
