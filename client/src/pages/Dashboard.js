import React from 'react';
import PostToolbar from '../components/PostToolbar';
import EditUserDetails from '../components/EditUserDetails';
import style from '../styles/Dashboard.module.scss';

function Dashboard() {
  return (
    <div className={style.DashboardContainer}>
      <h1>Dashboard</h1>
      <div className={style.dashboardSection}>
        <EditUserDetails />
      </div>
      <div className={style.dashboardSection}>
        <PostToolbar tools={['create']} />
      </div>
    </div>
  );
}

export default Dashboard;
