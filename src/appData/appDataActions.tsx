import { getData } from '../helpers/handleHttp';
import {setAppLoading, loadAppData, setRailStates, setReturnState} from './appDataSlice';
import {RailState} from '../interfaces';

export const appDataActions_loadAppData = () => {

    return async (dispatch: any) => {
        try {
            setAppLoading(true)
            getData('appdata').then((payload) => {
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