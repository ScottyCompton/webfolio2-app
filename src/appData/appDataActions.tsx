import getDBData  from '../helpers/handleHttp';
import getStaticData from '../fixtures/staticData';
import {setAppLoading, loadAppData, setRailStates, setReturnState} from './appDataSlice';
import {RailState} from '../interfaces';

export const appDataActions_loadAppData = () => {
    const getData = process.env.REACT_APP_USE_STATIC_DATA === 'true' ? getStaticData : getDBData;

    return async (dispatch: any) => {
        try {
            setAppLoading(true)
            // the resource is an empty string b/c I just load all the app data, so no
            // there is not an explicit endpoint to pass in
            getData('').then((payload:any) => {
                dispatch(loadAppData(payload))
            }).then(() => {
                setAppLoading(false);
            })

        } catch (error) {
            setAppLoading(false)
        }

    }    
}

export const appDataActions_setRailStates = (payload: RailState[]) => {
    return async (dispatch: any) => {
        try {
            dispatch(setRailStates(payload));
        } catch(error) {
            console.log(error);
        }
    }
}


export const appDataActions_setReturnState = (offsetTop: number, returnHome: boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch(setReturnState({
                offsetTop,
                returnHome
            }))
        } catch (error) {
            console.log(error);
        }
    }
}


export const appDataActions_setAppIsLoading = (payload: boolean)  => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoading(payload));
        } catch(error) {
            console.log(error);
        }
    }    
}