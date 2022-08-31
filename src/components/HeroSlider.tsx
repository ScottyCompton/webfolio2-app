import {useAppSelector} from '../hooks/redux-hooks';
import {useState} from 'react';
import useEvent from '../hooks/useEvent';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
import ImgUrl from '../helpers/appImageUrl';

const HeroSlider:React.FC = () => {

    const sliderImgs = useAppSelector(state => state.appData.sliderImgs);   
    const appLoaded = useAppSelector(state => !state.appData.ui.isLoading) 
    const [orientation, setOrientation] = useState(window.innerWidth < window.innerHeight ? 'portrait' : 'landscape');
    const foregroundImg = sliderImgs.filter(img => img.orientation === orientation && img.isForeground === true)
    const slides = sliderImgs.filter(img => img.orientation === orientation && img.isForeground === false).sort((a,b) => b.displayOrder < a.displayOrder ? 1 : -1)


    const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const newVal = w < h ? 'portrait' : 'landscape'
        if(newVal !== orientation) {
            setOrientation(newVal)
        }
    }
    useEvent('resize', handleResize);



    const heroSlider = () => {
        return (
            <div id="heroslider" className="heroslider-container trans-on-resize hide-on-nav">
            <div className={`heroslider-${orientation}`}>
                <div className="heroslider__foreground trans-on-resize" style={{backgroundImage: `url(${foregroundImg[0].sliderImgUrl})`}}></div>
                <div className="heroslider__background trans-on-resize hide-on-resize">
                    <Carousel interval={5000} fade id="heroslider__carousel">
                        {slides.map((slide) => {
                            return (<Carousel.Item key={uuidv4()}>
                                <img src={ImgUrl(slide.sliderImgUrl)} alt="" className="heroslider__carousel-img" />
                            </Carousel.Item>)
                        })}

                    </Carousel>
                </div>
            </div>
        </div>            
        )
    }


    return (
        <section id="hero-slider" className="hero-slider">
            <Container fluid className="m-0 p-0">
                <Row>
                    <Col xs="12">
                        {appLoaded && heroSlider()}
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export default HeroSlider;