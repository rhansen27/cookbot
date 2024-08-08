import React, { useState } from 'react';
import { Avatar, Badge, Space } from 'antd'; 
import dislikeIcon from '../assets/app-icons/dislike.png'

const DislikeButton = () => {
    const [dislikeCount, setDislikeCount] = useState(0);
  
    const handleBadgeClick = () => {
      setDislikeCount(dislikeCount + 1);
    };
  
    return (
      <Space direction="vertical">
        <Space size="large">
          <Badge count={dislikeCount} onClick={handleBadgeClick} style={{ cursor: 'pointer' }}>
            <Avatar shape="square" size="large" src={dislikeIcon} />
          </Badge>
        </Space>
      </Space>
    );
  };
  
  export default DislikeButton;