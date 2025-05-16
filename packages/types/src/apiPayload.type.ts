export interface LoginPayload {
    userNameOrEmail: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    fullName: string;
    userName: string;
    password: string;
}
