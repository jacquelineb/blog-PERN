import React from 'react';
import { CreateBlogPost } from './BlogPostTransactions';
import EditUserDetails from './EditUserDetails';

function Dashboard({ user }) {
  return (
    <>
      <h1>Dashboard</h1>
      <CreateBlogPost />
      <EditUserDetails user={user} />
    </>
  );
}

export default Dashboard;
