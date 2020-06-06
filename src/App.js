import React from 'react';
import './App.css';

function ListItem({ text, checked, clickHandler, id, deleteItem }) {
  return (
    <div className="list-item">
      <input
        onClick={(e) => clickHandler(e, id)}
        type="radio"
        id={id}
        checked={checked}
      />

      {checked ? (
        <label onClick={(e) => clickHandler(e, id)} className="checked" for="1">
          {text}
        </label>
      ) : (
        <label
          onClick={(e) => clickHandler(e, id)}
          className="un-checked"
          for="1"
        >
          {text}
        </label>
      )}

      <button onClick={() => deleteItem(id)}>🗑️</button>
    </div>
  );
}

function ListInput({ addItem, updateItem, justSubmitted }) {
  return (
    <div>
      <label for="list-Input">New Item: </label>
      {justSubmitted ? (
        <input
          onChange={(e) => updateItem(e)}
          onKeyDown={(e) => (e.key == 'Enter' ? addItem(e) : null)}
          type="text"
          name="list-Input"
          value=""
        ></input>
      ) : (
        <input
          onChange={(e) => updateItem(e)}
          onKeyDown={(e) => (e.key == 'Enter' ? addItem(e) : null)}
          type="text"
          name="list-Input"
        ></input>
      )}
      <button onClick={(e) => addItem(e)} type="submit">
        Add Item
      </button>
      {console.log(justSubmitted)}
    </div>
  );
}

function List(props) {
  return (
    <div className="list">
      <h1>To Do List</h1>
      {props.items.map((x) => (
        <ListItem
          text={x.text}
          checked={x.checked}
          clickHandler={props.clickHandler}
          deleteItem={props.deleteItem}
          id={x.key}
        />
      ))}
      <ListInput
        addItem={props.addItem}
        updateItem={props.updateItem}
        justSubmitted={props.justSubmitted}
      />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          text: 'get er done',
          checked: true,
          key: 'get er done',
        },
        {
          text: 'get er done 🐲 ',
          checked: false,
          key: 'get er done 🐲 ',
        },
      ],
      inputText: '',
      justSubmitted: false,
    };
  }

  clickHandler = (e, id) => {
    let foundIt = this.state.items.find((x) => x.key == id);
    let index = this.state.items.indexOf(foundIt);
    let stateArr = this.state.items;
    foundIt.checked = !foundIt.checked;

    stateArr[index] = foundIt;

    this.setState({ items: stateArr });
  };

  deleteItem = (id) => {
    let foundIt = this.state.items.find((x) => x.key == id);
    let index = this.state.items.indexOf(foundIt);
    let stateArr = this.state.items;
    stateArr.splice(index, 1);

    this.setState({ items: stateArr });
  };

  updateItem = (e) => {
    this.setState({ inputText: e.target.value, justSubmitted: false });
  };

  addItem = (e) => {
    const randKey = Math.random() * 100;
    const newText = this.state.inputText;
    const newItem = {
      text: newText,
      checked: false,
      key: randKey,
    };
    let stateArr = this.state.items;
    stateArr.push(newItem);
    this.setState({
      items: stateArr,
      inputText: '',
      justSubmitted: true,
    });
  };

  render() {
    return (
      <div className="App">
        <List
          items={this.state.items}
          clickHandler={this.clickHandler}
          deleteItem={this.deleteItem}
          addItem={this.addItem}
          updateItem={this.updateItem}
          justSubmitted={this.state.justSubmitted}
        />
      </div>
    );
  }
}

export default App;
