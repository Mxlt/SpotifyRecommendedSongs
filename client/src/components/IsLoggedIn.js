const IsLoggedIn = async () => {
  const data = await fetch("/islogged").catch();
  const jsoned = await data.json();
  return jsoned;
};

export default IsLoggedIn;
