const requestPersonalData = async () => {
  const data = await fetch("/mydata").catch();
  const jsoned = await data.json();
  return jsoned;
};

export default requestPersonalData;
