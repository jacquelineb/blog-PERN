import React from 'react';
import style from './Landing.module.scss';

function Landing() {
  return (
    <div className={style.Landing}>
      <h1>Welcome</h1>
      <div className={style.description}>
        <p>
          This is a blog application I created to learn full-stack web development. It's built
          using the PERN stack (PostgreSQL, Express, React, and Node.js)
        </p>
        <p>
          You can view the source code on GitHub @{' '}
          <a
            href='https://github.com/jacquelineb/pern-stack-blog'
            target='_blank'
            rel='noreferrer'
          >
            https://github.com/jacquelineb/pern-stack-blog
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Landing;
