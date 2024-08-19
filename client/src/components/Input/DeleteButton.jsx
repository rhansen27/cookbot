import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import { REMOVE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

export default function DeleteButton(props){
    const [removeUser] = useMutation(REMOVE_USER);

     const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    removeUser();
    console.log('User deleted');
    Auth.logout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button danger type="primary" onClick={showModal} style={{margin: '1rem', display: 'flex', justifyContent: 'center'}}>
        Delete Account 
      </Button>
      <Modal title="Delete Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>Are you sure you want to delete your account?</h2>
      </Modal>
    </>
  );
};
