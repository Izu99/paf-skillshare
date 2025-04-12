import React, { useEffect } from "react";
import "../Styles/community.css";
import "../Styles/CenterSection.css";
import "../Styles/FriendPost.css";
import "../Styles/TopBox.css";
import "../Styles/StoryCard.css";
import "../Styles/MyPost.css";
import "../Styles/CommentCard.css";
import "../Styles/NotificationCard.css";
import "../Styles/FriendSection.css";
import "../Styles/SkillPlan.css";
import "../Styles/SkillPlanBox.css";

import CreateWorkoutStoryModal from "../Components/Modals/CreateWorkoutStoryModal";
import WorkoutStory from "../Components/Modals/WorkoutStory";
import WorkoutStoryService from "../Services/WorkoutStoryService";
import CenterSection from "../Components/Community/CenterSection";
import UserProfileModal from "../Components/Modals/UserProfileModal";
import state from "../Utils/Store";
import { useSnapshot } from "valtio";
import CreatePostModal from "../Components/Modals/CreatePostModal";
import UserService from "../Services/UserService";
import UploadPostModal from "../Components/Modals/UploadPostModal";
import FriendProfileModal from "../Components/Modals/FriendProfileModal";
import { message } from "antd";
import LeftMenu from "../Components/Community/LeftMenu";

// Import SkillPlan components
import CreateSkillPlanModal from "../Components/Modals/CreateSkillPlanModal"; // SkillPlan modal for creating
import UpdateSkillPlanModal from "../Components/Modals/UpdateSkillPlanModal"; // SkillPlan modal for updating
import SkillPlanService from "../Services/SkillPlanService"; // SkillPlan service

const Community = () => {
  const snap = useSnapshot(state);
  const getWorkoutStories = async () => {
    try {
      const response = await WorkoutStoryService.getAllWorkoutStories();
      state.storyCards = response;
    } catch (error) {
      console.log("Failed to fetch workout stories", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await UserService.getProfiles();
      state.users = response;
    } catch (error) {
      console.log("Failed to fetch users", error);
    }
  };

  
 
   
    
     
   
   
   
  

  // Fetch SkillPlans
  const getSkillPlans = async () => {
    try {
      const response = await SkillPlanService.getAllSkillPlans(); // Assuming this service exists
      state.skillPlans = response;
    } catch (error) {
      console.log("Failed to fetch skill plans", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      UserService.getProfile()
        .then((response) => {
          state.currentUser = response;
          message.success("Welcome ");
        })
        .catch((err) => {
          message.error("Failed to fetch user profile");
        });
    }
    getAllUsers().then(() => {
    
     
    
      getSkillPlans(); // Fetch Skill Plans
    });
  }, []);

  const communityBodyStyle = {
    color: "white",
    width: "100vw",
    height: "100vh",
  };

  return (
    <div className="community-body" style={communityBodyStyle}>
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "250px",
        }}
      >
        <LeftMenu />
        <CenterSection />
      </div>
      
      {/* Modals */}
      <UserProfileModal />
      <CreateWorkoutStoryModal />
    
      <CreateSkillPlanModal />
      {snap.selectedWorkoutStory && <WorkoutStory />}
      <CreatePostModal />
      {snap.selectedPost && <UploadPostModal />}
      
     
      {snap.selectedUserProfile && <FriendProfileModal />}

      {snap.selectedSkillPlan && <CreateSkillPlanModal />} {/* Create SkillPlan */}

      {/* SkillPlan Modals */}
      {snap.selectedSkillPlanToUpdate && <UpdateSkillPlanModal />} {/* Edit SkillPlan */}
    </div>
  );
};

export default Community;
