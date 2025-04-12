import axios from "axios";
import { BASE_URL } from "../constants";

const SkillPlanService = {
  async getAllSkillPlans() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.get(`${BASE_URL}/skillPlans`, config);
      return response.data.map(plan => ({
        ...plan,
        // Normalize the completion status regardless of field name returned
        isFinished: 
          plan.isFinished === true || 
          plan.isFinished === "true" ||
          plan.finished === true || 
          plan.finished === "true",
        finished: 
          plan.isFinished === true || 
          plan.isFinished === "true" ||
          plan.finished === true || 
          plan.finished === "true"
      }));
    } catch (error) {
      console.error("Error getting skill plans:", error.response?.data || error.message);
      throw error;
    }
  },

  async createSkillPlan(skillPlan) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      
      // Ensure both boolean fields are sent to handle backend inconsistency
      const planToSend = {
        ...skillPlan,
        isFinished: Boolean(skillPlan.isFinished),
        finished: Boolean(skillPlan.isFinished)
      };
      
      const response = await axios.post(`${BASE_URL}/skillPlans`, planToSend, config);
      
      // Normalize the response to ensure consistency
      return {
        ...response.data,
        isFinished:
          response.data.isFinished === true ||
          response.data.isFinished === "true" ||
          response.data.finished === true ||
          response.data.finished === "true",
        finished:
          response.data.isFinished === true ||
          response.data.isFinished === "true" ||
          response.data.finished === true ||
          response.data.finished === "true"
      };
    } catch (error) {
      console.error("Error creating skill plan:", error);
      throw error;
    }
  },

  async updateSkillPlan(skillPlanId, skillPlan) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      
      // Ensure both boolean fields are sent to handle backend inconsistency
      const planToSend = {
        ...skillPlan,
        isFinished: Boolean(skillPlan.isFinished),
        finished: Boolean(skillPlan.isFinished)
      };
      
      const response = await axios.put(`${BASE_URL}/skillPlans/${skillPlanId}`, planToSend, config);
      
      // Normalize the response to ensure consistency
      return {
        ...response.data,
        isFinished:
          response.data.isFinished === true ||
          response.data.isFinished === "true" ||
          response.data.finished === true ||
          response.data.finished === "true",
        finished:
          response.data.isFinished === true ||
          response.data.isFinished === "true" ||
          response.data.finished === true ||
          response.data.finished === "true"
      };
    } catch (error) {
      console.error("Error updating skill plan:", error);
      throw error;
    }
  },

  async deleteSkillPlan(skillPlanId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      await axios.delete(`${BASE_URL}/skillPlans/${skillPlanId}`, config);
      return true;
    } catch (error) {
      console.error("Error deleting skill plan:", error);
      throw error;
    }
  }
};

export default SkillPlanService;