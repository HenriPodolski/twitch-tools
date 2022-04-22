export interface Message {
    user: string;
    message: string;
}

export declare global {
    var messages: Message[]
}