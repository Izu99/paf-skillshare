import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  profileModalOpend: false,
  createWorkoutStatusModalOpened: false,
  storyCards: [],
  workoutStoryOpen: false,
  selectedWorkoutStory: null,
  createPostModalOpened: false,
  posts: [],
  users: [],
  selectedPost: null,
  updatePostModalOpened: false,
  activeIndex: 1,
  createWorkoutPlanOpened: false,
  workoutPlans: [],
  editWorkoutPlanOpened: false,
  selectedWorkoutPlan: null,
  mealPlans: [],
  createMealPlanOpened: false,
  updateMealPlanOpened: false,
  selectedMealPlanToUpdate: null,
  selectedUserProfile: null,
  friendProfileModalOpened: false,
  
  // Skill Plan section
  skillPlans: [], // Array to store skill plans
  createSkillPlanOpened: false, // To track if the "create skill plan" modal is open
  updateSkillPlanOpened: false, // To track if the "update skill plan" modal is open
  selectedSkillPlanToUpdate: null, // Store selected skill plan to update
});

export default state;
