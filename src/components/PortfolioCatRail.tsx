import Slider from 'react-slick';
import {v4 as uuid} from 'uuid';
import PortRailItem from './PortRailItem';
import SliderArrow from './SliderArrow';
import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import {useEffect, useState} from 'react';
import {appDataActions_setRailStates} from '../appData/appDataActions';
import {PortCategoryRailProps, SortablePortfolioItem} from '../interfaces';



const PortfolioCategoryRail:React.FC<PortCategoryRailProps> = ({category_id}) => {
    const appData = useAppSelector(state => state.appData);
    const {portfolio, ui} = appData;
    const {isLoading, railStates} = ui;

    const [initialSlide, setInitialSlide]  = useState(0)
    const dispatch = useAppDispatch();
    let filteredList:SortablePortfolioItem[] = [];


    const setCurrentSlideIndex = (current:number) => {
        const currRailStates = railStates.slice();

        const railStateIdx = currRailStates.findIndex((rail) => {
            return rail._id === category_id
        })

        currRailStates.splice(railStateIdx, 1);
        const updatedRailStates = [...currRailStates, {_id: category_id, currentSlide: current}];
        dispatch(appDataActions_setRailStates(updatedRailStates))
        setInitialSlide(current);   
   
    }


    useEffect(() => {
        if(!isLoading) {
            if(railStates.length !== 0) {
                const thisRailState = railStates.filter((rail) => {
                    return rail._id === category_id
                })
                if(thisRailState && thisRailState.length !== 0) {
                    setInitialSlide(thisRailState[0].currentSlide);    
                }
            } else {
                setInitialSlide(0)
            }
        }
    }, [isLoading, initialSlide, railStates, category_id]) 



    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToScroll: 1,
        centerMode: false,
        initialSlide: initialSlide,
        ladyLoad: true,
        slidesToShow: 5,
        afterChange: (current:number) => setCurrentSlideIndex(current),
        nextArrow: <SliderArrow type='next' />,
        prevArrow: <SliderArrow type='prev' />,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    arrows: false,
                    swipeToSlide: true,
                    centerMode: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    speed: 1000,
                    arrows: false,
                    swipeToSlide: true,
                    centerMode: false
                }
            },

            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    speed: 1500,
                    arrows: true,
                    centerMode: false
                }
            },
            {
                breakpoint: 1900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll:4,
                    speed: 2000,
                    arrows: true,
                    swipeToSlide: false,
                    centerMode: false
                }
            }
        ]
      };    





      const displayCatPortfolo = () => {
        portfolio.filter((item, index) => {
            // I have to do this BS because my CSO (category sort order) array looks like this:
            // cso - [key] - [{_id:laksdjflsj, categoryId: laksdjflasjdf, sortOrder: 3}]
            // and the categoryId cooresponds to the _id of the category in the "categories" collection.
    
            for(let key in Object.keys(item.cso)) {
                let csoItem = item.cso[key];
                if(csoItem.category_id === category_id) {
                    filteredList.push({...item, displayOrder:csoItem.displayOrder})
                    return true;
                }
            }
            return false;
        })
    
        filteredList.sort((a:SortablePortfolioItem, b:SortablePortfolioItem) => {
            const valA = +a.displayOrder;
            const valB = +b.displayOrder;
            if(valA > valB) return 1;
            if(valA < valB) return -1;
            return 0;
        })
    

        if(filteredList.length > 0) {
            return (
                <Slider {...settings}>
                    {filteredList.map((item, slideIdx) => {
                        return (
                            <PortRailItem _id={item._id} slideIndexSetter={setCurrentSlideIndex} slideIdx={slideIdx} key={uuid()} />
                        )
                    })}                
                </Slider>
             );
        } else {
            return <></>
        }    
    }






      if(!isLoading) {
          return (
            displayCatPortfolo()
          )
      } else {
          return (<></>)
      }





}

export default PortfolioCategoryRail;