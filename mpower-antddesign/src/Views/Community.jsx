import React, { useEffect } from "react";
import "../Styles/community.css";
import "../Styles/center_section.css";
import "../Styles/Friend-post.css";
import "../Styles/TopBox.css";
import "../Styles/StoryCard.css";
import "../Styles/MyPost.css";
import "../Styles/ContactCard.css";
import "../Styles/CommentCard.css";
import "../Styles/NotificationCard.css";
import "../Styles/FriendSection.css";
import "../Styles/MealPlan.css";
import "../Styles/SkillPlan.css";
import CenterSection from "../Components/Community/CenterSection";
import UserProfileModal from "../Components/Modals/UserProfileModal";
import CreateWorkoutStoryModal from "../Components/Modals/CreateWorkoutStoryModal";
import WorkoutStory from "../Components/Modals/WorkoutStory";
import WorkoutStoryService from "../Services/WorkoutStoryService";
import state from "../Utils/Store";
import { useSnapshot } from "valtio";
import CreatePostModal from "../Components/Modals/CreatePostModal";
import UserService from "../Services/UserService";
import UploadPostModal from "../Components/Modals/UploadPostModal";
import CreateWorkoutPlan from "../Components/Modals/CreateWorkoutPlan";
import WorkoutPlanService from "../Services/WorkoutPlanService";
import EditWorkoutPlanModal from "../Components/Modals/EditWorkoutPlanModal";
import UpdateMealPlanModal from "../Components/Modals/UpdateMealPlanModal";
import CreateMealPlanModal from "../Components/Modals/CreateMealPlanModal";
import MealPlanService from "../Services/MealPlanService";
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

  const getWorkoutPlans = async () => {
    try {
      const response = await WorkoutPlanService.getAllWorkoutPlans();
      state.workoutPlans = response;
    } catch (error) {
      console.log("Failed to fetch workout plans", error);
    }
  };

  const getMealPlans = async () => {
    try {
      const response = await MealPlanService.getAllMealPlans();
      state.MealPlans = response;
    } catch (error) {
      console.log("Failed to fetch meal plans", error);
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
      getWorkoutStories();
      getWorkoutPlans();
      getMealPlans();
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
      <CreateWorkoutPlan />
      <CreateMealPlanModal />
      <CreateSkillPlanModal />
      {snap.selectedWorkoutStory && <WorkoutStory />}
      <CreatePostModal />
      {snap.selectedPost && <UploadPostModal />}
      {snap.selectedWorkoutPlan && <EditWorkoutPlanModal />}
      {snap.seletedMealPlanToUpdate && <UpdateMealPlanModal />}
      {snap.selectedUserProfile && <FriendProfileModal />}

      {snap.selectedSkillPlan && <CreateSkillPlanModal />} {/* Create SkillPlan */}

      {/* SkillPlan Modals */}
      {snap.selectedSkillPlanToUpdate && <UpdateSkillPlanModal />} {/* Edit SkillPlan */}
     

      {/* Existing Meal Plan Modals */}
      {snap.selectedMealPlan && <CreateMealPlanModal />}
      {snap.selectedMealPlanToUpdate && <UpdateMealPlanModal />}
    </div>
  );
};

export default Community;
