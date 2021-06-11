import { getData } from '../helpers/handleHttp';
import {setAppLoading, loadAppData, setRailStates, setReturnOffsetTop} from './appDataSlice';
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


export const appDataActions_setReturnOffsetTop = (payload: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(setReturnOffsetTop(payload))
        } catch (error) {
            console.log(error);
        }
    }
}