import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Search from "./components/Search";
import Yearsearch from "./components/Year";
import Movie from "./components/Movie";
import NavLinks from "./components/navLink";
import FavoriteList from "./components/favourite";
import WatchList from "./components/watched";

import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const MOVIE_API_URL = "https://www.omdbapi.com/?s=bad&apikey=4a3b711b";
const initialState = {
  loading: true,
  movies: [],
  favorites: [],
  watched: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const yearsearch = (yearValue) => {
    dispatch({ type: "SEARCH_MOVIES_REQUEST" });
    fetch(`https:///www.omdbapi.com/?s=bad&y=${yearValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const search = (searchValue) => {
    dispatch({ type: "SEARCH_MOVIES_REQUEST" });
    fetch(`https:///www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const addToFav = (id) => {
    var flag = true;
    if (favorites.length >= 1) {
      for (var i = 0; i < favorites.length; i++) {
        if (id === favorites[i]) {
          alert("Already added to Favourites");
          flag = false;
        }
      }
      if (flag) {
        favorites.push(id);
      }
    } else {
      favorites.push(id);
    }
  };

  const addToWatched = (id) => {
    var flag = true;
    if (watched.length >= 1) {
      for (var i = 0; i < favorites.length; i++) {
        if (id === favorites[i]) {
          alert("Already added to Your Watched List");
          flag = false;
        }
      }
      if (flag) {
        watched.push(id);
      }
    } else {
      watched.push(id);
    }
  };

  const { movies, errorMessage, loading, favorites, watched } = state;

  return (
    <div className="App">
      <Header text="Micro Movie Management System" />

      <Router>
        <NavLinks />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Search search={search} />
            <Yearsearch search={yearsearch} />
            <p className="App-intro">Sharing Few of Our Favourite Movies</p>
            <div className="movies">
              {loading && !errorMessage ? (
                <span>Loading...</span>
              ) : errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
              ) : (
                movies.map((movie, index) => (
                  <React.Fragment>
                    <Movie
                      key={`${index}-${movie.Title}`}
                      movie={movie}
                      search={addToFav}
                      watch={addToWatched}
                    />
                  </React.Fragment>
                ))
              )}
            </div>
          </Route>
          <Route path="/favorites">
            <FavoriteList fav={favorites} />
          </Route>
          <Route path="/watched">
            <WatchList fav={watched} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
