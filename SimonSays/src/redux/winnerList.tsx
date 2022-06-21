import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './store';

const WinnerList: React.FC = () => {
  const screenState = useSelector((state: RootState) => state.winnerList);
  return <></>;
};

export default WinnerList;
