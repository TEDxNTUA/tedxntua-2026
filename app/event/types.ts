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
    socials: socialLists;
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
    socials: socialLists;
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
    socials: socialLists;
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
    socials: socialLists;
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
    socials: socialLists;
}

export interface socialLists {
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    mail?: string;
    facebook?: string;
}