import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Divider } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import UploadFileService from "../../Services/UploadFileService";
import AuthService from "../../Services/AuthService";
import UserService from "../../Services/UserService";

const uploader = new UploadFileService();

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814c-1.785-1.592-4.106-2.547-6.735-2.547-5.519 0-10 4.481-10 10s4.481 10 10 10c5.523 0 10-4.481 10-10 0-.671-.068-1.325-.195-1.955h-9.805z"
      fill="#4285F4"
    />
  </svg>
);

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [signinFocused, setSigninFocused] = useState(true);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const toggleFocus = () => {
    setSigninFocused(!signinFocused);
  };

  const handleGoogleLogin = () => {
    // Open OAuth in popup
    const popup = window.open(
      'http://localhost:8080/oauth2/authorization/google',
      'Google OAuth',
      'width=500,height=600'
    );

    // Check auth status periodically
    const checkAuth = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/status', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            clearInterval(checkAuth);
            popup.close();
            
            // Store user data from backend
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("accessToken", data.accessToken);
            
            // Update UI state
            onSuccess();
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    }, 1000);
  };


  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      if (signinFocused) {
        const response = await AuthService.login(values.email, values.password);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("accessToken", response.accessToken);
        message.success("Welcome back");
        onClose();
        form.resetFields();
        onSuccess();
      } else {
        const exists = await UserService.checkIfUserExists(values.username);
        if (exists) {
          message.error("User already exists with this username");
          return;
        } else {
          const response = await AuthService.register(values.username, values.password);
          localStorage.setItem("userId", response.userId);
          localStorage.setItem("accessToken", response.accessToken);
        }

        let imageUrl = "";
        if (values.file) {
          imageUrl = await uploader.uploadFile(values.file[0].originFileObj, "userImages");
        }
        const body = {
          userId: localStorage.getItem("userId"),
          biography: values.biography,
          fitnessGoals: values.fitnessGoals,
          image: imageUrl,
          email: values.email,
        };
        await UserService.createProfile(body);
        message.success("Welcome " + values.username);
        onClose();
        form.resetFields();
        onSuccess();
      }
    } catch (err) {
      message.error("Error creating your profile");
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal title="Sign In or Sign Up" open={isOpen} footer={null} onCancel={onClose}>
      <Button style={{ width: '100%', marginBottom: 20 }} onClick={handleGoogleLogin}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GoogleIcon />
          <span style={{ marginLeft: 8 }}>Continue with Google</span>
        </div>
      </Button>

      <Divider>Or</Divider>

      <Form
        name="authForm"
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your Email!" }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        {!signinFocused && (
          <>
            <Form.Item name="confirm" dependencies={["password"]} hasFeedback label="Confirm Password" rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords that you entered do not match!"));
                }
              })
            ]}>
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]} label="Username">
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="biography" rules={[{ required: true, message: "Please input your biography!" }]} label="Biography">
              <Input placeholder="Biography" />
            </Form.Item>
            <Form.Item name="fitnessGoals" rules={[{ required: true, message: "Please input your fitness goals!" }]} label="Fitness Goals">
              <Input placeholder="Fitness Goals" />
            </Form.Item>
            <Form.Item name="file" valuePropName="fileList" getValueFromEvent={normFile} extra="Optional: Upload an image for your profile">
              <Upload.Dragger beforeUpload={() => false} multiple={false}>
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            {signinFocused ? "Sign In" : "Sign Up"}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={toggleFocus}>
            {signinFocused ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;
