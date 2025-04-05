import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, DatePicker, Checkbox } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import SkillPlanService from "../../Services/SkillPlanService";
import dayjs from 'dayjs';

const { Option } = Select;

const UpdateSkillPlanModal = () => {
  const snap = useSnapshot(state);
  const selectedSkillPlan = snap.selectedSkillPlanToUpdate;
  const [updateSkillPlanLoading, setUpdateSkillPlanLoading] = useState(false);
  const [form] = Form.useForm();

  const updatePlan = async (values) => {
    try {
      setUpdateSkillPlanLoading(true);
      await SkillPlanService.updateSkillPlan(selectedSkillPlan.id, {
        ...values,
        userId: snap.currentUser.uid,
        date: values.date.format("YYYY-MM-DD"),
        isFinished: values.isFinished || false,
      });
      state.skillPlans = await SkillPlanService.getAllSkillPlans();
      state.updateSkillPlanOpened = false;
    } catch (error) {
      console.error("Error updating skill plan:", error);
    } finally {
      setUpdateSkillPlanLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSkillPlan) {
      form.setFieldsValue({
        skillDetails: selectedSkillPlan.skillDetails,
        skillLevel: selectedSkillPlan.skillLevel,
        resources: selectedSkillPlan.resources,
        date: selectedSkillPlan.date ? dayjs(selectedSkillPlan.date) : null,
        isFinished: selectedSkillPlan.isFinished,
      });
    }
  }, [form, selectedSkillPlan]);

  return (
    <Modal
      footer={null}
      onCancel={() => {
        state.updateSkillPlanOpened = false;
      }}
      open={snap.updateSkillPlanOpened}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={updatePlan}
      >
        <Form.Item
          name="skillDetails"
          label="Skill Details"
          rules={[{ required: true, message: "Please enter skill details" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="skillLevel"
          label="Skill Level"
          rules={[{ required: true, message: "Please select skill level" }]}
        >
          <Select>
            <Option value="beginner">Beginner</Option>
            <Option value="intermediate">Intermediate</Option>
            <Option value="advanced">Advanced</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="resources"
          label="Resources"
          rules={[{ required: true, message: "Please provide resources" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="date"
          label="Scheduled Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="isFinished"
          valuePropName="checked"
          label="Is Finished?"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateSkillPlanLoading}
          >
            Update Skill Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSkillPlanModal;