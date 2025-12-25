export interface Group {
    id: number;
    name: string;
    description: string;
    img: string | null;
    user_id: number;
}

export interface Module {
    id: number;
    name: string;
    icon: string | null;
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
    group_id: number;
    module_id: number;
}

export interface ModuleCard extends Record<string, number> {
    id: number;
    module_id: number;
    card_id: number;
}

export interface CardTag extends Record<string, number> {
    id: number;
    card_id: number;
    tag_id: number;
}

export interface Tag {
    id: number;
    name: string;
}
