const recommendationRequest = async request => {
  const song = await fetch("/recommendation/?id=" + request).catch();
  const jsoned = await song.json();
  console.log(jsoned);
  return jsoned;
};

export default recommendationRequest;
