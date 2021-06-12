import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import {useEffect} from 'react';
import {appDataActions_setRailStates} from '../appData/appDataActions';
import {RailState} from '../interfaces';
import PortfolioCatRail from './PortfolioCatRail';


const Portfolio:React.FC = () => {
    const portCats = useAppSelector(state => state.appData.categories);
    const dispatch = useAppDispatch();
    const appLoaded = useAppSelector(state => !state.appData.ui.isLoading);


    useEffect(() => {
        const railStates:RailState[] = [];
        if(appLoaded && portCats.length !== 0) {
            portCats.forEach((cat) => {
                const thisRailIdx = railStates.findIndex((rail) => {
                    return rail._id === cat._id;
                })
                if(thisRailIdx === -1) {
                    railStates.push({
                        _id: cat._id,
                        currentSlide: 0
                    })
                } 
            });
            dispatch(appDataActions_setRailStates(railStates));
        }
    }, [portCats, appLoaded, dispatch])

        return (
            <div>
                <div className="container section-bkg">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <h1 className="text-primary home-section-title">My Past Works</h1>
                            <p className="text-white d-block d-sm-none text-center">Swipe to navigate galleries / click to view details</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text">
                        {
                            portCats.map((cat) => {
                                return (
                                <div className="portfolio-rail" key={uuidv4()}>
                                    <h4 className="portfolio-rail__title">{cat.category}</h4>
                                    <PortfolioCatRail category_id={cat._id} />
                                </div>  
                                )                              
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        );        
}



export default Portfolio;

