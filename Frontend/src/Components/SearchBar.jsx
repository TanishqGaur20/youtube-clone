import React from 'react';

//component searchbar containing functionality of searching
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="navsearch w-[100%] flex">
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
      placeholder="Search"
      className="searchbar w-[90%] h-[40px] rounded-l-2xl  border border-solid border-[rgb(58,57,57)] bg-black text-white text-lg pl-7"/>
      <div className="searchicon cursor-pointer w-[70px] border border-solid border-[rgb(42,42,42)] bg-[rgb(42,42,42)] flex justify-center items-center rounded-r-2xl">
        <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
      </div>
    </div>
  );
}

export default SearchBar;
