import React from 'react';
import EditUserDetails from '../components/EditUserDetails';
import style from '../styles/Dashboard.module.scss';

function Dashboard() {
  return (
    <div className={style.Dashboard}>
      <h1>Dashboard</h1>
      <div>
        <EditUserDetails />
      </div>
    </div>
  );
}

export default Dashboard;
