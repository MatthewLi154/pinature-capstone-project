import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchUserBoardPins, fetchUserBoards } from "../../store/board";
import EditBoard from "../EditBoardModal";
import "./SingleBoard.css";

const SingleBoard = () => {
  const { profileId, boardId } = useParams();
  const dispatch = useDispatch();

  const pins = useSelector((state) => state.boards.boardPins[boardId]);
  const boards = useSelector((state) => state.boards.userBoards[boardId]);
  const user = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const pinsArr = [];
  for (const pin in pins) {
    pinsArr.push(pins[pin]);
  }

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, [dispatch]);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  // Modal for edit and delete board
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="single-board-page-container">
        <div className="boards-details-main-container">
          {boards && (
            <div className="board-details-container">
              <div className="board-details-header">
                <h1>{boards.name}</h1>
                <i
                  className="fa-solid fa-ellipsis ellipsis-container"
                  onClick={openMenu}
                ></i>
                {showMenu && (
                  <div className="single-board-page-dropdown">
                    <ul>
                      <li className="board-options-text">Board Options</li>
                      <li
                        className="board-option-buttons"
                        onClick={(e) => {
                          setOpenModal(true);
                          e.stopPropagation();
                        }}
                      >
                        Edit board
                      </li>
                      <EditBoard
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        props={{ boardId, profileId }}
                      />
                      <li className="board-option-buttons">Delete board</li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <img src={user.profile_img} />
              </div>
              <div>{boards.description}</div>
            </div>
          )}
        </div>
        <div style={{ marginLeft: "2rem" }}>{pinsArr.length} Pins</div>
        <div className="all-pins-main-container single-board-main-container-pins">
          {pinsArr.length > 0 &&
            pinsArr.map((pin) => (
              <div className="pin-container">
                <NavLink to={`/pins/${pin.id}`}>
                  <div>
                    <img
                      src={pin.image}
                      //   style={{ height: `${randomHeight()}rem` }}
                    ></img>
                  </div>
                  <div>{pin.title}</div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SingleBoard;