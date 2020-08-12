import React, { useState } from "react";

const FavoriteList = (props) => {
  var li = [];
  var len = props.fav.length;
  for (var i = 0; i < len; i++) {
    li.push(props.fav[i]);
  }

  var wlist = [];
  const [list, updateList] = useState(li);
  const [watchlist, watchupdateList] = useState(wlist);

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    updateList(list.filter((item) => item !== name));
  };

  const handleWatchItem = (e) => {
    const name = e.target.getAttribute("name");
    var n = list.filter((item) => item === name);
    updateList(list.filter((item) => item !== name));
    watchupdateList([...watchlist, n]);
  };

  const removeWatchItem = (e) => {
    var liw = [];
    var len = watchlist.length;
    for (var i = 0; i < len; i++) {
      liw.push(watchlist[i][0]);
    }
    const name = e.target.getAttribute("name");
    watchupdateList(liw.filter((item) => item !== name));
  };

  const onlyWatchedItems = (e) => {
    var liw = [];
    var len = watchlist.length;
    for (var i = 0; i < len; i++) {
      liw.push(watchlist[i][0]);
    }
    updateList([]);
  };

  return (
    <div>
      <div>
        <button className="toggle" onClick={onlyWatchedItems}>
          Toggle Button
        </button>
      </div>
      {list.map((item) => {
        return (
          <ul>
            <li key={item.id}>
              <span className="movieName">{item}</span>
              <button className="remove" name={item} onClick={handleRemoveItem}>
                Remove
              </button>
              <button className="remove" name={item} onClick={handleWatchItem}>
                Add to Watched List
              </button>
            </li>
          </ul>
        );
      })}
      {watchlist.map((item) => {
        return (
          <ul>
            <li key={item.id}>
              <span className="movieName">{item}</span>
              <button className="remove" name={item} onClick={removeWatchItem}>
                Remove from Watched List
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default FavoriteList;
