import React, { useState } from "react";

const EditUserPopup = ({ hideNewForm, user, setUser, setHideNewForm }) => {
  const [userInfo, setUserInfo] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    password: user.password,
    email: user.email,
    image: user.image,
  });

  const inputHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((r) => r.json())
      .then((userData) => {
        setUser(userData);
      });
  };

  return (
    <div className={hideNewForm ? "hidden" : "edit-user-form-container"}>
      <h1>Edit user info</h1>
      <form
        action=""
        className="edit-user-info-form"
        onSubmit={editSubmitHandler}
      >
        <label htmlFor="first_name">First name: </label>
        <input
          type="text"
          name="first_name"
          placeholder={user.first_name}
          onChange={inputHandler}
        />
        <label htmlFor="last_name">Last name: </label>
        <input
          type="text"
          name="last_name"
          placeholder={user.last_name}
          onChange={inputHandler}
        />{" "}
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          placeholder="New Password"
          onChange={inputHandler}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email "
          placeholder="New Email"
          onChange={inputHandler}
        />
        <label htmlFor="image">Profile Picture: </label>
        <input
          type="text"
          name="image"
          placeholder="New Profile Image Link"
          onChange={inputHandler}
        />
        <input
          type="submit"
          className="submit-button"
          onClick={() => setHideNewForm(true)}
        />
      </form>
      <button
        onClick={() => {
          setHideNewForm(!hideNewForm);
        }}
        className="submit-button"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditUserPopup;
