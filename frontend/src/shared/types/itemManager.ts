export type ManagerMode = 'create' | 'edit';

export interface BaseManagerProps<T> {
    mode: ManagerMode;
    item?: T;
    isOpen?: boolean;
    closeModal: () => void;
}
