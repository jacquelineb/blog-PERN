import React from 'react';
import ProfileEditor from '../../features/user/components/ProfileEditor';
import style from './Dashboard.module.scss';

function Dashboard() {
  return (
    <div className={style.Dashboard}>
      <h1>Dashboard</h1>
      <div>
        <ProfileEditor />
      </div>
    </div>
  );
}

export default Dashboard;
