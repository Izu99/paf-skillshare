import React from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

const CreateMealPlanBox = () => {
  const snap = useSnapshot(state);
  return (
    <div
      className="my_post"
      onClick={() => {
        state.createMealPlanOpened = true;
      }}
      style={{
        background: "linear-gradient(to right, #2193b0, #6dd5ed)", // Blue gradient
        padding: "10px 15px",
        borderRadius: "7px",
        boxShadow: "0 1px 8px rgba(0,0,0,0.2)",
        marginBottom: "10px",
        color: "white", // Ensuring text color is white for better visibility
      }}
    >
      <div
        className="post_top"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          alt="alt-tag"
          src={snap.currentUser?.image}
          style={{
            marginRight: "10px",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
        />
        <input
          type="text"
          placeholder={`Let's share your meal plan ${snap.currentUser?.username}`}
          style={{
            flexGrow: 1,
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            color: "black", // Specific text color for input for readability
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Slightly transparent background for the input
          }}
        />
      </div>
    </div>
  );
};

export default CreateMealPlanBox;