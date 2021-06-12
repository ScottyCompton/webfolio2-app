import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import {appDataActions_setReturnState, appDataActions_setAppIsLoading} from '../appData/appDataActions';

const HomePage:React.FC = () => {
    const {offsetTop, returnHome} = useAppSelector(state => state.appData.ui.returnState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(returnHome) {            
            //dispatch(appDataActions_setAppIsLoading(true))
            window.scrollTo(0, offsetTop);

            window.setTimeout(() => {
                dispatch(appDataActions_setReturnState(0, false));
                dispatch(appDataActions_setAppIsLoading(false))
            }, 750)

        }
    },[returnHome, dispatch, offsetTop])

    return (
        <div className="home">
            <HeroSlider />
            <AboutSection />
            <Portfolio />
            <Footer />
        </div>
    )
}

export default HomePage;