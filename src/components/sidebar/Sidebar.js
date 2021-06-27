import React from 'react';
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md';

import './_sidebar.scss';

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  return (
    <nav className={isSideBarOpen ? 'sidebar open' : 'sidebar'}>
      <li onClick={() => setIsSideBarOpen(false)}>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li onClick={() => setIsSideBarOpen(false)}>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>

      <li onClick={() => setIsSideBarOpen(false)}>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>

      <li onClick={() => setIsSideBarOpen(false)}>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <li onClick={() => setIsSideBarOpen(false)}>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li onClick={() => setIsSideBarOpen(false)}>
        <MdSentimentDissatisfied size={23} />
        <span>I don't Know</span>
      </li>

      <hr />

      <li onClick={() => setIsSideBarOpen(false)}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </nav>
  );
};

export default Sidebar;
