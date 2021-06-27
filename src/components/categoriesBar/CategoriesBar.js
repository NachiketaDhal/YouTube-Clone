import React, { useState } from 'react';
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

  const handleClick = value => {
    setActiveElement(value);
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
