export interface SpeakerItem {
    time:string;
    name: string;
    profession: string;
    name2?: string;
    profession2?: string;
    title: string;
    itemColor: string;
    description: string;
    personalDescription: string;
    posterImageUrl?: string;

}

export interface PerformancesItem {
    time:string;
    name: string;
    profession: string;
    name2?: string;
    profession2?: string;
    title: string;
    itemColor: string;
    description: string;
    personalDescription: string;
    posterImageUrl?: string;
}


export interface ExperienceWorkshopItem {
    time: string;
    room: string;
    title:string;
    name: string;
    profession: string;
    name2?: string;
    profession2?: string;
    itemColor: string;
    posterImageUrl?: string;
}

export interface ExperienceWorkshopItemPack {
    time: string;
    workshop: ExperienceWorkshopItem[];
}


export interface ProfessionalWorkshopItem {
    time: string;
    room: string;
    title:string;
    name: string;
    profession: string;
    name2?: string;
    profession2?: string;
    itemColor: string;
    posterImageUrl?: string;
    logoImageUrl?: string;
}

export interface ProfessionalWorkshopItemPack {
    time: string;
    workshop: ProfessionalWorkshopItem[];
}

export interface SideHappeningsItem {
    time:string;
    name: string;
    profession: string;
    name2?: string;
    profession2?: string;
    title: string;
    itemColor: string;
    description: string;
    personalDescription: string;
    posterImageUrl?: string;
}