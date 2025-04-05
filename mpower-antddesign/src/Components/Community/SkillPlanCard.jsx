import React, { useState } from "react";
import { Card, Button, Row, Checkbox, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import SkillPlanService from "../../Services/SkillPlanService";
import dayjs from 'dayjs';

const SkillPlanCard = ({ plan }) => {
  const snap = useSnapshot(state);
  const [deleteLoading, setIsDeleteLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(plan.isFinished);
  const [updateLoading, setUpdateLoading] = useState(false);

  const deletePlan = async () => {
    try {
      setIsDeleteLoading(true);
      await SkillPlanService.deleteSkillPlan(plan.id);
      state.skillPlans = await SkillPlanService.getAllSkillPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCheckboxChange = async (e) => {
    try {
      setUpdateLoading(true);
      setIsFinished(e.target.checked);

      // Update only the isFinished status
      await SkillPlanService.updateSkillPlan(plan.id, {
        ...plan,
        isFinished: e.target.checked
      });

      // Refresh the plans
      state.skillPlans = await SkillPlanService.getAllSkillPlans();
    } catch (error) {
      console.error("Error updating plan status:", error);
      setIsFinished(plan.isFinished); // Revert on error
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Card
      title={`Skill Plan: ${plan.skillDetails}`}
      extra={
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            state.selectedSkillPlanToUpdate = plan;
            state.updateSkillPlanOpened = true;
          }}
          type="dashed"
        >
          Edit
        </Button>
      }
      style={{
        backgroundColor: isFinished ? 'red' : '#123456', // Change background color
        borderColor: isFinished ? 'darkred' : 'default', // Dark red border if finished
      }}
    >
      <Row>
        <p>Skill Details: {plan.skillDetails}</p>
        <p>Skill Level: {plan.skillLevel}</p>
        <p>Resources: {plan.resources}</p>
        <p>Scheduled Date: {dayjs(plan.date).format("YYYY-MM-DD")}</p>
      </Row>

      <Row>
        Finished:
        <Checkbox
          checked={isFinished}
          onChange={handleCheckboxChange}
          loading={updateLoading}
        />
      </Row>

      <Button
        icon={<DeleteOutlined />}
        onClick={deletePlan}
        loading={deleteLoading}
        type="danger"
        style={{ marginTop: 10 }}
      >
        Delete
      </Button>
    </Card>
  );
};

export default SkillPlanCard;
