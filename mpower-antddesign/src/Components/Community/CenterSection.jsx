import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import TobBox from "./TobBox";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import SkillPlanService from "../../Services/SkillPlanService";
import StateDebugger from "./StateDebugger";

// Components
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import CreateSkillPlanBox from "./CreateSkillPlanBox";
import SkillPlanCard from "./SkillPlanCard";
import FriendsSection from "./FriendsSection";
import Notifications from "./Notifications";

const CenterSection = () => {
  const snap = useSnapshot(state);
  const [skillPlans, setSkillPlans] = useState([]);

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
    <div className="center">
      <div className="profile-header">
        <Avatar
          onClick={() => {
            state.profileModalOpend = true;
          }}
          size={70}
          src={snap.currentUser?.image}
          className="profile-avatar"
        />
      </div>
      <TobBox />      
      <div className="content-container">
        {snap.activeIndex === 1 && (
          <div className="">
            <div className="my_post">
              <MyPost />
            </div>
            <div className="posts-list">
              {snap.posts.map((post, index) => (
                <div className="friends_post" key={post.id || index}>
                  <FriendsPost post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {snap.activeIndex === 2 && (
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
        
        {snap.activeIndex === 3 && (
          <div className="friends-container">
            <FriendsSection />
          </div>
        )}
        
        {snap.activeIndex === 4 && (
          <div className="notifications-container">
            <Notifications />
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterSection;