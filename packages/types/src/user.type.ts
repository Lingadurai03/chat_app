export interface User {
    id: string;
    email: string;
    fullName: string;
    userName: string;
}

export interface AuthState {
    user: User | null;
}
