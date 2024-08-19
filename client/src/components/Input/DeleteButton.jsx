import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import { REMOVE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function DeleteButton(props){
    const [removeUser] = useMutation(REMOVE_USER);

     const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // removeUser();
    // window.location.replace('/');
    console.log('User deleted');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button danger type="primary" onClick={showModal}>
        Delete Account 
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>Are you sure you want to delete your account?</h2>
      </Modal>
    </>
  );
};
