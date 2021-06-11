import ReactDOM from 'react-dom';
import App from './components/App';
import {appData} from './appData/appData';
import {Provider} from 'react-redux';
import LoadingOverlay from './components/LoadingOverlay';


ReactDOM.render(
  <Provider store={appData}>
    <LoadingOverlay />
    <App />
  </Provider>,
  document.getElementById('root')
);
