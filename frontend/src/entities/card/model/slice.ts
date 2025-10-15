import {createSlice} from '@reduxjs/toolkit';

export interface Card {
    id: number;
    user_id: number;
    name: string;
    description: string;
    sentence: string;
    level: number;
    tags: string[];
    create_at: string;
}

interface CardState {
    cards: Card[];
}

const initialState: CardState = {
    cards: [
        {
            id: 1,
            user_id: 1,
            name: 'one',
            description: 'один',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 2,
            user_id: 1,
            name: 'two',
            description: 'два',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 3,
            user_id: 1,
            name: 'three',
            description: 'три',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 4,
            user_id: 1,
            name: 'four',
            description: 'четыре',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 5,
            user_id: 1,
            name: 'five',
            description: 'пять',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 6,
            user_id: 1,
            name: 'six',
            description: 'шесть',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 7,
            user_id: 1,
            name: 'seven',
            description: 'семь',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 8,
            user_id: 1,
            name: 'eight',
            description: 'восемь',
            sentence: '',
            level: 0,
            tags: ['#аглиский', '#числа'],
            create_at: '2022-10-01',
        },
        {
            id: 9,
            user_id: 1,
            name: 'Динамика в физике',
            description: 'раздел механики, изучающий причины механического движения тел, то есть силы, которые вызывают изменение скорости или направления движения. В отличие от кинематики, которая лишь описывает само движение, динамика связывает движение с воздействующими на тело силами, массой, импульсом и энергией. Основа динамики — три закона Ньютона, которые описывают взаимодействие сил и изменение состояния движения тел. ',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика'],
            create_at: '2022-10-01',
        },
        {
            id: 10,
            user_id: 1,
            name: 'Сила',
            description: 'мера взаимодействия тел, вызывающая изменение их скорости или деформацию',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика'],
            create_at: '2022-10-01',
        },
        {
            id: 11,
            user_id: 1,
            name: 'Масса',
            description: 'мера инертности тела, показывающая, насколько трудно изменить его скорость',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика'],
            create_at: '2022-10-01',
        },
        {
            id: 12,
            user_id: 1,
            name: 'Импульс',
            description: 'векторная величина, равная произведению массы тела на его скорость.',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика'],
            create_at: '2022-10-01',
        },
        {
            id: 13,
            user_id: 1,
            name: 'Инерциальная система отсчета (ИСО)',
            description: 'система, в которой тело остается в состоянии покоя или равномерного прямолинейного движения, если на него не действуют силы или сумма сил равна нулю. ',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика'],
            create_at: '2022-10-01',
        },
        {
            id: 14,
            user_id: 1,
            name: 'Закон инерции',
            description: 'В ИСО тело сохраняет состояние покоя или равномерного прямолинейного движения, если на него не действуют внешние силы или сумма сил равна нулю. ',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика', 'закон Ньютона'],
            create_at: '2022-10-01',
        },
        {
            id: 15,
            user_id: 1,
            name: 'Основной закон динамики',
            description: ' Ускорение тела прямо пропорционально равнодействующей всех сил и обратно пропорционально его массе (формула: \\(m\\vec{a}=\\vec{F}\\)). ',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика', 'закон Ньютона'],
            create_at: '2022-10-01',
        },
        {
            id: 16,
            user_id: 1,
            name: 'Закон действия и противодействия',
            description: 'Силы, с которыми тела действуют друг на друга, равны по модулю и противоположны по направлению, а также лежат на одной прямой. ',
            sentence: '',
            level: 0,
            tags: ['#физика', '#динамика', 'закон Ньютона'],
            create_at: '2022-10-01',
        },
        {
            id: 17,
            user_id: 1,
            name: 'тестовая',
            description: 'lore,m',
            sentence: '',
            level: 0,
            tags: ['#тег', '#свег'],
            create_at: '2022-10-01',
        },


    ],
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {},
});

export const {} = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
