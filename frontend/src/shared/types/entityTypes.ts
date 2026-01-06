export interface Group {
    id: number;
    name: string;
    description: string;
    img: File | null;
    user_id: number;
}

export interface Module {
    id: number;
    name: string;
    icon: string;
    user_id: number;
}

export interface Card {
    id: number;
    term: string;
    meaning: string;
    example_sentence: string;
    level: number;
    user_id: number;
}

export interface GroupModule extends Record<string, number> {
    id: number;
    groupId: number;
    moduleId: number;
}

export interface ModuleCard extends Record<string, number> {
    id: number;
    moduleId: number;
    cardId: number;
}

export interface CardTag extends Record<string, number> {
    id: number;
    cardId: number;
    tagId: number;
}

export interface Tag {
    id: number;
    name: string;
}
