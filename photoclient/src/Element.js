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

            await fetch("http://localhost:3000/rename", { method: "PATCH", body: data })
            await props.refresh()
        } catch (ex) {
            console.log(ex)
        }
    }

    const del = async () => {
        try {
            const data = new FormData()
            data.append("tab", props.x)
            await fetch("http://localhost:3000/del", { method: "PATCH", body: data })
            await props.refresh()
        } catch (ex) {
            console.log(ex)
        }


    }

    return (
        <div className="element">
            <div className='text'>{props.x}</div>
            <img src={"http://localhost:3000/photos/" + props.x} />
            <button onClick={() => openRename(props.x)}>Rename</button>
            <button onClick={() => del()}>Delete</button>
            <input type="checkbox" value={props.x} checked={props.selected} onChange={() => props.selectOne(props.x)} />
        </div>
    );
}

export default App;
