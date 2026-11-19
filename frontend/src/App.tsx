import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Veiculos from './pages/Veiculos';
import Locacoes from './pages/Locacoes';
import Historico from './pages/Historico';
import PrivateRoute from './components/PrivateRoute';
import LoginRoute from './components/LoginRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
                <Route path="/cadastro" element={<LoginRoute><Cadastro /></LoginRoute>} />

                <Route path="/veiculos" element={<PrivateRoute><Veiculos /></PrivateRoute>} />
                <Route path="/locacoes" element={<PrivateRoute><Locacoes /></PrivateRoute>} />
                <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}