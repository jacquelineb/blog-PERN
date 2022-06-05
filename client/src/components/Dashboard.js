import React from 'react';
import CreateBlogPost from './CreateBlogPost';
import EditUserDetails from './EditUserDetails';
import style from '../styles/Dashboard.module.scss';

function Dashboard({ user }) {
  return (
    <div className={style.DashboardContainer}>
      <h1>Dashboard</h1>
      <div className={style.dashboardSection}>
        <EditUserDetails user={user} />
      </div>
      <div className={style.dashboardSection}>
        <CreateBlogPost />
      </div>
    </div>
  );
}

export default Dashboard;
