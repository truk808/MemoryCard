import {createSlice} from '@reduxjs/toolkit';

export interface Group {
    id: number;
    user_id: number;
    name: string;
    img: any,
    module_quantity: number;
    description: string;
    create_at: string;
}

interface GroupState {
    groups: Group[];
}

const photo = '/cat.png'

const initialState: GroupState = {
    groups: [
        {
            id: 1,
            user_id: 1,
            name: 'Физика',
            img: photo,
            module_quantity: 5,
            description: 'область естествознания: фундаментальная наука о наиболее общих законах природы, о материи, её структуре, движении и правилах трансформации. Понятия физики и её законы лежат в основе всего естествознания. Является точной наукой.',
            create_at: '2022-03-01',
        },
        {
            id: 2,
            user_id: 1,
            name: 'English',
            img: photo,
            module_quantity: 2,
            description: 'язык англо-фризской подгруппы западной группы германской ветви индоевропейской языковой семьи. Английский язык — важнейший международный язык[6], что является следствием колониальной политики Британской империи в XIX и первой половине XX века, а также мирового влияния Соединённых Штатов Америки в XX—XXI веках[7]. Является одним из наиболее распространённых языков в мире. Существует значительное разнообразие диалектов и говоров английского языка.',
            create_at: '2022-03-01',
        },
        {
            id: 3,
            user_id: 1,
            name: 'История',
            img: photo,
            module_quantity: 0,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 4,
            user_id: 1,
            name: 'Химия',
            img: photo,
            module_quantity: 0,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 5,
            user_id: 1,
            name: 'ГИБДД',
            img: photo,
            module_quantity: 0,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 6,
            user_id: 1,
            name: 'Unity',
            img: photo,
            module_quantity: 0,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 7,
            user_id: 1,
            name: 'Футбол',
            img: photo,
            module_quantity: 0,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
    ],
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        addGroup(state, action) {
            state.groups.push(action.payload);
        },
        changeGroup(state, action) {
            const index = state.groups.findIndex(g => g.id === action.payload.id);
            if (index !== -1) {
                state.groups[index] = action.payload;
            }
        },
        removeGroup(state, action) {
            state.groups = state.groups.filter((group) => group.id !== action.payload);
        }
    },
});

export const {addGroup, changeGroup, removeGroup} = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
