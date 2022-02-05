import React, { useContext, useState } from 'react';
import { Breadcrumbs, Breadcrumb } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import UserForm from './components/Userform';
import {users, getUserById} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { UserContext } from '../../contexts/UserContext';

const UpdateUser = ({match, location, history}) => {
  console.log(location)

//const user={}
  const [user, setUser] = useState(location.state?.user);

    const [userState, dispatch] = useContext(UserContext);
    const handleUpdate = (values, {setSubmitting}) => {
         dispatch({type: 'UPDATE_USER'});
         setSubmitting(true);


         let jsonObj = userState.users
         let index= jsonObj.findIndex(x => x.id === user.id);
         if (index !== -1) {
             jsonObj[index]["username"]=values.username
             jsonObj[index]["name"]=values.name
             jsonObj[index]["email"]=values.email
             jsonObj[index]["username"]=values.username
             jsonObj[index]["address"]={"street":"","suite":"","city":values.city,"zipcode":"","geo":{"lat":"","lng":""}}
          }

         dispatch({type: 'CREATE_USER_SUCCESS', payload: {response: jsonObj}});

         setSubmitting(false);
         history.push("/users");


    }
    return (
      <Layout location={location}>
          <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold"/>
          <Breadcrumb data={{
              title: 'Modify User Record',
              pathname: match.path
          }}>
              <div className="my-6 shadow-container pl-2.5 pr-7">
                  <div className="flex justify-between px-1 mt-16">
                      <div className="w-8/10 flex items-center px-1">

                      </div>
                  </div>
                  <UserForm formFields={user} handleFormSubmit={handleUpdate}/>
              </div>
          </Breadcrumb>
      </Layout>
    );
}

export default UpdateUser;
