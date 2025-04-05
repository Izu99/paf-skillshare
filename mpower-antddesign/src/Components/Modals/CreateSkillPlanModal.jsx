import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, DatePicker, Checkbox } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import SkillPlanService from "../../Services/SkillPlanService";
import dayjs from 'dayjs';

const { Option } = Select;

const CreateSkillPlanModal = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      await SkillPlanService.createSkillPlan({
        skillDetails: values.skillDetails,
        skillLevel: values.skillLevel,
        resources: values.resources,
        userId: snap.currentUser?.uid,
        date: values.date.format("YYYY-MM-DD"),
        isFinished: values.isFinished || false,
      });

      state.skillPlans = await SkillPlanService.getAllSkillPlans();

      form.resetFields();
      state.createSkillPlanOpened = false;
    } catch (error) {
      console.error("Error creating skill plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={snap.createSkillPlanOpened}
      footer={null}
      onCancel={() => {
        state.createSkillPlanOpened = false;
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          initialValue={false}
          label="Is Finished?"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Skill Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSkillPlanModal;