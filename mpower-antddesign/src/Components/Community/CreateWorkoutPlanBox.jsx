import React from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

const CreateWorkoutPlanBox = () => {
  const snap = useSnapshot(state);
  return (
    <div
      className="my_post"
      onClick={() => {
        state.createWorkoutPlanOpened = true;
      }}
      style={{
        background: "linear-gradient(to right, #4facfe, #00f2fe)", // Blue gradient
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
          style={{ marginRight: "10px", borderRadius: "50%" }}
        />
        <input
          type="text"
          placeholder="What's your workout plan?"
          style={{
            flexGrow: 1,
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default CreateWorkoutPlanBox;
