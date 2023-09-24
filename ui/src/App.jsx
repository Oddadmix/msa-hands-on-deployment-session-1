import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [prediction, setPrediction] = useState(null);
  const [sentence, setSentence] = useState(null);
// Sample Predication {"compound":0.0,"neg":0.0,"neu":1.0,"pos":0.0}

  const parsePrediction = (prediction) => {

    if(prediction === null){
      return "None";
    }

    if(prediction.pos > prediction.neg){
      return "Positive";
    }
    else if(prediction.neg > prediction.pos){
      return "Negative";
    }
    else{
      return "Neutral";
    }
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Text Sentiment Analyzer.</h1>
      <div className="card">
        <textarea className='mt-10 textarea' onChange={(e)=>{
          setSentence(e.target.value);
        }} type="text" placeholder="Enter a sentence" />
        <br/>
        <button className='mt-10' onClick={() => {
          fetch('/api/predict?text='+sentence, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            setPrediction(data);
          })
        }}>
          Predict
        </button>
        {prediction &&
        <p>
          The prediction is {parsePrediction(prediction)}
        </p>}
      </div>
    </>
  )
}

export default App
