import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { ProfileEditor } from '../../features/users';
import style from './Dashboard.module.scss';

function Dashboard() {
  const { authUser } = useAuthContext();
  return (
    <div className={style.Dashboard}>
      <h1>Welcome, {authUser}</h1>
      <div>
        <ProfileEditor authUser={authUser} />
      </div>
    </div>
  );
}

export default Dashboard;
