import React from 'react';
import EditUserDetails from '../components/EditUserDetails';
import Page from '../layouts/Page';
import style from '../styles/Dashboard.module.scss';

function Dashboard() {
  return (
    <Page>
      <Page.Main>
        <div className={style.Dashboard}>
          <h1>Dashboard</h1>
          <div>
            <EditUserDetails />
          </div>
        </div>
      </Page.Main>
    </Page>
  );
}

export default Dashboard;
