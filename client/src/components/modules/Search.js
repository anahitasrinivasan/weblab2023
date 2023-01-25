import React, { useState } from "react";
import { get } from "../../utilities";
import PersonFound from "./PersonFound.js";
import "./Search.css";

const Search = (props) => {
  const [value, setValue] = useState("");
  const [usersFound, setUsersFound] = useState([]);

  const onSubmit = (value) => {
    // Get the users with this name

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
    });
    //.then(() => console.log(usersFound));
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
    <div>
      <input
        type="text"
        placeholder="search for friends"
        value={value}
        onChange={handleChange}
        className="Search-input"
      />
      <button type="submit" value="Search" onClick={handleSubmit} className="Search-submit">
        Search
      </button>
      <div>{usersFound}</div>
    </div>
  );
};

export default Search;
