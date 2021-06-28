import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideosByCategory } from '../../redux/actions/videos.action';
import './_categoriesBar.scss';

const keywords = [
  'All',
  'React js',
  'Angular js',
  'Vue js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Anime',
  'Naruto',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Tokyo Ghoul',
  'Games',
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All');

  const dispatch = useDispatch();

  const handleClick = value => {
    setActiveElement(value);
    dispatch(getVideosByCategory(value));
  };

  return (
    <div className="categoriesbar">
      {keywords.map((keyword, i) => (
        <span
          key={i}
          onClick={() => handleClick(keyword)}
          className={activeElement === keyword ? 'active' : ''}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
