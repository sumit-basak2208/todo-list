import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //for routes
import { useState, createContext, useRef, useEffect } from "react";
import axios from "axios";


function App() {

    const [itemText, setItemText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState("");
    const [updateItemText, setupdateItemText] = useState("");

    const addItem = async (event) => {
      event.preventDefault();
      try{
        const res = await axios.post("http://localhost:5500/api/item", {item: itemText});
        console.log(res);
        setListItems(prev => [...prev, res.data]); 
        document.getElementById("todo").value = "";
        setItemText("");
      } catch(err) {
        console.log(err);
      }
    }

    const getItemList = async() => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
      } catch(err) {
        console.log(err);
      }
    }

    const deleteItem = async(id) => {
      try {
        const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
        console.log("item Deleted Successfully");
        const newListItems = listItems.filter(el => el._id !== id);
        setListItems(newListItems);
      } catch(err) {
        console.log(err);
      }
    }

    const updateItem = async(event) => {
      event.preventDefault();
      try {
        const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText});
        const updatedItemIndex = listItems.findIndex(el => el._id === isUpdating);
        const updatedItem = listItems[updatedItemIndex].item = updateItemText;
        setupdateItemText("");
        setIsUpdating("");
        console.log("Item Updated Successfully");
      } catch(err) {
        console.log(err);
      }
    }

    const renderUpdateForm = (itemText) => (
      <form className="update-form" onSubmit={event => {updateItem(event)}}>
        <input type="text" placeholder="Enter new Item" onChange={event => setupdateItemText(event.target.value)} required/>
        <button className="update-new-btn" type="submit">Update</button>
      </form>
    )

    useEffect(() => {
      getItemList();
    },[]);

  return (
    <div className="App">
      <h1>TO-DO List</h1>
      <form className="form" onSubmit={event => addItem(event)}>
        <input type="text" placeholder="Add TO-DO Item" id="todo" onChange={event => {setItemText(event.target.value)}} required/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map((el) => (
            <div className="todo-listitem">
              {
                isUpdating === el._id ?
                renderUpdateForm(el.item) 
                : 
                <>
                  <p className="item-content">{el.item}</p>
                  <button className="update-item" onClick={() => setIsUpdating(el._id)}>Update</button>
                  <button className="delete-item" onClick={() => {deleteItem(el._id)}}>Delete</button>
                </>
              }
          </div>
        ))
        }
        {/* <div className="todo-listitem">
          <p className="item-content">This is item 1</p>
          <button className="update-item">Update</button>
          <button className="delete-item">Delete</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
