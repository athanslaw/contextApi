import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import {users, deleteUserById} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { UserContext } from '../../contexts/UserContext';
import Users from './components/Users';

const UserList = (props) => {

    const [userState, dispatch] = useContext(UserContext);

    const allUsers = props.users;
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const customStyles = {
        overlay: {
            backgroundColor: 'transparent'
        },
        content : {
            top : '50%',
            left : '50%',
            right : 'auto',
            width : '50%',
            bottom : 'auto',
            marginRight : '-50%',
            padding: '29px 16px 40px 36px',
            transform : 'translate(-50%, -50%)'
        }
    };

    const handleDelete = (user) => {
        dispatch({type: 'DELETE_USER'});
        setShowModal(false);
        let newUserList = props.users.filter(user => user.id !== currentUser.id);
        props.getUsers(newUserList);
    }

    const triggerDelete = (user) => {
        setCurrentUser(user);
        openModal();
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <div className="py-4 px-1 overflow-auto">
        <Modal
          isOpen={showModal}
          style={customStyles}
          onRequestClose={closeModal}
          contentLabel="Delete Modal"
        >
            <div className="flex justify-between items-center mb-12">
                <p className="text-darkerGray font-bold text-lg">Are you sure you want to delete {currentUser?.name}?</p>
                <button onClick={closeModal} className="focus:outline-none">close</button>
            </div>

          <div className="text-center my-4">Kindly note that this action is not reversible</div>
            <div className="flex justify-between items-center">
                <button className="bg-textRed py-4 px-16 text-white font-bold rounded-sm focus:outline-none" onClick={handleDelete}>Delete</button>
                <button className="border border-primary py-4 px-16 text-primary font-bold rounded-sm focus:outline-none" onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
        <Users deleteUser={triggerDelete}  users={props.users}/>
        </div>
    );
}

export default UserList;
