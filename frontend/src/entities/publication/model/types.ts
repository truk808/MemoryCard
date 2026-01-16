export type Status = 'draft' | 'published' | 'archived'
export type EntityType = 'group' | 'module'

export interface Publication {
    id: number;
    entityType: EntityType,
    entityId: number,
    authorUserId: number,
    status: Status,
    downloadCount: number,
    name: string ,
    description: string  ,
    img: File | null,
    userId: number,
}