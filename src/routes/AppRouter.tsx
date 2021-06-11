
import {Router, Route, Switch} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import PortfolioDetailsPage from '../pages/PortfolioDetailsPage'

import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();


const AppRouter:React.FC = (props) => {
    

    return (
        <Router history={history} >
        <Route render={({location}) => {
            return (
              <TransitionGroup className="RTG">
              <CSSTransition 
                  key={location.key}
                  timeout={1000}
                  classNames="fade"
              >
            <main>
                <div className="page">
                  <Switch location={location}>
                      <Route path="/" exact={true} component={HomePage} />
                      <Route path="/portfolio/:id" component={PortfolioDetailsPage} />
                      <Route component={NotFoundPage} />
                  </Switch>
                </div>
            </main>
              </CSSTransition>
            </TransitionGroup>
            );
          }} /> 
        </Router>)    


}

export default AppRouter;







  