import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import { UserContext, UserController } from "../../contexts/UserContext";
import Layout from "../../shared/Layout";
import UserList from "./UserList";
import {users} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';

const Users = ({match, location, history}) => {
    const [userState, dispatch] = useContext(UserContext);

    const getAllUsers = (newUserList=[]) => {
        dispatch({type: 'GET_USERS'});
        console.log("Ameh:",JSON.stringify(userState))
        if(userState.users.length <1){
          console.log("entered again")
         apiRequest(users, 'get')
            .then((res) => {
                dispatch({type: 'GET_USERS_SUCCESS', payload: {response: res}});
            })
            .catch((err) => {
                dispatch({type: 'GET_USERS_FAILURE', payload: {error: err}});
                err.response.data.status === 401 ? history.replace("/login") :
                showToast('error', 'Something went wrong. Please try again later')
            });
          }
          else{
            if(newUserList.length > 0){
              dispatch({type: 'GET_USERS_SUCCESS', payload: {response: newUserList}});
            }
          }
    }

    useEffect(() => {
      getAllUsers();
    }, []);

    return (
        <UserController>
            <Layout location={location}>
                <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold"/>
                <Breadcrumb data={{
                    title: 'User list',
                    pathname: match.path
                }}>
                    <div className="my-6 shadow-container pl-2.5 pr-7">
                        <div className="flex justify-between px-1 mt-16">
                            <div className="w-8/10 flex items-center px-1">

                            </div>
                            <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/users/create">
                                Add new
                            </Link>
                        </div>
                        <UserList users={userState.users} getUsers={getAllUsers}/>
                    </div>
                </Breadcrumb>
            </Layout>
        </UserController>
    );
}

export default Users;
