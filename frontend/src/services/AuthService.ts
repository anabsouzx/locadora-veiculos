import { api } from '../api/api';
import type { LoginForm, RegisterForm } from '../types/Usuario';

export const AuthService = {
    register: async (dados: RegisterForm) => {
        const resposta = await api.post('/auth/register', dados);
        return resposta.data;
    },
    login: async (credenciais: LoginForm) => {
        const resposta = await api.post('/auth/login', credenciais);
        if (resposta.data.token) {
            localStorage.setItem('token', resposta.data.token);
        }
        return resposta.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};