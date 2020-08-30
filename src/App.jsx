import React, { useState } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // React.useEffect(function effectFunction() {
  //   async function fetchItems() {
  //     const response = await fetch("http://localhost:1337/todolists");
  //     const json = await response.json();
  //     console.log(json);
  //     setItems(json);
  //     // json.forEach((cur) => {
  //     //   setItems((prevData) => {
  //     //     return [...prevData, cur.name];
  //     //   });
  //     //   setIds( prevData => [...prevData,cur.id]);
  //     // });
  //   }
  //   fetchItems();
  // }, []);

fetch("http://localhost:1337/todolists", {
  method: "GET",
  headers: {
     'Content-Type': 'application/json'
  },
}).then(response => response.json())
  .then(data => {
      setItems(data);
  })
  .catch(err => console.log(err));


  function addItem() {
    setItems((prevData) => {
      return [...prevData, {name: input}];
    });
    setInput("");

    fetch('http://localhost:1337/todolists', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input,
        })
      }).catch(err => console.log(err));
    }

  function removeItem(idUI, idCT) {
    setItems((prevData) => {
          return prevData.filter((item, index) => {
            return index !== idUI;
          });
    });

    fetch("http://localhost:1337/todolists/" + idCT, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
     },
    }).catch(err => console.log(err));

  }

  return (
    <div className="todolist">
      <div className="heading">
        <h1 className="title">To-Do List</h1>
      </div>
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button onClick={addItem}>Add</button>

      <div className="items">
        <ul>
          {items.map((item, index) => (
            <TodoItem key={index} id={index} ids={items[index].id} item={item.name} onCheck={removeItem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
