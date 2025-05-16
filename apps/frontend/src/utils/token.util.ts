import Cookies from 'js-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';

const COOKIE_EXPIRES_DAYS = 7; // or 1 for access token, etc

export function saveToken(
    key: string,
    token: string,
    days = COOKIE_EXPIRES_DAYS,
) {
    if (typeof window !== 'undefined') {
        Cookies.set(key, token, {
            expires: days,
            secure: true,
            sameSite: 'lax',
        });
        // secure: true means cookie only sent over HTTPS (adjust based on env)
        // sameSite: 'lax' to prevent CSRF but still allow normal use
    }
}

export function getToken(key: string): string | undefined {
    if (typeof window !== 'undefined') {
        return Cookies.get(key);
    }
    return undefined;
}

export function clearTokens() {
    if (typeof window !== 'undefined') {
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(REFRESH_TOKEN);
    }
}
