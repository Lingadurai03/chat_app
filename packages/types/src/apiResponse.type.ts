import { User } from 'src/user.type';

export interface LoginApiResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
