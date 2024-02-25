import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import CharactersPage from "./pages/CharactersPage";
import HangmanPage from "./pages/HangmanPage";
import NoPage from "./pages/NoPage";

function App() {
  const [userInformed, setUserInformed] = useState(JSON.parse(localStorage.getItem("user-informed")))

  // Show user how to update and delete once. Based on localstorage value
  useEffect(() => {
    if (userInformed === null) return
    localStorage.setItem("user-informed", JSON.stringify(userInformed))
  }, [userInformed])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="games" element={<GamesPage userInformed={userInformed} setUserInformed={setUserInformed} />} />
        <Route path="characters" element={<CharactersPage userInformed={userInformed} setUserInformed={setUserInformed} />} />
        <Route path="hangman" element={<HangmanPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;