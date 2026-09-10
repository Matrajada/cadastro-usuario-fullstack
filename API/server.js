import express from 'express';
import cors from 'cors';
import { db } from './src/prisma/db.ts';

const app = express();
const PORT = 3000;

app.use(cors()); // Importante para não dar erro de CORS no React
app.use(express.json());

// GET - Listar usuários
// ========================================
// GET - Listar todos os usuários
// ========================================
app.get('/users', async (req, res) => {
    try {
        const users = await db.orm.users.all();
        res.status(200).json(users);
    } catch (error) {
        console.error('🔴 ERRO DETALHADO:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar usuários',
            details: error.message || error 
        });
    }
});

// ========================================
// POST - Criar usuário com validação de email
// ========================================
app.post('/users', async (req, res) => {
    try {
        const { name, age, email } = req.body;

        // 1. Busca se já existe algum usuário com o mesmo e-mail
        const allUsers = await db.orm.users.all();
        const emailExists = allUsers.some(user => user.data?.email === email);

        if (emailExists) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        // 2. Cria o usuário caso o e-mail seja novo
        const newUser = await db.orm.users.create({
            data: { name, age, email }
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error('🔴 ERRO AO CRIAR USUÁRIO:', error);
        return res.status(500).json({ error: 'Erro interno ao cadastrar usuário' });
    }
});

// ========================================
// DELETE - Excluir usuário
// ========================================
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Chama o .where() primeiro e depois o .delete()
        await db.orm.users.where({ _id: id }).delete();

        return res.status(204).send();
    } catch (error) {
        console.error('🔴 ERRO DETALHADO NO DELETE:', error);
        return res.status(500).json({ 
            error: 'Erro interno ao tentar deletar',
            details: error.message || error 
        });
    }
});

app.put('/users/:id', async (req, res) => {
    try{
        const { id } = req.params; //fica na parte do URL
        const { name, age, email } = req.body; //fica no corpo do site

        //Atualiza usando o encadeamento .where() do seu ORM
        await db.orm.users.where({ _id: id }).update({
            data: { name, age, email }
        });
           return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error('🔴 ERRO AO ATUALIZAR:', error);
        return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});