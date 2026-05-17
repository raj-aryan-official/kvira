import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setNetworkStatus } from '../store/networkSlice';
// Mocking NetInfo as it might not be installed, using a standard approach
// import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.network);

  useEffect(() => {
    /*
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
      }));
    });
    return () => unsubscribe();
    */
  }, []);

  return state;
};
