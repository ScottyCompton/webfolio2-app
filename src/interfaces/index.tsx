export interface PortCategoryRailProps {
    category_id: string;
}



export interface PortfolioAuxImg {
    _id?: string | null | undefined;
    auxImgUrl?: string;
}

export interface CatSortOrder {
    _id?: string;
    displayOrder: number;
    category_id: string;
}

export interface SliderImg {
    _id: string;
    isForeground: boolean;
    orientation: 'landscape' | 'portrait';
    displayOrder: number;
    sliderImgUrl: string;
}

export interface PortfolioItem {
    _id: string;
    published: boolean;
    auxImgs: PortfolioAuxImg[];
    githubUrl: string;
    longDesc: string;
    shortDesc: string;
    projectTitle: string;
    projectUrl: string;
    techSpecs: string;
    previewImgUrl: string;
    cso: CatSortOrder[];
    auxImgAspectRatio: string | null;
}

export interface SortablePortfolioItem extends PortfolioItem {
    displayOrder: number;
}


export interface PortfolioCategory {
    _id: string;
    category: string;
    displayOrder: number;
}

export interface AppSettings {
    _id?: string;
    aboutBlurb: string;
    aboutImgUrl: string;
    aboutTitle: string;
    contactEmail: string;
    contactPhone: string;
    facebookId: string;
    githubId: string;
    instagramId: string;
    linkedinUsername: string;
    skypeId: string;
    resumeUrl: string;
    siteTitle: string;
    twitterHandle: string;
    youTubeId: string;
}


export interface RailState {
    _id: string;
    currentSlide: number
}

export interface ReturnState {
    offsetTop: number;
    returnHome: boolean;
}

export interface AppUIState {
    isLoading: boolean;
    railStates: RailState[];
    returnState: ReturnState;
}



export interface AppDataState {
    portfolio: PortfolioItem[];
    categories: PortfolioCategory[];
    settings: AppSettings;
    sliderImgs: SliderImg[];
    ui: AppUIState;
}


export interface ImageWithPreloaderProps {
    src: string;
    style?: string;
    className?: string;
    duration?: string;
}


export interface SliderArrowProps {
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): () => void;
    type?: string;
    className?: string;
}


export interface PortRailItemProps {
    _id: string;
    slideIdx: number;
    slideIndexSetter: (current: number) => void
}

export interface PortfolioItemDetailsProps {
    location: any;
}


