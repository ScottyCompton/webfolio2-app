import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';



const HomePage:React.FC = () => {
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