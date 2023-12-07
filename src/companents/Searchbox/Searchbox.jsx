import React, { useState, useEffect } from 'react';
import './Searchbox.css';

const Search = () => {
  const [first, getFirst] = useState('');
  const [text, setText] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);  
  const [listName, setListName] = useState(''); 
  const [lists, setLists] = useState({}); 

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=marvel&apikey=aa01eba0`)
      .then((res) => res.json())
      .then((a) => {
        setText(a.Search);
      });
  }, []);

  const buttonClick = () => {
    check();
  };

  const main = (e) => {
    getFirst(e.target.value.toLowerCase());
  };

  const check = () => {
    fetch(`https://www.omdbapi.com/?s=${first}&apikey=aa01eba0`)
      .then((res) => res.json())
      .then((a) => {
        setText(a.Search);
      });
  };

  const addToSelected = (selectedMovie) => {
    setSelectedMovies([...selectedMovies, selectedMovie]); 
  };

  const removeFromSelected = (index) => {
    const updatedSelectedMovies = [...selectedMovies];
    updatedSelectedMovies.splice(index, 1);
    setSelectedMovies(updatedSelectedMovies); 
  };

  const createList = () => {
    const newList = { [listName]: selectedMovies };
    setLists({ ...lists, ...newList });
    setListName('');
    setSelectedMovies([]); 
  };

  return (
    
    <div className='searchBox'>
      <label>Film:</label> <br />
      <input onChange={main} className='main' placeholder='search film..'></input>
      <button onClick={buttonClick}>Search</button>
      <div className="container">
      {text.map((a, b) => (
        <div className='div' key={b}>
          <p>{b + 1}.{a.Title}</p>
          <img src={a.Poster} alt='img' />
          <button className='add'  onClick={() => addToSelected(a)}>Add</button> 
          <button className='details'>Details</button>
        </div>
      ))}
      </div>
      <div className='list'>
        <input
          type='text'
          placeholder='List Name'
          value={listName}
          onChange={(e) => setListName(e.target.value)} 
        />
        <button onClick={createList}>Create List</button>
        {Object.keys(lists).map((listKey, index) => (
          <div key={index}>
            <h3>{listKey}</h3>
            <ul>
              {lists[listKey].map((movie, movieIndex) => (
                <li key={movieIndex}>
                  {movie.Title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      
      </div>

    
  );
};

export default Search;
