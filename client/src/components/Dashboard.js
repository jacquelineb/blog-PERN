import React, { useEffect, useState } from 'react';
import { CreateBlogPost } from './BlogPostTransactions';

function Dashboard({ user }) {
  console.log(user);

  return (
    <>
      <h1>Dashboard</h1>
      <CreateBlogPost />

      <div>
        <p>Change avatar</p>
        <img src='/' alt='show current avatar. fetch src url from blog_user table' />
        <form>
          <label htmlFor='img'>Select image:</label>
          <input type='file' id='img' name='img' accept='image/*' />
          <div>
            <button>Save</button>
          </div>
        </form>
        <button>Remove avatar</button>
      </div>

      <div>
        <p>Biography</p>
        <div contentEditable>bio will be here</div>
        <button>Save</button>
      </div>
    </>
  );
}

export default Dashboard;
