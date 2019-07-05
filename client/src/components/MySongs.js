import React, { useState, useEffect } from "react";
import "../App.css";
import requestMySongs from "../api/request-my-songs";

function MySongs() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await requestMySongs();
      setSongs(res);
    }
    getData();
  }, [setSongs]);

  return (
    <div>
      {songs.map((song, index) => {
        return <p key={index}>{song[0].name}</p>;
      })}
    </div>
  );
}

export default MySongs;
