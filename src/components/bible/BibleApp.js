import React, { useState, useEffect } from 'react';
import Menu from 'components/bible/navigation/Menu';
import Verses from 'components/bible/Verses';

const BibleApp = () => {

  // bible data
  const [bible, setBible] = useState({});
  const [currentTranslation, setCurrentTranslation] = useState('kjv');

  const [verses, setVerses] = useState([]);
  
  useEffect(() => {
    fetch('/bibles/' + currentTranslation + '.json')
      .then((response) => response.json())
      .then((data) => {
        setBible(data);
      })
      .catch((error) => console.error('Error loading Bible:', error));
  }, [currentTranslation]);  

  return (
    <div>
        <Menu bible={bible} setVerses={setVerses} verses={verses} />
        <Verses verses={verses} />
    </div>
  );
};

export default BibleApp;
