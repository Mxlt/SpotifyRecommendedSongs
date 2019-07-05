import React, { useState, useEffect } from "react";
import "../App.css";
import requestMySongs from "../api/request-my-songs";
import FormControl from "@material-ui/core/FormControl";
import recommendationRequest from "../api/recommendationRequest";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DisplaySongs from "./DisplaySongs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    margin: "5px"
  }
}));

function MySongsForm() {
  const [requestOffset, setRequestOffset] = useState(0);
  const [offset, setOffset] = useState({ quantity: 0 });
  const [showSongs, setShow] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelected] = useState({ song: "" });
  const [recommendations, setRecommendations] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    async function getData(requestOffset) {
      const res = await requestMySongs(requestOffset);
      setSongs(res);
    }
    getData(requestOffset);
  }, [requestOffset, setSongs, setRequestOffset]);

  async function submitSong() {
    const recs = await recommendationRequest(selectedSong.song);
    setRecommendations(recs.tracks);
  }

  function UpdateSelected(event) {
    event.persist();
    console.log(event);
    console.log(event.target.value);
    setSelected({ song: event.target.value });
  }

  function addOffset() {
    if (offset.quantity + 5 >= songs.length) {
      setSongs([]);
      setRequestOffset(requestOffset + 50);
      setOffset({ quantity: 0 });
    } else {
      setOffset({ quantity: offset.quantity + 5 });
    }
  }

  function reduceOffset() {
    if (offset.quantity - 5 <= 0) {
      if (requestOffset - 50 <= 0) {
        setRequestOffset(0);
      } else {
        setRequestOffset(requestOffset - 50);
      }

      setOffset({ quantity: 0 });
    } else {
      setOffset({ quantity: offset.quantity - 5 });
    }
  }

  useEffect(() => {
    function setDisplay() {
      let newList = [];
      for (let i = offset.quantity; i < offset.quantity + 5; i++) {
        newList.push(songs[i]);
      }
      console.log(newList);
      setShow(newList);
    }
    if (songs.length !== 0) {
      setDisplay();
    }
  }, [offset, songs]);

  if (showSongs.length === 0) {
    return <div />;
  } else {
    console.log(showSongs);
    return (
      <div>
        <FormControl component="fieldset">
          <RadioGroup>
            {showSongs.map((song, index) => {
              return (
                <FormControlLabel
                  control={<Radio />}
                  key={index}
                  value={song.song_spotify_id}
                  name="songInput"
                  onClick={e => UpdateSelected(e)}
                  label={song.name}
                />
              );
            })}
          </RadioGroup>
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reduceOffset()}
              className={classes.buttonMargin}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => submitSong()}
              className={classes.buttonMargin}
            >
              Select Song
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => addOffset()}
              className={classes.buttonMargin}
            >
              Next
            </Button>
          </div>
        </FormControl>
        <DisplaySongs songs={recommendations} />
      </div>
    );
  }

  // <div>
  //   <FormControl>
  //     <FormLabel>Select Song (It may take a minute to load)</FormLabel>
  //     <RadioGroup
  //       value={selectedSong}
  //       onChange={e => {
  //         UpdateSelected(e);
  //       }}
  //     >
  //       <FormControlLabel
  //         value="disabled"
  //         disabled
  //         control={<Radio />}
  //         label="None"
  //         labelPlacement="start"
  //       />
  //       {songs.map((song, index) => {
  //         return (
  //           <FormControlLabel
  //             key={index}
  //             value={song[0].spotify_song_id}
  //             control={<Radio />}
  //             label={song[0].name}
  //           />
  //         );
  //       })}
  //     </RadioGroup>
  //     {/* <RadioGroup>
  //       <FormControlLabel value="yay" control={<Radio />} label="select me" />
  //     </RadioGroup> */}
  //   </FormControl>
  // </div>
}

export default MySongsForm;
