import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './_header.scss';
import { useSelector } from 'react-redux';

const Header = ({ handleToggleSidebar }) => {
  const [inputValue, setInputValue] = useState('');

  const history = useHistory();

  const handleSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search/${inputValue}`);
  };

  const photoURL = useSelector(state => state?.auth?.user?.photoURL);

  return (
    <div className="border border-dark header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={handleToggleSidebar}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="youtube"
        className="header__logo"
      />
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={photoURL} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
