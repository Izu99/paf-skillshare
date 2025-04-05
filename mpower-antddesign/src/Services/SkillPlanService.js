import axios from "axios";

const API_URL = "http://localhost:8080/api/skillPlans";

const SkillPlanService = {
  getAllSkillPlans: async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    try {
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching skill plans:", error);
      throw error;
    }
  },

   // Create a new skill plan
   createSkillPlan: async (skillPlanData) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(API_URL, skillPlanData, config);
      return response.data;
    } catch (error) {
      console.error("Error creating skill plan:", error);
      throw error; // Throw the error to handle it in the component
    }
  },

 
  createSkillPlan: async (skillPlanData) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    try {
      const response = await axios.post(API_URL, skillPlanData, config);
      return response.data;
    } catch (error) {
      console.error("Error creating skill plan:", error);
      throw error;
    }
  },

   // Update an existing skill plan
  updateSkillPlan: async (skillPlanId, updatedSkillPlanData) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.put(
        `${API_URL}/${skillPlanId}`,
        updatedSkillPlanData,
        config
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating skill plan ${skillPlanId}:`, error);
      throw error; // Throw the error to handle it in the component
    }
  },


  deleteSkillPlan: async (skillPlanId) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    try {
      await axios.delete(`${API_URL}/${skillPlanId}`, config);
    } catch (error) {
      console.error(`Error deleting skill plan ${skillPlanId}:`, error);
      throw error;
    }
  },
};
export default SkillPlanService;
