import React, { FormEvent } from "react";
import { useAsyncUserData, useFormDataStore } from "./stores";

export const Form = () => {
  const { username, password, setUsername, setPassword } = useFormDataStore();
  const { tokenRequest, userRequest } = useAsyncUserData();

  async function login() {
    const token = await tokenRequest({ username, password });
    console.log(token);
    if (token) userRequest(token);
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    login();
  }

  return (
    <form onSubmit={handleSubmit} className="form slide">
      <label htmlFor="name">Name</label>
      <input
        value={username}
        type="text"
        id="name"
        name="name"
        onChange={(event) => setUsername(event.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={password}
        id="password"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" className="button">
        Enviar
      </button>
    </form>
  );
};
