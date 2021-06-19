import React from 'react'

const Footer:React.FC = () => {

    return (
        <div className="container">
            <div className="row no-padding">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text no-padding">
                    <footer>
                        <div className="app-footer text-center">
                            <span className="text-primary">That's all, folks...</span>
                            <br /><br />
                            Scott C. Lonis, a.k.a. Scotty Compton<br />
                            Dallas, Texas and currently Quepos, Costa Rica<br/>
                            011-506-6477-7183 (phone/text) | (214) 613-3879 (Skype phone)<br />
                            scott.lonis@outlook.com

                        </div>
                        
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Footer;