import React, { useEffect, useState } from "react";
import { Tabs, Avatar, Button } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import MealPlanService from "../../Services/MealPlanService";
import SkillPlanService from "../../Services/SkillPlanService"; // Add this import
import StateDebugger from "./StateDebugger";

// Components
import TobBox from "./TobBox";
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import CreateWorkoutPlanBox from "./CreateWorkoutPlanBox";
import WorkoutPlanCard from "./WorkoutPlanCard";
import CreateSkillPlanBox from "./CreateSkillPlanBox"; // Add this import
import SkillPlanCard from "./SkillPlanCard"; // Add this import
import CreaetMealPlanBox from "./CreaetMealPlanBox";
import MealPlanCard from "./MealPlanCard";
import FriendsSection from "./FriendsSection";
import Notifications from "./Notifications";

const { TabPane } = Tabs;

const CenterSection = () => {
  const snap = useSnapshot(state);
  const [mealPlans, setMealPlans] = useState([]);
  const [skillPlans, setSkillPlans] = useState([]); // Add this state

  // Fetch posts
  useEffect(() => {
    PostService.getPosts()
      .then((result) => {
        state.posts = result;
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  // Fetch meal plans on initial load and when snap.mealPlans change
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const plans = await MealPlanService.getAllMealPlans(); // Assuming getAllMealPlans fetches the meal plans
        setMealPlans(plans);
      } catch (err) {
        console.error("Failed to fetch meal plans:", err);
      }
    };

    // Initial fetch
    fetchMealPlans();

    // Listen to changes in snap.mealPlans to update the mealPlans state
    const mealPlansObserver = () => {
      setMealPlans(snap.mealPlans);
    };

    // Set observer to update meal plans when snap.mealPlans changes
    mealPlansObserver();

    // Cleanup: Remove observer if needed
    return () => {
      // You can remove any listeners here if needed
    };
  }, [snap.mealPlans]);  // This ensures it updates when meal plans in the state change

  // Add this useEffect for skill plans
  useEffect(() => {
    const fetchSkillPlans = async () => {
      try {
        const plans = await SkillPlanService.getAllSkillPlans();
        setSkillPlans(plans);
      } catch (err) {
        console.error("Failed to fetch skill plans:", err);
      }
    };

    fetchSkillPlans();

    const skillPlansObserver = () => {
      setSkillPlans(snap.skillPlans);
    };

    skillPlansObserver();

    return () => {
      // Cleanup if needed
    };
  }, [snap.skillPlans]);

  return (
    <div className="center-section">
      <div className="profile-header">
        <Avatar
          onClick={() => {
            state.profileModalOpend = true;
          }}
          size={70}
          src={snap.currentUser?.image}
          className="profile-avatar"
        />
        <div className="tab-container">
          {/* <Tabs
            activeKey={String(snap.activeIndex)}
            onChange={(key) => {
              state.activeIndex = Number(key);
            }}
            type="card"
            className="custom-tabs"
          >
            <TabPane tab="Feed" key="1" />
            <TabPane tab="Workout Plans" key="2" />
            <TabPane tab="Meal Plans" key="3" />
            <TabPane tab="Friends" key="4" />
            <TabPane tab="Notifications" key="5" />
          </Tabs> */}
        </div>
      </div>

      <div className="content-container">
        <TobBox /> {/* Move TobBox here to be visible for all tabs */}
        
        {snap.activeIndex === 1 && (
          <div className="feed-container">
            <MyPost />
            <div className="posts-list">
              {snap.posts.map((post, index) => (
                <FriendsPost key={post.id || index} post={post} />
              ))}
            </div>
          </div>
        )}

        {snap.activeIndex === 2 && (
          <div className="workout-container">
            <CreateWorkoutPlanBox />
            <div className="plans-grid">
              {snap.workoutPlans.map((plan, index) => (
                <WorkoutPlanCard key={plan.id || index} plan={plan} />
              ))}
            </div>
          </div>
        )}

        {snap.activeIndex === 3 && (
          <div className="meal-container">
            <StateDebugger />
            <CreaetMealPlanBox />
            <div className="plans-grid">
              {mealPlans.length > 0 ? (
                mealPlans.map((plan) => (
                  <MealPlanCard key={plan.id} plan={plan} />
                ))
              ) : (
                <div>No meal plans found</div>
              )}
            </div>
          </div>
        )}

        {snap.activeIndex === 4 && (
          <div className="skill-container">
            <StateDebugger />
            <CreateSkillPlanBox />
            <div className="plans-grid">
              {skillPlans.length > 0 ? (
                skillPlans.map((plan) => (
                  <SkillPlanCard key={plan.id} plan={plan} />
                ))
              ) : (
                <div>No skill plans found</div>
              )}
            </div>
          </div>
        )}

        {snap.activeIndex === 5 && (
          <div className="friends-container">
            <FriendsSection />
          </div>
        )}

        {snap.activeIndex === 6 && (
          <div className="notifications-container">
            <Notifications />
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterSection;
