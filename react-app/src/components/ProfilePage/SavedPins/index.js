import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBoards, fetchUserBoardPins } from "../../../store/board";
import "./SavedPins.css";
import CreateBoard from "../../CreateBoardModal";

const SavedPins = (props) => {
  const history = useHistory();
  const [pins, setPins] = useState("");
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const userBoards = props.props;
  const boardPins = useSelector((state) =>
    Object.values(state.boards.boardPins)
  );

  // change userBoards to array as well
  const [showMenu, setShowMenu] = useState(false);
  const [click, setClick] = useState(0);
  // Modal for create board
  const [openModal, setOpenModal] = useState(false);

  let pinsArr = Object.values(boardPins);

  let pinsArrBoard = [];

  for (const pin of pinsArr) {
    let innerPinArr = Object.values(pin);
    let arr = [];
    for (const innerPin of innerPinArr) {
      arr.push(innerPin);
    }
    pinsArrBoard.push(arr);
  }

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, []);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [click]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (openModal) {
      setShowMenu(false);
      setOpenModal(true);
    }
  }, [openModal]);

  return (
    <>
      {userBoards.length > 0 ? (
        <div className="saved-pins-container">
          <div className="create-pin-board-container-button">
            <button onClick={openMenu}>
              <i class="fa-solid fa-plus"></i>
              {showMenu && (
                <div className="create-pin-dropdown-saved-pins-container">
                  <ul>
                    <li>Create</li>
                    <li
                      className="dropdown-list-button"
                      onClick={(e) => {
                        history.push("/pin-builder");
                      }}
                    >
                      Pin
                    </li>
                    <li
                      className="dropdown-list-button"
                      onClick={(e) => {
                        setOpenModal(true);
                        e.stopPropagation();
                      }}
                    >
                      Board
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
          <CreateBoard
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          />
          <div className="user-board-main-container">
            <div className="user-board-container">
              {userBoards &&
                pinsArrBoard.map((pin, index) => (
                  <div
                    className="main-board-container"
                    onClick={() => {
                      history.push(
                        `/profile/${profileId}/boards/${userBoards[index].id}`
                      );
                    }}
                  >
                    <div className="board-container">
                      <div className="left-images-board">
                        {pin[0] ? <img src={pin[0].image} /> : <div></div>}
                      </div>
                      <div className="right-images-board">
                        {pin[1] ? (
                          <img src={pin[1].image} className="top-right-img" />
                        ) : (
                          <div></div>
                        )}
                        {pin[2] ? (
                          <img
                            src={pin[2].image}
                            className="bottom-right-img"
                          />
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    {userBoards[index] && <div>{userBoards[index].name}</div>}
                    <div style={{ fontSize: "12px" }}>{pin.length} Pins</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-boards-available-container">
          <div className="create-pin-board-container-button">
            <button onClick={openMenu}>
              <i class="fa-solid fa-plus"></i>
              {showMenu && (
                <div className="create-pin-dropdown-saved-pins-container">
                  <ul>
                    <li>Create</li>
                    <li
                      className="dropdown-list-button"
                      onClick={(e) => {
                        history.push("/pin-builder");
                      }}
                    >
                      Pin
                    </li>
                    <li
                      className="dropdown-list-button"
                      onClick={(e) => {
                        setOpenModal(true);
                        e.stopPropagation();
                      }}
                    >
                      Board
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
          <CreateBoard
            open={openModal}
            onClose={(e) => {
              setOpenModal(false);
              setShowMenu(false);
            }}
          />
          <div className="no-boards-text">
            <h2>
              No boards available... Please create a board or save pins to
              populate this page
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedPins;
