import { useState } from "react";
import Card from "./components/card";
import "./App.css";

function App() {
  const [showCard, setShowCard] = useState(false);
  const openCard = () => {
    setShowCard(true);
  };
  const closeCard = () => {
    setShowCard(false);
  };
  return (
    <div className={showCard ? "App AppChanged" : "App"}>
      <div className={showCard ? "main-modificat" : "main" }>
        <p>Card</p>
        <button onClick={openCard}>Deschide Card</button>
      </div>
      {showCard ? <Card closeCard={closeCard} /> : null}
    </div>
  );
}

export default App;
