import React from 'react';
import { CreateBlogPost } from './BlogPostTransactions';

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <CreateBlogPost />
    </>
  );
}

export default Dashboard;
