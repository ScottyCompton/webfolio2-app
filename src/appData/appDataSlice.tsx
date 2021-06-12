import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataState, RailState, ReturnState} from '../interfaces';

const initialState: AppDataState = {
    portfolio: [],
    categories: [],
    settings: {
        aboutBlurb: '',
        aboutImgUrl: '',
        aboutTitle: '',
        contactEmail: '',
        contactPhone: '',
        facebookId: '',
        githubId: '',
        instagramId: '',
        linkedinUsername: '',
        resumeUrl: '',
        siteTitle: '',
        twitterHandle: '',
        youTubeId: ''
    },
    sliderImgs: [],
    ui: {
        isLoading: true,
        railStates: [],
        returnState: {
            offsetTop: 0,
            returnHome: false
        }
    }
}

const appDataSlice = createSlice({
    name: 'appData',
    initialState: initialState,
    reducers: {

        setAppLoading(state, action: PayloadAction<boolean>) {
            state.ui.isLoading = action.payload;
        },

        loadAppData(state, action: PayloadAction<AppDataState>) {
            state.categories = action.payload.categories;
            state.portfolio = action.payload.portfolio;
            state.settings = action.payload.settings;
            state.sliderImgs = action.payload.sliderImgs;
            state.ui.isLoading = false;
            state.ui.railStates = [];
        },

        setRailStates(state, action:PayloadAction<RailState[]>) {
            state.ui.railStates = action.payload;
        },  

        setReturnState(state, action:PayloadAction<ReturnState>) {
            state.ui.returnState = action.payload;
        },

    }
})

const {actions, reducer} = appDataSlice;

export const {loadAppData, setAppLoading, setRailStates, setReturnState} = actions;
export default reducer;

