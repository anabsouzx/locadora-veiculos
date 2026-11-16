const prisma = require('../databases/prisma');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const register = async (dados) => {
    const { nome, email, senha } = dados;
    const emailExiste = await prisma.usuario.findUnique({ where: { email } });
    if (emailExiste) throw new Error("Email já cadastrado");

    const hash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
        data: { nome, email, senha: hash }
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
};

const login = async (email, senha) => {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new Error("Credenciais inválidas");

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error("Credenciais inválidas");

    const token = generateToken({ id: usuario.id, email: usuario.email });
    return { token };
};

module.exports = { register, login };