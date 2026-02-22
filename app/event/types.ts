export interface SpeakerItem {
    time:string;
    name: string;
    name2?: string;
    title: string;
    itemColor: string;
    description: string;
    posterImageUrl?: string;
}

export interface PerformancesItem {
    time:string;
    name: string;
    name2?: string;
    title: string;
    itemColor: string;
    description: string;
    posterImageUrl?: string;
}


export interface ExperienceWorkshopItem {
    time: string;
    room: string;
    title:string;
    name: string;
    itemColor: string;
    posterImageUrl?: string;
}

export interface ExperienceWorkshopItemPack {
    time: string;
    workshop: ExperienceWorkshopItem[];
}


export interface ProfecionnalWorkshopItem {
    time: string;
    room: string;
    title:string;
    name: string;
    itemColor: string;
    posterImageUrl?: string;
    logoImageUrl?: string;
}

export interface ProfecionnalWorkshopItemPack {
    time: string;
    workshop: ProfecionnalWorkshopItem[];
}

export interface SideHappeningsItem {
    time:string;
    name: string;
    name2?: string;
    title: string;
    itemColor: string;
    description: string;
    posterImageUrl?: string;
    logoImageUrl?: string;
}