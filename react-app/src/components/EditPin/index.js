import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { editSinglePin, fetchAllPins, fetchSinglePin } from "../../store/pin";
import "./EditPin.css";

const EditPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const pin = useSelector((state) => state.pins.singlePin);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destinationLink, setDestinationLink] = useState("");
  const [note, setNote] = useState("");
  const [altText, setAltText] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchSinglePin(pinId));
  }, []);

  const validate = () => {
    let errors = [];

    // validations for title
    if (title.length === 0) {
      errors.push("Please enter a title");
    } else if (title.length > 100) {
      errors.push("Title can not exceed 100 characters");
    }

    // validations for description
    if (about.length === 0) {
      errors.push("Please enter a description for this pin");
    } else if (about.length > 255) {
      errors.push("Description can not exceed 255 characters");
    }

    // // validations for destination link
    // const isValidUrl = (urlString) => {
    //   try {
    //     return Boolean(new URL(destinationLink));
    //   } catch (e) {
    //     return false;
    //   }
    // };

    // if (!isValidUrl(destinationLink)) {
    //   errors.push("Please enter a valid URL");
    // }

    // validations for note
    if (note.length > 255) {
      errors.push("Notes can not exceed 255 characters");
    }

    // validations for alt text
    if (altText.length > 255) {
      errors.push("Alt text can not exceed 255 characters");
    }

    return errors;
  };

  const onSave = async (e) => {
    let errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrors(errors);
    }

    const data = {
      title: title,
      about: about,
      destination_link: destinationLink,
      note: note,
      alt_text: altText,
    };

    await dispatch(editSinglePin(pinId, data));
    await dispatch(fetchAllPins());

    history.push(`/pins/${pinId}`);
  };

  return (
    <>
      <div className="edit-page-main-container">
        <div className="left-container-image-edit-page">
          <div className="edit-image-container">
            <img src={pin.image} />
          </div>
        </div>
        <div className="right-container-edit-details-container">
          <div className="edit-header-icons-container">
            <div className="edit-header-icons">
              <div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div className="single-pin-header-save-button" onClick={onSave}>
                <button>Save</button>
              </div>
            </div>
          </div>
          {errors.length > 0 &&
            errors.map((error) => (
              <div style={{ textDecorationColor: "red" }}>{error}</div>
            ))}
          <div className="edit-title-container">
            <input
              placeholder="Edit your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <label>Edit title...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit pin description"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></input>
            <label>Edit description...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit destination link"
              value={destinationLink}
              onChange={(e) => setDestinationLink(e.target.value)}
            ></input>
            <label>Edit destination...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></input>
            <label>Edit optional note...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit alt text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            ></input>
            <label>Edit optional alt text...</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPin;