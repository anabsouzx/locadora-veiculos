export interface LoginForm {
    email: string;
    senha: string;
}

export interface RegisterForm {
    nome: string;
    email: string;
    senha: string;
}

export interface TokenPayload {
    id: number;
    email: string;
    exp: number;
}