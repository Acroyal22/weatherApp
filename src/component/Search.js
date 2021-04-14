import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

 const handleSearchInputChanges = (event) => {
    setSearchValue(event.target.value);
  };
  const resetInputField = (event) => {
    setSearchValue("");
  };
  const callSearchFunction=(event)=>{
      event.preventDefault();
      props.search(searchValue);
      resetInputField("")

  }
  return (
    <div className="col col-sm-4">
      <input
        type="text"
        value={searchValue}
        className="form-control"
        onChange={handleSearchInputChanges}
        placeholder="TYPE TO SEARCH"
      />
      <input type="submit" value="SEARCH" onClick={callSearchFunction}/>
    </div>
  );
};

export default Search;
