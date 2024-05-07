
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