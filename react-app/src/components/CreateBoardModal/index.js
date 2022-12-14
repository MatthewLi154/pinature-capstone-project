import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewBoard } from "../../store/board";
import { fetchUserBoards } from "../../store/board";

const CreateBoard = ({ open, onClose }) => {
  if (!open) return null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const currentProfileId = useSelector((state) => state.session.user.id);
  const userBoards = useSelector((state) =>
    Object.values(state.boards.userBoards)
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserBoards(currentProfileId));
  }, []);

  useEffect(() => {
    dispatch(fetchUserBoards(currentProfileId));
  }, [dispatch]);

  const validate = () => {
    const errors = [];

    if (name.length === 0) {
      errors.push("Don't forget to name your board!");
    } else if (name.length > 55) {
      errors.push("Name must be less than 55 characters!");
    } else if (name.length < 4) {
      errors.push("Name must be longer than 3 characters");
    }

    // can not create board if it already exists
    for (const board of userBoards) {
      if (board.name === name) {
        errors.push("Board already exists, please use a different name");
      }
    }

    return errors;
  };

  const onCreateBoard = async (e) => {
    let errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrors(errors);
    }

    const data = {
      name: name,
      description: description,
      profileId: currentProfileId,
    };

    await dispatch(createNewBoard(data, currentProfileId));
    await dispatch(fetchUserBoards(currentProfileId));

    onClose();
    history.push(`/profile/${currentProfileId}`);
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="header-edit-board-modal">
          <span onClick={onClose}>
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div className="create-board-modal-header">
          <span>Create board and start saving pins</span>
        </div>
        <div className="create-board-input-field-modal">
          <div>Name</div>
          <div>
            <input
              value={name}
              onChange={(e) => {
                e.stopPropagation();
                setName(e.target.value);
              }}
              placeholder='Like "Places to go" or "Nature to see"'
            ></input>
          </div>

          {errors.map((error) => (
            <div className="create-board-error-validations">{error}</div>
          ))}
        </div>
        <div className="create-board-create-button-modal">
          {name.length > 0 ? (
            <button
              type="button"
              style={{ backgroundColor: "red", color: "white", border: "none" }}
              onClick={onCreateBoard}
            >
              Create
            </button>
          ) : (
            <button
              onClick={onCreateBoard}
              type="button"
              class="close"
              data-dismiss="modal"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
