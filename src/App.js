import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import { Circles } from "react-loading-icons";
import { useState, useEffect } from 'react';

function App() {
  const [currentCard, setCatFact] = useState("");
  const [correctCards, setCorrectCards] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nameAttempt, setNameAttempt] = useState('');
  const [correct, setCorrect] = useState(''); //TODO: Make this a boolean

  const currentCardImage = currentCard?.card_images?.[0]?.image_url;

  const fetchCurrentCard = () => {
    setLoading(true);
    Axios.get("https://db.ygoprodeck.com/api/v7/randomcard.php").then((res) => {
      setCatFact(res.data);
      setLoading(false);
      setCorrect('');
    });
  }

  useEffect(() => {
    fetchCurrentCard();
  }, [correctCards]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(nameAttempt);
    const cleanAttempt = nameAttempt.replace(/\s/g, '').toLowerCase();
    const cleanCardName = currentCard.name.replace(/\s/g, '').toLowerCase();

    if (cleanAttempt === cleanCardName) {
      console.log('Correct');
      setCorrect('true');
      setCorrectCards(correctCards + 1);
    } else {
      setCorrect('false');
      fetchCurrentCard()
      console.log('Wrong');
    }
    setNameAttempt('');
  }

  console.log(currentCard);

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="topbar">
        Guess the Card: Yugioh Edition
      </div>
      <div className='correct-cards'>
        Number of Cards Guessed Correctly: &nbsp;
        {correctCards}
      </div>
      <div className='game-wrapper'>
        <div className='image-wrapper'>
          {loading && (
            <div className="loading-image">
              <Circles stroke="#98ff98" />
            </div>
          )}
          {correct === '' && <div className="name-blocker"/>}
          <img
            src={currentCardImage}
            className={`card-image ${loading ? 'blurred' : ''}`}
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              Enter Your Attempt Here:
            </div>
            <label>
              <input 
                className={`${correct === 'true' && 'correct'} ${correct === 'false' && 'incorrect'} noSubmit input-area`}
                type="text" 
                value={nameAttempt}
                onChange={(e) => setNameAttempt(e.target.value)}
              />
            </label>
            <div className='submit-button-wrapper'>
              <input className='submit-button' type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
