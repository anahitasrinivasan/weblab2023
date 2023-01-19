import React, { useState } from "react";
import { get } from "../../utilities";

const Search = (props) => {
  const [value, setValue] = useState("");
  const [usersFound, setUsersFound] = useState([]);

  const onSubmit = (value) => {
    console.log(value);
    // Get the users with this name
    //get("/api/chat", { recipient_id: recipient._id }).then((messages) => {

    get("/api/users", { search: value }).then((users) => {
      const userNames = users.map((user) => {
        return user["name"];
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
      <input type="text" placeholder="type something" value={value} onChange={handleChange} />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
      <div>{usersFound[0]}</div>
    </div>
  );
};

export default Search;
