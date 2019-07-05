import React from "react";
import "../App.css";

function Presentation() {
  return (
    <div className="Presentation">
      <h1>Spotify Song Recomendations</h1>
      <p>
        This app analyses your songs and based on your selection it searches for
        similar songs.
      </p>
      <p>
        You must be logged in to access your data, songs and use the
        recommendator.
      </p>
    </div>
  );
}

export default Presentation;
