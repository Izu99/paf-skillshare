import React, { useState } from "react";
import { Modal, Switch, Input, Button, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import UserService from "../../Services/UserService";
import { useNavigate } from "react-router-dom";

const uploader = new UploadFileService();
const { Item } = Form;

const UserProfileModal = () => {
  const snap = useSnapshot(state);
  const [uploadUserLoading, setUploadUserLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();
  const navigte = useNavigate();

  const handleUpdateProfile = async () => {
    try {
      setUpdateLoading(true);
      const formData = form.getFieldsValue();
      if (formData.image instanceof File) {
        formData.image = await handleFileUpload(formData.image);
      }
      await UserService.updateUserPrifile({
        ...formData,
        uid: snap.currentUser?.id,
      });

      state.profileModalOpend = false;
      message.success("Profile updated successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      message.error("Profile updating failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    const url = await uploader.uploadFile(file, "userImages");
    return url;
  };

  const handleFileChange = async (info) => {
    if (info.file) {
      setUploadUserLoading(true);
      const imageUrl = await handleFileUpload(info.fileList[0].originFileObj);
      form.setFieldsValue({ image: imageUrl });
      setUploadUserLoading(false);
    }
  };

  return (
    <Modal
      open={snap.profileModalOpend}
      onCancel={() => {
        state.profileModalOpend = false;
      }}
      footer={[
        <Button key="cancel" onClick={() => (state.profileModalOpend = false)}>
          Cancel
        </Button>,
        <Button
          loading={updateLoading}
          key="update"
          type="primary"
          onClick={handleUpdateProfile}
        >
          Update
        </Button>,
        <Button
          key="logout"
          danger
          type="dashed"
          onClick={() => {
            localStorage.clear();
            navigte("/");
          }}
        >
          Logout
        </Button>,
      ]}
    >
      <h2>User Profile</h2>
      <Form form={form} initialValues={snap.currentUser}>
        <Item name="username" label="Username">
          <Input disabled />
        </Item>
        <Item name="biography" label="Biography">
          <Input placeholder="Enter your biography" />
        </Item>
        <Item name="fitnessGoals" label="Fitness Goals">
          <Input placeholder="Enter your fitness goals" />
        </Item>
        <Item name="image" label="Profile Picture">
          <Upload
            accept="image/*"
            onChange={handleFileChange}
            showUploadList={false}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {form.getFieldValue("image") && (
            <img
              src={form.getFieldValue("image")}
              alt="Profile"
              style={{ maxWidth: "100%" }}
            />
          )}
        </Item>
        <Item
          name="profileVisibility"
          label="Profile Visibility"
          valuePropName="checked"
        >
          <Switch />
        </Item>
      </Form>
    </Modal>
  );
};

export default UserProfileModal;
