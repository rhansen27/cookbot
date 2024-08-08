import React, { useState } from 'react';
import { Avatar, Badge, Space } from 'antd';
import likeIcon from '../assets/app-icons/like.png'; 

const LikeButton = () => {
    const [likeCount, setLikeCount] = useState(0);
  
    const handleBadgeClick = () => {
      setLikeCount(likeCount + 1);
    };
  
    return (
      <Space direction="vertical">
        <Space size="large">
          <Badge count={likeCount} onClick={handleBadgeClick} style={{ cursor: 'pointer' }}>
            <Avatar shape="square" size="large" src={likeIcon} />
          </Badge>
        </Space>
      </Space>
    );
  };
  
  export default LikeButton;