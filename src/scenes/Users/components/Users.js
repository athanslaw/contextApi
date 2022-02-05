import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({users, deleteUser}) => {

    const userList = users && users.map(user => {
      return (
        <div key={user.id} className="custom-table-row w-full flex">
            <div className="table-row-data w-1/10">{user.id}</div>
            <div className="table-row-data w-2/10">{user.name}</div>
            <div className="table-row-data w-1/10">{user.username}</div>
            <div className="table-row-data w-2/10">{user.email}</div>
            <div className="table-row-data w-2/10">{user.address.city}</div>
            <div className="table-row-data w-1/10">
              <Link to={{pathname: `/users/${user.id}`, state: {user: user}}}>
                <button onClick={()=>deleteUser(user)} style={{backgroundColor:'#FAAA00'}} className="py-2 px-5 text-white font-bold rounded-sm focus:outline-none">edit</button>
              </Link>
            </div>
            <div className="table-row-data w-1/10">
              <button onClick={()=>deleteUser(user)} style={{backgroundColor:'#cc0000'}} className="py-2 px-5 text-white font-bold rounded-sm focus:outline-none">delete</button>
            </div>
        </div>)
      })

    return(
        <div className="table">
            <div className="table-header">
                <div className="custom-table-row w-full flex">
                    <div className="table-header-data w-1/10">Id</div>
                    <div className="table-header-data w-2/10">Name</div>
                    <div className="table-header-data w-1/10">Username</div>
                    <div className="table-header-data w-2/10">Email</div>
                    <div className="table-header-data w-2/10">City</div>
                    <div className="table-header-data w-1/10">Edit</div>
                    <div className="table-header-data w-1/10">Delete</div>
                </div>
            </div>

            <div className="table-body">
              { userList}
            </div>
        </div>
    )

}

export default Users
