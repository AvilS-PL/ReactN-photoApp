import './App.css';
import { useState, useEffect } from 'react'

import Element from "./Element"

function App() {
  const [photos, setPhotos] = useState([])
  const [sel, setSel] = useState([])
  const [allTab, setAllTab] = useState([])

  const refresh = async () => {
    try {
      let result = await fetch("http://localhost:3000/files", { method: "GET" })
      let tab = await result.json()
      let newTab = tab.map((x, i) => {
        return (
          <Element x={x} key={i} refresh={refresh} selected={sel.includes(x)} selectOne={selectOne} />
        )
      })
      setPhotos(newTab)
      setAllTab(tab)
    } catch (ex) {
      console.log(ex)
    }
  }

  const selectAll = async () => {
    (sel.length == allTab.length)
      ? setSel([])
      : setSel(allTab)

  }

  const selectOne = (x) => {
    let temp = [...sel]
    if (temp.includes(x)) {
      temp.splice(temp.indexOf(x), 1)
    } else {
      temp.push(x)
    }
    setSel(temp)
  }

  const del = async () => {
    console.log(sel)
    if (sel.length != 0) {
      try {
        const data = new FormData()
        data.append("tab", sel)
        await fetch("http://localhost:3000/del", { method: "PATCH", body: data })
        setSel([])
        setAllTab([])
        await refresh()
      } catch (ex) {
        console.log(ex)
      }
    } else {
      alert("Select at least one photo")
    }

  }

  useEffect(() => {
    refresh()
  }, [sel])


  return (
    <div id='main'>
      <header>
        <button onClick={refresh}>Refresh</button>
        <button onClick={selectAll}>
          {((sel.length == allTab.length) && (allTab.length != 0))
            ? "DeSelect All"
            : "Select all"
          }</button>
        <button onClick={del}>Delete Selected</button>
      </header>
      <div id="lista">
        {photos}
      </div>
    </div>
  );
}

export default App;
