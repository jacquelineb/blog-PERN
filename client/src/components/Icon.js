import React from 'react';

const ICONS = {
  create: (
    <>
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M8 20l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z'></path>
      <path d='M13.5 6.5l4 4'></path>
      <path d='M16 18h4m-2 -2v4'></path>
    </>
  ),
  edit: (
    <>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
      <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
      <line x1='16' y1='5' x2='19' y2='8' />
    </>
  ),
  delete: (
    <>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 7h16' />
      <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
      <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
      <path d='M10 12l4 4m0 -4l-4 4' />
    </>
  ),
  chevronDown: (
    <>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <polyline points='6 9 12 15 18 9' />
    </>
  ),
};

function Icon({ name, size }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ verticalAlign: 'middle' }}
    >
      {ICONS[name]}
    </svg>
  );
}

//https://tablericons.com/
export default Icon;
