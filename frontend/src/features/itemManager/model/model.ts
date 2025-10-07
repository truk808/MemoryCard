interface CreateItemProps {
    mode: 'create'
}

interface EditItemProps<T> {
    mode: 'edit'
    items: T
}

type ItemManagerProps<T> = CreateItemProps | EditItemProps<T>;

export type {ItemManagerProps}