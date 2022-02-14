import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    // console.log(cards, turns);
  };

  const handleChoice = (card) => {
    // console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  console.log(cards);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // console.log("Matched");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return { ...card };
            }
          });
        });
        resetChoices();
      } else {
        // console.log("Not Matched");
        setTimeout(resetChoices, 500);
      }
    } else {
    }
  }, [choiceOne, choiceTwo]);

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTruns) => prevTruns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>The Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
      </div>
      <p>Number of Turns : {turns}</p>
      <p>Made with &lt3 by Damodar</p>
    </div>
  );
}

export default App;
