export type MessageType = {
    content: string,
    date_created: string,
    files: any,
    id: number,
    user: string,
    user_id: number,
    photo: string | null
}

export type NotificationType = {
    date_created: string,
    id: number,
    is_viewed: boolean,
    object_id?: number
    section: string
    text: string
}