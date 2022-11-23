import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./CreatedPins.css";

const CreatedPins = () => {
  const { profileId } = useParams();

  const [pins, setPins] = useState("");

  useEffect(async () => {
    await fetch(`/api/profile/${profileId}/pins/created`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setPins(Object.values(data));
      });
  }, []);

  console.log(pins);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  return (
    <>
      <h3>Created</h3>
      <div className="all-pins-main-container">
        {pins &&
          pins.map((pin) => (
            <div className="pin-container">
              <NavLink to={`/pins/${pin.id}`}>
                <div>
                  <img
                    src={pin.image}
                    style={{ height: `${randomHeight()}rem` }}
                  ></img>
                </div>
                <div>{pin.title}</div>
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default CreatedPins;