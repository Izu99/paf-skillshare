import axios from "axios";

const API_URL = "http://localhost:8080/api/mealPlans";

const MealPlanService = {
  // Get all meal plans
  getAllMealPlans: async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      throw error; // Throw the error to handle it in the component
    }
  },

  // Get meal plans by user ID
  getMealPlansByUserId: async (userId) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(`${API_URL}/${userId}`, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching meal plans for user ${userId}:`, error);
      throw error; // Throw the error to handle it in the component
    }
  },

  // Create a new meal plan
  createMealPlan: async (mealPlanData) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(API_URL, mealPlanData, config);
      return response.data;
    } catch (error) {
      console.error("Error creating meal plan:", error);
      throw error; // Throw the error to handle it in the component
    }
  },

  // Update an existing meal plan
  updateMealPlan: async (mealPlanId, updatedMealPlanData) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.put(
        `${API_URL}/${mealPlanId}`,
        updatedMealPlanData,
        config
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating meal plan ${mealPlanId}:`, error);
      throw error; // Throw the error to handle it in the component
    }
  },

  // Delete a meal plan by ID
  deleteMealPlan: async (mealPlanId) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      await axios.delete(`${API_URL}/${mealPlanId}`, config);
      return; // No need to return anything for delete operation
    } catch (error) {
      console.error(`Error deleting meal plan ${mealPlanId}:`, error);
      throw error; // Throw the error to handle it in the component
    }
  },
};

export default MealPlanService;
