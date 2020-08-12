import React, { useState } from "react";

const WatchList = (props) => {
  var li = [];
  var len = props.fav.length;
  for (var i = 0; i < len; i++) {
    li.push(props.fav[i]);
  }

  const [list, updateList] = useState(li);

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    updateList(list.filter((item) => item !== name));
  };

  return (
    <div>
      {list.map((item) => {
        return (
          <ul>
            <li key={item.id}>
              <span className="movieName">{item}</span>
              <button className="remove" name={item} onClick={handleRemoveItem}>
                Remove
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default WatchList;
