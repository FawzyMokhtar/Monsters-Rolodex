import { Component } from 'react';

import { SearchBox } from './components/search-box/search-box.component';
import { CardList } from './components/card-list/card-list.component';
import './App.css';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  render() {
    const { monsters, searchField } = this.state;

    const filteredMonsters =
      monsters?.filter(
        (monster) =>
          searchField === '' ||
          monster.name.toLowerCase().includes(searchField.toLowerCase())
      ) ?? [];

    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='Search monsters...'
          handleChange={this.search}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  search = (searchTerm) => {
    this.setState({ searchField: searchTerm });
  };
}
