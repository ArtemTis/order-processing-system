
export interface IUser {
    id: number,
    name: string;
    email: string,
    email_verified_at: boolean | null,
}

export type ILoginResponse = {
    user: IUser,
    access_token: string
}

// export interface ILoginResponse {
//     access_token: string | null,
//     // token_type: string | null,
//     user: IUser | null
// }

export interface ILogin {
    email: string;
    password: string
}

export type IRegister = ILogin & {
    name: string,
    password_confirmation: string
}

export interface IClient {
    id: number,
    created_at: string
    name: string
    photo_url: string | null
}

export interface IChatSnippet {
    id: number,
    name: number,
    client_contact: IClient,
    channel: {
        id: number,
        name: string,
        photo_url: string | null
    },
    last_message: {
        id: number,
        text: string,
        from_user_id: {
            id: number,
            name: string
        },
        created_at: string
    } | null,
    created_at: string
}

export interface ICompanyChatsResponse {
    data: IChatSnippet[],
    links: {
        first: string
        last: string
        prev: string | null,
        next: string | null
    }
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            active: boolean
            label: string
            url: string | null
        }[],
        path: string,
        per_page: number,
        to: number,
        total: number,
    }
}

export interface IChatMessages {
    created_at: string,
    from_user_id: {
        id: number,
        name: string
    } | null,
    id: number,
    text: string,
    chat_id: number
}

export interface IMessagesResponse {
    data: IChatMessages[],
    links: {
        first: string,
        last: string,
        next: string,
        prev: null
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            active: boolean
            label: string
            url: string
        }[],
        path: string
        per_page: number
        to: number
        total: number
    }

}

export interface IMessageSendResponse {
    data: [
        {
            id: number,
            text: string,
            from_user_id: number | null,
            created_at: string,
            chat_id: number
        }
    ],
    links: {
        first: string,
        last: string,
        prev: null,
        next: null
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: [
            {
                url: string | null,
                label: string
                active: boolean
            }
        ],
        path: string,
        per_page: number,
        to: number,
        total: number
    }
}

export interface ISendMessage {
    chatId: number,
    text: string
}

export enum EChannelsName {
    VKGroup,
    Telegram,
    Viber,
    WhatsApp
}

export interface IChannel {
    data: {
        id: number,
        name: EChannelsName,
        photo_url: string | null,
        isConnected: 1 | 0
    }[]
}

export interface IAddGroupVk {
    access_key: string,
    group_id: number
}

export enum ReqStatus {
    success,
    reject
}

export interface IAddPattern {
    text: string,
    type_of_message_pattern_id: number
}

export interface ITypePattern {
    id: number,
    name: string
}

export interface IAddPatternResponse {
    data: {
        text: string,
        type_of_message_pattern_id: number,
        updated_at: string,
        created_at: string,
        id: number
    }
}

export interface ITag {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}

export interface IPatterns {
    data: [
        {
            id: number,
            name: string,
            messagePatterns: [
                {
                    id: number,
                    text: string,
                    type_of_message_pattern_id: number,
                    created_at: string,
                    updated_at: string
                }
            ]
        }
    ]
}


export interface IDeal {
    id: number,
    desc: string,
    amount: number,
    status_of_deal_id: {
        id: number,
        name: string,
        desc: string,
        created_at: string,
        updated_at: string
    },
    created_at: string,
    closed_at: string
}

export type IFullDeal = IDeal & {
    contact_id: IClient
}

export interface IStatuseDeal {
    id: number,
    name: string,
    desc: string,
    created_at: string,
    updated_at: string
}

export interface IStatusAdd {
    name: string,
    desc: string
}

export type IDealSend = Pick<IDeal, 'desc' | 'amount'> & {
    status_of_deal_id: number,
    contact_id: number
}

export interface ISendMessage {
    chatId: number,
    text: string
}

export interface ISendMailing {
    chats_id: number[],
    text: string
}

export interface IGetAmountMess {
    date_from:  string,
    date_to: string
}

export interface IChartResponse  {
    date: string,
    count: number,
}

export interface IUniversalChartResponse  {
    date: string,
    deals: number,
    messages: number,
}