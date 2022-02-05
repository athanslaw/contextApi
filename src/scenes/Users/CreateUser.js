import React, { useContext } from 'react';
import { Breadcrumbs, Breadcrumb } from 'react-breadcrumbs';
import { UserContext, UserController } from '../../contexts/UserContext';
import Layout from '../../shared/Layout';
import UserForm from './components/Userform';
import {register} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';

const CreateUser = ({match, location, history}) => {
    const [userState, dispatch] = useContext(UserContext);
    const handleCreate = (values, {setSubmitting}) => {
      console.log("Length:", JSON.stringify(userState.users))

        const requestBody = {
            id: (userState.users.length+1),
            name: values.name,
            username: values.username,
            email: values.email,
            address:{"street":"","suite":"","city":values.city,"zipcode":"","geo":{"lat":"","lng":""}},
        };
        dispatch({type: 'CREATE_USER'});
         setSubmitting(true);

         userState.users.push(requestBody);
         dispatch({type: 'CREATE_USER_SUCCESS', payload: {response: userState.users}});

         setSubmitting(false);
         history.push("/users");
    }
    return (
      <Layout location={location}>
          <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold"/>
          <Breadcrumb data={{
              title: 'Add Users',
              pathname: match.path
          }}>
              <div className="my-6 shadow-container pl-2.5 pr-7">
                  <div className="flex justify-between px-1 mt-16">
                      <div className="w-8/10 flex items-center px-1">

                      </div>
                  </div>
                  <UserForm handleFormSubmit={handleCreate}/>
              </div>
          </Breadcrumb>
      </Layout>
    );
}

export default CreateUser;
