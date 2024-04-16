import { useState } from 'react';

const useRepositories = () => {
  const [label, setLabel] = useState('Latest');
  const [option, setOption] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });

  const onChange = (value) => {
    setLabel(value);

    switch (value) {
      case 'Latest':
        setOption({
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
        });
        break;
      case 'Highest rated':
        setOption({
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
        });
        break;
      case 'Lowest rated':
        setOption({
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
        });
        break;
    }
  };

  return { option, label, onChange };
};

export default useRepositories;
