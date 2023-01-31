import React, { useState } from "react";
import { get } from "../../utilities";
import PersonFound from "./PersonFound.js";
import "./Search.css";

const Search = (props) => {
  const [value, setValue] = useState("");
  const [usersFound, setUsersFound] = useState([]);

  const onSubmit = (value) => {
    // Get the users with this name
    // console.log(value);

    get("/api/users", { search: value }).then((users) => {
      const userNames = users.map((user) => {
        return (
          <PersonFound
            name={user["name"]}
            friend={user}
            userId={props.userId}
            numId={props.numId}
          />
        );
        //return user["name"];
      });
      console.log(userNames);
      setUsersFound(userNames);

      if(userNames.length == 0) {
        setUsersFound(<div className="Search-noUsersFound">no users found with this name/ID</div>);
      }
    });

    if (!isNaN(value)) {
      console.log("number!");
      const number = parseInt(value);
      get("/api/userFromNumId", { IdNum: number }).then((user) => {
        const person = (
          <PersonFound
            name={user["name"]}
            friend={user}
            userId={props.userId}
            numId={props.numId}
          />
        );
        console.log(usersFound);
        // const newList = [...usersFound, person];
        setUsersFound([person]);
      });
    }
  };

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit(value);
    setValue("");
  };

  return (
    <div className="Search-container">
      <div className="SearchBar">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="search for friends"
          className="Search-input"
        />
        <button type="submit" value="Search" onClick={handleSubmit} className="Search-submit">
          Search
        </button>
      </div>
      <div>{usersFound}</div>
    </div>
  );
};

export default Search;
