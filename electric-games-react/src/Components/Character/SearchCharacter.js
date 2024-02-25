import { React, useEffect, useState } from 'react';

function SearchCharacter(props) {
  const [searchWord, setSearchWord] = useState("");

  // Searches while you type. I know this is not recommended on large projects. But I think it's a fun to use here :)
  useEffect(() => {
    props.onSearchCharacter(searchWord)
  }, [searchWord])

  // Search on submit
  const searchCharacter = (e) => {
    e.preventDefault();
    props.onSearchCharacter(searchWord);
  }

  return (
    <>
      <form onSubmit={searchCharacter} className="search-bar" role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search for title, platform or release year"
          onChange={(e) => { setSearchWord(e.target.value) }}
          aria-label="Search" />
        <i className='bi bi-search bi-big'></i>
        {/* <button className="btn btn-outline-primary" type="submit">Search</button> */}
      </form>
    </>
  );
}

export default SearchCharacter;