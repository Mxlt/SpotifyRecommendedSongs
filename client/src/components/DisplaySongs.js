import React, { useState, useEffect } from "react";
import "../App.css";

function MyData(props) {
  const [songs, setSongs] = useState(props.songs);
  useEffect(() => {
    setSongs(props.songs);
  }, [props.songs]);

  if (songs.length >= 1) {
    return (
      <div>
        <h3>Recommendations</h3>

        {songs.map((song, index) => {
          return (
            <p key={index}>
              <a
                href={
                  "https://www.youtube.com/results?search_query=" + song.name
                }
              >
                {song.name} by {song.artists[0].name}
              </a>
            </p>
          );
        })}
      </div>
    );
  } else {
    return <div />;
  }
}

export default MyData;
