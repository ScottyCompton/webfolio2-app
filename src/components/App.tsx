import {appDataActions_loadAppData} from '../appData/appDataActions';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import AppRouter from '../routes/AppRouter';

const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const appLoaded = useAppSelector(state => !state.appData.ui.isLoading)
  dispatch(appDataActions_loadAppData());

  if(appLoaded) {
    return (
      <AppRouter />
    );
  } else {
      return (<></>)
  }

}

export default App;
