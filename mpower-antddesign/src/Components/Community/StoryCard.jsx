import React, { useEffect, useState } from "react";
import UserService from "../../Services/UserService";
import state from "../../Utils/Store";
// import "../Styles/StoryCard.css";

const StoryCard = ({ card }) => {
  const [userData, setUserData] = useState();
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  useEffect(() => {
    UserService.getProfileById(card.userId)
      .then((value) => {
        setUserData(value);
      })
      .catch((err) => {
        console.log(`error getting user data ${err}`);
      });
  }, [card]);

  // Function to get user initials for placeholder
  const getUserInitials = () => {
    if (!userData?.username) return "?";
    const names = userData.username.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Function to handle story image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Function to handle profile image error
  const handleProfileImageError = () => {
    setProfileImageError(true);
  };

  return (
    <div
      onClick={() => {
        state.selectedWorkoutStory = card;
        state.workoutStoryOpen = true;
      }}
      className="story_card"
    >
      {/* Main story image with fallback */}
      {!imageError && card?.image ? (
        <img
          alt="Story"
          src={card.image}
          onError={handleImageError}
        />
      ) : (
        <div className="story_image_placeholder">
          Workout
        </div>
      )}

      {/* User profile image with fallback */}
      <div className="story_profile">
        {!profileImageError && userData?.image ? (
          <img
            alt="Profile"
            src={userData.image}
            onError={handleProfileImageError}
          />
        ) : (
          <div className="placeholder">{getUserInitials()}</div>
        )}
        <div className="circle"></div>
      </div>

      {/* Username */}
      <div className="story_name">
        <p className="name">
          {userData?.username || "User"}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;