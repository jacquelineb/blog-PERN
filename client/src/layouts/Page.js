import React from 'react';
import style from '../styles/Page.module.scss';

function Main({ children }) {
  return <div className={style.Main}>{children}</div>;
}

function Sidebar({ children }) {
  return <div className={style.Sidebar}>{children}</div>;
}

Page.Main = Main;
Page.Sidebar = Sidebar;

function Page({ children }) {
  return <div className={style.Page}>{children}</div>;
}

export default Page;
