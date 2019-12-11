import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import "./App.css";



const App = () => {
  const APP_ID = 'e75a0d1d';
  const APP_KEY = "effde5a2d18b68c017b9a558c8a579cb";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')
  //renders when you first open the page 
  //re-renders each time you change the state -> on button click 
  //a combination between componentDidMount si componentDidUpdate
  useEffect( () =>{
    getRecipes();
    //if you add an empty array as a second argument, the useEffect only runs once 
    //if you leave [] empty, the useEffect only runs once
    //if you add counter like so [counter], useEffect will run when the counter changes
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <h1>Hello React</h1>
      <form 
        className="search-form"
        onSubmit={getSearch}
      >
        <input 
          className="search-bar" 
          type="text"
          value={search}
          onChange={updateSearch}
        />
        
        <button className="search-button" type="submit">Submit</button>
      </form>
      <div className="recipes">
        {recipes.map((recipe, index) =>(
          <Recipe 
            key={index}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

    </div>
  )
}

export default App;