import React, { useEffect, useState } from "react";
import UserConnectionService from "../../Services/UserConnectionService";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import axios from "axios";
import { 
  Button, 
  List, 
  Avatar, 
  Card, 
  Empty, 
  Spin, 
  Typography, 
  message, 
  Tooltip, 
  Badge 
} from "antd";
import { 
  UserDeleteOutlined, 
  MessageOutlined, 
  UserOutlined, 
  EllipsisOutlined,
  HeartFilled
} from "@ant-design/icons";
// import "./FriendsSection.css";

const { Title, Text } = Typography;

const FriendsSection = () => {
  const snap = useSnapshot(state);
  const [friends, setFriends] = useState([]);
  const [friendsUserNameData, setFriendsUserNameData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
  }, [snap.currentUser, snap.users]);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      
      const connections = await UserConnectionService.getUserConnections(snap.currentUser?.uid);
      
      if (!connections || !connections.friendIds) {
        setFriends([]);
        setLoading(false);
        return;
      }
      
      const users = await axios.get(
        "http://localhost:8080/api/users",
        config
      );
      
      setFriendsUserNameData(users.data);
      
      let friendsList = [];
      for (const friendId of connections.friendIds) {
        const user = snap.users.find((user) => user.id === friendId);
        if (user) {
          const userData = users.data.find((friend) => friend.id === user.userId);
          if (userData) {
            // Add a random online status and last active for demo purposes
            const isOnline = Math.random() > 0.5;
            const lastActive = isOnline ? 'Now' : ['5m ago', '2h ago', 'Yesterday', '3d ago'][Math.floor(Math.random() * 4)];
            
            friendsList.push({ 
              ...userData, 
              ...user, 
              isOnline, 
              lastActive,
              mutualFriends: Math.floor(Math.random() * 15)
            });
          }
        }
      }
      
      setFriends(friendsList);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  const unfriend = async (friendId) => {
    try {
      await UserConnectionService.deleteUserConnection(
        snap.currentUser.uid,
        friendId
      );
      
      const updatedFriends = friends.filter((friend) => friend.id !== friendId);
      setFriends(updatedFriends);
      
      message.success("Friend removed successfully");
    } catch (error) {
      console.error("Error unfriending:", error);
      message.error("Failed to remove friend");
    }
  };

  const startChat = (friend) => {
    // Mock function - implement your chat functionality here
    message.info(`Starting chat with ${friend.username}`);
    // You could navigate to a chat page or open a chat modal
  };

  const viewProfile = (friend) => {
    // Mock function - implement your profile view functionality
    message.info(`Viewing ${friend.username}'s profile`);
    // You could set state to show a profile modal or navigate to profile page
  };

  if (loading) {
    return (
      <div className="friends-loading">
        <div className="friends-loading-content">
          <Spin size="large" />
          <Text>Finding your friends...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="friends-section">
      <div className="friends-header">
        <Title level={3} className="section-title">
          My Friends
          <Badge 
            count={friends.length} 
            showZero 
            style={{ backgroundColor: '#1890ff', marginLeft: '10px' }} 
          />
        </Title>
      </div>
      
      {friends.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="empty-friends">
              <Text>No friends yet</Text>
              <Button type="primary">Find People</Button>
            </div>
          }
          className="empty-container"
        />
      ) : (
        <div className="friends-grid">
          {friends.map(friend => (
            <Card
              key={friend.id}
              className="friend-card"
              bodyStyle={{ padding: 0 }}
            >
              <div className="friend-card-cover">
                <div className="friend-card-backdrop" style={{ backgroundColor: getRandomColor() }}></div>
              </div>
              
              <div className="friend-card-content">
                <div className="friend-avatar-container">
                  <Badge dot={friend.isOnline} color="#52c41a" offset={[-4, 4]}>
                    <Avatar
                      src={friend.image}
                      size={80}
                      icon={<UserOutlined />}
                      className="friend-avatar"
                      onClick={() => viewProfile(friend)}
                    />
                  </Badge>
                </div>
                
                <div className="friend-info">
                  <div className="friend-name-status">
                    <Title level={4} className="friend-name" onClick={() => viewProfile(friend)}>
                      {friend.username}
                    </Title>
                    <Text className="friend-status">
                      {friend.isOnline ? 'Online' : `Last active: ${friend.lastActive}`}
                    </Text>
                  </div>
                  
                  <div className="friend-bio">
                    <Text ellipsis={{ rows: 2 }}>
                      {friend.biography || "No bio available"}
                    </Text>
                  </div>
                  
                  <div className="friend-footer">
                    <div className="friend-mutual">
                      <HeartFilled className="mutual-icon" />
                      <Text className="mutual-text">{friend.mutualFriends} mutual friends</Text>
                    </div>
                    
                    <div className="friend-actions">
                      <Tooltip title="Message">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<MessageOutlined />}
                          onClick={() => startChat(friend)}
                          className="action-button message-btn"
                        />
                      </Tooltip>
                      
                      <Tooltip title="Unfriend">
                        <Button
                          danger
                          shape="circle"
                          icon={<UserDeleteOutlined />}
                          onClick={() => unfriend(friend.id)}
                          className="action-button unfriend-btn"
                        />
                      </Tooltip>
                      
                      <Tooltip title="More options">
                        <Button
                          type="default"
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          className="action-button more-btn"
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to generate random pastel colors for card backgrounds
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 70%, 80%, 0.8)`;
}

export default FriendsSection;