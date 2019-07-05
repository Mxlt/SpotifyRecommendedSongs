const requestMySongs = async offset => {
  const data = await fetch("/mysongs?offset=" + offset).catch();
  const jsoned = await data.json();
  console.log(jsoned);
  let parsed = [];
  // only 5 songs
  for (let i = 0; i < 50; i++) {
    parsed.push(jsoned[i][0]);
  }
  console.log(parsed);
  return parsed;
};

export default requestMySongs;
