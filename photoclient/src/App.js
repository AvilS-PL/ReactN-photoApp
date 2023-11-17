import './App.css';
import { useState, useEffect } from 'react'

import Element from "./Element"

function App() {
  const [photos, setPhotos] = useState([])
  const [sel, setSel] = useState([])
  const [allTab, setAllTab] = useState([])

  const refresh = async () => {
    try {
      let result = await fetch("http://192.168.119.107:3000/files", { method: "GET" })
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
    try {
      const data = new FormData()
      data.append("tab", sel)
      await fetch("http://192.168.119.107:3000/del", { method: "PATCH", body: data })
      await refresh()
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    refresh()
  }, [sel])


  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      <button onClick={selectAll}>
        {(sel.length == allTab.length)
          ? "DeSelect All"
          : "Select all"
        }</button>
      <button onClick={del}>Delete Selected</button>
      <div id="lista">
        {photos}
      </div>
    </div>
  );
}

export default App;
