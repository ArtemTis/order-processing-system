
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

export interface IRegister {

}

export interface IChatSnippen {
    id: number,
    name: number,
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
    data: IChatSnippen[],
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
    created_at: string
    from_user_id: {
        id: number,
        name: string
    }
    id: number
    text: string
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