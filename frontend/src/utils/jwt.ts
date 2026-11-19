import type { TokenPayload } from '../types/Usuario';

export function getUsuarioLogado(): TokenPayload | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload: TokenPayload = JSON.parse(payloadJson);

        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return null;
        }

        return payload;
    } catch {
        localStorage.removeItem('token');
        return null;
    }
}

export function isAuthenticated(): boolean {
    return getUsuarioLogado() !== null;
}