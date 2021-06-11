import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataState, RailState} from '../interfaces';

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
        returnOffsetTop: 0

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
        setReturnOffsetTop(state, action:PayloadAction<number>) {
            state.ui.returnOffsetTop = action.payload;
        }

    }
})

const {actions, reducer} = appDataSlice;

export const {loadAppData, setAppLoading, setRailStates, setReturnOffsetTop} = actions;
export default reducer;

