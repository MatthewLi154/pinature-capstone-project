import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllPins, fetchSinglePin } from "../../store/pin";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import { fetchUserBoards } from "../../store/board";
import CreatedPins from "./CreatedPins";
import SavedPins from "./SavedPins";
import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { profileId } = useParams();
  const currentProfileId = useSelector((state) => state.session.user.id);
  const currentProfile = useSelector((state) => state.profiles.singleProfile);
  const userBoards = useSelector((state) =>
    Object.values(state.boards.userBoards)
  );

  const [onCreated, setOnCreated] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(fetchSingleProfile(profileId));
    dispatch(fetchUserBoards(profileId));
  }, [dispatch]);

  let yourPage = false;
  if (parseInt(profileId) === currentProfileId) {
    yourPage = true;
  }

  return (
    <>
      {currentProfile && (
        <div className="main-profile-information-container">
          <div className="main-profile-information-sub-container">
            {currentProfile.profileImg ? (
              <img src={currentProfile.profileImg}></img>
            ) : (
              <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
            )}
            <div className="main-profile-name-container">
              {currentProfile.firstName} {currentProfile.lastName}
            </div>
            <div className="handle-and-pronouns-container">
              @{currentProfile.username} · {currentProfile.pronouns}
            </div>
            <div>
              <a
                href={currentProfile.website}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                {currentProfile.website}
              </a>
            </div>
            {/* <div>
              <button>Edit Profile</button>
            </div> */}
          </div>
          {onCreated ? (
            <div className="profile-created-saved-pins-container">
              <div className="created-saved-toggle-container">
                <h3
                  style={{ borderBottom: "2px solid black" }}
                  onClick={(e) => setOnCreated(true)}
                >
                  Created
                </h3>
                <h3 onClick={(e) => setOnCreated(false)}>Saved</h3>
              </div>
              <CreatedPins />
            </div>
          ) : (
            <div>
              <div className="created-saved-toggle-container">
                <h3 onClick={(e) => setOnCreated(true)}>Created</h3>
                <h3
                  style={{ borderBottom: "2px solid black" }}
                  onClick={(e) => setOnCreated(false)}
                >
                  Saved
                </h3>
              </div>
              <SavedPins props={userBoards} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
