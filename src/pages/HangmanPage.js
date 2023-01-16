import { React, useEffect, useState } from "react";
import Navbar from '../Components/Navbar';
import axios from "axios";

function HangmanPage() {
  const gameControllerUrl = "https://localhost:7420/api/Games";
  const [games, setGames] = useState([]);
  const [secretWord, setSecretWord] = useState([]);
  const [guessedWord, setGuessedWord] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState("");
  const [correctLetters, setCorrectLetters] = useState("");
  const [correctGuess, setCorrectGuess] = useState(false);
  const [correctGuessClass, setCorrectGuessClass] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(8);
  const allowedLetters = ["_", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];
  var noMatch;

  useEffect(() => {
    startGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lives <= 0) {
      showRightAnswer()
      setGameOver(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lives])

  const getGames = async () => {
    return axios.get(gameControllerUrl)
      .then(response => { return (response.data) })
      .catch(error => console.log(error));
  };

  const startGame = async () => {
    setGames(await getGames())
    const initiate = await getGames()
    const rndNumb = Math.floor(Math.random() * initiate.length)
    const word = initiate[rndNumb].title.toUpperCase()
    var wordEm = [];
    var wordSe = [];
    ([...word].forEach((c) => {
      allowedLetters.includes(c) ?
        wordEm.push("_") :
        wordEm.push(c);
      wordSe.push(c)
    }))
    setSecretWord(wordSe)
    setGuessedWord(wordEm)
    setUsedLetters("")
    setCorrectLetters("")
    setCorrectGuessClass("")
    setGameStarted(false)
    setCorrectGuess(false)
  }

  const newWord = () => {
    const rndNumb = Math.floor(Math.random() * games.length)
    const word = games[rndNumb].title.toUpperCase()
    var wordEm = [];
    var wordSe = [];
    ([...word].forEach((c) => {
      allowedLetters.includes(c) ?
        wordEm.push("_") :
        wordEm.push(c);
      wordSe.push(c)
    }))
    setSecretWord(wordSe)
    setGuessedWord(wordEm)
    setUsedLetters("")
    setCorrectLetters("")
    setCorrectGuessClass("")
    setGameStarted(false)
    setCorrectGuess(false)
  }

  const updateGameStatus = (e) => {
    if (!gameStarted) setGameStarted(true)
    if (gameOver) return
    checkLetter(e)
    if (arrayEquals(guessedWord, secretWord)) {
      setCorrectGuess(true)
      setCorrectGuessClass("win-color")
      setScore(prev => prev + 1)
    }
    if (noMatch) setLives(prev => prev - 1)
  }

  const checkLetter = (e) => {
    setUsedLetters(prev => prev + e)
    noMatch = true
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === e) {
        guessedWord[i] = e
        setCorrectLetters(prev => prev + e)
        noMatch = false
      }
    }
  }

  const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  const showRightAnswer = () => {
    [...allowedLetters].forEach(c => {
      checkLetter(c);
    })
  }

  const nextLevel = (e) => {
    e.preventDefault();
    if (correctGuess)
      newWord()
    setGameStarted(true)
  }

  const reset = () => {
    newWord()
    setScore(0)
    setLives(8)
    setGameOver(false)
  }

  return (
    <>
      <Navbar></Navbar>
      <div className={`hangman-game flex-center ${gameOver && "game-over"} ${correctGuess && "correct-guess"}`}>

        {!gameOver && !correctGuess && <h4 className="text-center">Guess as many games as you can!</h4>}
        {gameOver && <h4 className="text-center">Game over! </h4>}
        {correctGuess && <h4 className="text-center">Nice!</h4>}

        <div className="hangman-contraption">
          <div className="hangman-container">
            <div className="hangman-shadow">
              <div className="hangman-building-rope hangman-building"></div>
              <div className="hangman-building-corner hangman-building"></div>
              <div className="hangman-building-right hangman-building"></div>
              <div className="hangman-building-top hangman-building"></div>
            </div>
            <div className="hangman-building-right hangman-building"></div>
            <div className="hangman-building-top hangman-building"></div>
            <div>
              <div className="hangman-shadow">
                {lives < 8 ? <div className="hangman-body-head hangman-body"></div> : ""}
                {lives < 7 ? <div className="hangman-body-torso hangman-body"></div> : ""}
                {lives < 6 ? <div className="hangman-body-leg-right hangman-body"></div> : ""}
                {lives < 5 ? <div className="hangman-body-leg-left hangman-body"></div> : ""}
                {lives < 4 ? <div className="hangman-body-arm-right hangman-body"></div> : ""}
                {lives < 3 ? <div className="hangman-body-arm-left hangman-body"></div> : ""}
                {lives < 2 ? <div className="hangman-body-eye eye-1 hangman-body"></div> : ""}
                {lives < 2 ? <div className="hangman-body-eye eye-2 hangman-body"></div> : ""}
                {lives < 1 ? <div className="hangman-body-eye eye-3 hangman-body"></div> : ""}
                {lives < 1 ? <div className="hangman-body-eye eye-4 hangman-body"></div> : ""}
              </div>
              <div className="hangman-body-texture">
                {lives < 8 ? <div className="hangman-body-head hangman-body"></div> : ""}
                {lives < 7 ? <div className="hangman-body-torso hangman-body"></div> : ""}
                {lives < 6 ? <div className="hangman-body-leg-right hangman-body"></div> : ""}
                {lives < 5 ? <div className="hangman-body-leg-left hangman-body"></div> : ""}
                {lives < 4 ? <div className="hangman-body-arm-right hangman-body"></div> : ""}
                {lives < 3 ? <div className="hangman-body-arm-left hangman-body"></div> : ""}
                {lives < 2 ? <div className="hangman-body-eye eye-1 hangman-body"></div> : ""}
                {lives < 2 ? <div className="hangman-body-eye eye-2 hangman-body"></div> : ""}
                {lives < 1 ? <div className="hangman-body-eye eye-3 hangman-body"></div> : ""}
                {lives < 1 ? <div className="hangman-body-eye eye-4 hangman-body"></div> : ""}
              </div>
            </div>
          </div>

          {!gameOver && <p className="text-center">Score: {score}</p>}

        </div>
        <div className="secret-word-container">
          <div className="secret-word-letters margin-bottom">
            {guessedWord.map((c, index) => {
              return (
                allowedLetters.includes(c) ?
                  <div key={`guessedWord${index}`} className={`letter ${correctGuessClass}`}>{c}</div> :
                  <div key={`guessedWord${index}`} className="inactive">{c}</div>
              )
            })}
          </div>
        </div>

        {!gameOver && <label htmlFor="allowed-letters" className="text-center">Click letters to guess</label>}

        <div className="all-letters-container">
          <div id="allowed-letters" className="all-letters">
            {allowedLetters.map((c, index) => {
              return (
                (c !== "_") &&
                (!usedLetters.includes(c) ?
                  <button key={`allowedLetters${index}`} className="letter" onClick={() => updateGameStatus(`${c}`)}>{c}</button>
                  :
                  <button key={`allowedLetters${index}`} className={`letter ${correctLetters.includes(c) ? "correct-letter" : "wrong-letter"}`}>{c}</button>
                )
              )
            })}
          </div>
        </div>

        <form onSubmit={(e) => nextLevel(e)} className="flex-center flex-center-column">

          {!gameOver && <div className="flex-center-column">
            <label htmlFor="keyboard-input" className="margin-bottom">or type letters with keyboard</label>
            <input id="keyboard-input" className="input-guess-letters text-center" value={""} type="text" onChange={(e) => updateGameStatus(e.target.value.toUpperCase())} />
          </div>}

          <div className="hangman-buttons">

            {(gameStarted && !gameOver) && <button type="button" className="btn btn-secondary" onClick={reset}>Reset</button>}
            {(!gameStarted && !gameOver) && <button type="button" className="btn btn-primary" onClick={newWord}>New word</button>}
            {(gameOver) && <button type="button" className="btn btn-primary" onClick={reset}>Try again</button>}

            {correctGuess ?
              <button type="submit" className="btn btn-primary" >Next</button> :
              <button type="button" className="btn btn-inactive">Next</button>
            }
          </div>
        </form>
        {/* POTENTIAL SCOREBOARD SYSTEM
        <ul className="scoreboard-container">
          <li className="scoreboard-atributes scoreboard-row">
            <p className="scoreboard-place">Place</p>
            <p className="scoreboard-margin"> </p>
            <p className="scoreboard-name">Name</p>
            <p className="scoreboard-score">Score</p>
          </li>
          <li className="scoreboard-row scoreboard-line"></li>
          <li className="scoreboard-entry scoreboard-row">
            <p className="scoreboard-place">1</p>
            <p className="scoreboard-margin"> </p>
            <p className="scoreboard-name">Username</p>
            <p className="scoreboard-score">6</p>
          </li>
          <li className="scoreboard-row scoreboard-line"></li>
          <li className="scoreboard-entry scoreboard-row">
            <p className="scoreboard-place">2</p>
            <p className="scoreboard-margin"> </p>
            <p className="scoreboard-name">Nickname</p>
            <p className="scoreboard-score">5</p>
          </li>
        </ul> */}
      </div>
    </>
  );
}

export default HangmanPage;