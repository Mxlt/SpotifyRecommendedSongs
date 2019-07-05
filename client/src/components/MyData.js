import React, { useState, useEffect } from "react";
import "../App.css";
import requestPersonalData from "../api/request-personal-data";
import newUser from "../api/create-user";

function MyData() {
  const [user, setUser] = useState(newUser());
  useEffect(() => {
    async function getData() {
      const res = await requestPersonalData();
      setUser(res);
    }
    getData();
  }, [setUser]);

  return (
    <div>
      <h2>My Data</h2>
      <p>
        <b>My Id:</b> {user.id_user}
      </p>
      <p>
        <b>My username:</b> {user.username}
      </p>
      <p>
        <b>My birthdate:</b> {user.birthdate}
      </p>
      <p>
        <b>My email:</b> {user.email}
      </p>
      <p>
        <b>My country:</b> {user.country}
      </p>
      <p>
        <b>My accessToken:</b> {user.accessToken}
      </p>
      <p>
        <b>My refreshToken:</b> {user.refreshToken}
      </p>
      <p>
        <b>My expiration orf accessToken:</b> {user.expires_in}
      </p>
      <p>
        <b>Account creation date:</b> {user.createdAt}
      </p>
      <p>
        <b>Account last update:</b> {user.updatedAt}
      </p>
    </div>
  );
}

export default MyData;
