import {useAppSelector} from '../hooks/redux-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAt, faMobileAlt} from '@fortawesome/free-solid-svg-icons'



const AboutSection:React.FC = () => {
    const settings =  useAppSelector(state => state.appData.settings);
    const appLoaded = useAppSelector(state => !state.appData.ui.isLoading);

    const {aboutBlurb, 
        aboutImgUrl, 
        aboutTitle, 
        contactEmail, 
        resumeUrl,
        contactPhone, 
        } = settings

        if(appLoaded) {
            return (
                <section id="about-section" className="about-section">
                <div className="hide-on-nav">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="are-you-hiring text-center hide-on-nav">
                                        <div><b>Are you hiring? </b> Because I'm looking.  <a href={resumeUrl} target="_blank" rel="noreferrer">Click here to download a copy of my resume.</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="about-section__about">
                                <div className="row section-bkg">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <h1 className="text-primary home-section-title">{aboutTitle}</h1>                
                                    </div>
                                    <div className="row about-xs">
                                        <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                                            <div className="about-blurb">
                                                <div className="about-img d-block d-sm-none">
                                                    <img src={aboutImgUrl} alt="" />
                                                </div>
                                                {aboutBlurb.split('\n').map((item, idx) => {
                                                    return (
                                                        <span key={idx}>
                                                            {item}
                                                            <br />
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                            <div className="about-contact">
                                                <div className="about-contact-block"><FontAwesomeIcon icon={faAt} className="text-primary"></FontAwesomeIcon><span>{contactEmail}</span></div>
                                                <div className="about-contact-block"><FontAwesomeIcon icon={faMobileAlt} className="text-primary"></FontAwesomeIcon><span>{contactPhone}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 d-none d-sm-block">
                                            <div className="about-img">
                                                <img src={aboutImgUrl} alt="" />
                                            </div>
                                        </div>
        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>                                                
            )
        } else {
            return (<></>)
        }
        
}

export default AboutSection;