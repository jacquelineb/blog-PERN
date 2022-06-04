import React from 'react';
import CreateBlogPost from './CreateBlogPost';
import EditUserDetails from './EditUserDetails';
import style from '../styles/Dashboard.module.scss';

function Dashboard({ user }) {
  return (
    <div className={style.DashboardContainer}>
      <h1>Dashboard</h1>
      <CreateBlogPost />
      <EditUserDetails user={user} />
    </div>
  );
}

export default Dashboard;
