import {React, useState} from 'react';

function SearchGame({onSearchGame}) {
    const [searchWord, setSearchWord] = useState("");

    // Does search by pressing enter in search field
    const searchGameOnEnter = (e)=>{
        if(e.key === 'Enter'){
            searchGame(searchWord);
        }
    }

    const searchGame = ()=>{
        onSearchGame(searchWord);
    }

    return (
        <>
            <h3>Search game</h3>
            <div>
                <input 
                    type="text" 
                    id="search-game" 
                    placeholder="Search for title, platform or release year" 
                    onChange={(e)=>setSearchWord(e.target.value)} 
                    onKeyUp={searchGameOnEnter}>
                </input>
            </div> 
            <input type="button" id="delete-game-btn" value="Search" onClick={searchGame}/>
        </>
    );
}

export default SearchGame;