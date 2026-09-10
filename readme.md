# 🚀 User Management System (Full-Stack CRUD)

Aplicação Full-Stack de gerenciamento de usuários desenvolvida com foco em boas práticas de código, validação de dados e interface moderna e responsiva.

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**
* React.js
* CSS3 (Flexbox & CSS Nesting)
* Lucide React / Ícones customizados

**Backend:**
* Node.js
* Express.js
* Prisma ORM (`@prisma/orm-family-mongo`)
* MongoDB

---

## ✨ Funcionalidades

* **Create:** Cadastro de usuários com validação de formato de e-mail (Regex) e higienização de strings (`.trim()`).
* **Read:** Listagem dinâmica dos cadastros e visualização condicional do ID do usuário.
* **Update:** Edição de cadastros com preservação dos campos não alterados.
* **Delete:** Remoção de registros com confirmação prévia para evitar deleções acidentais.
* **Interface:** Card layout responsivo em tema escuro (Dark Theme) com ações centralizadas.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js instalado (v18+)
* Instância do MongoDB rodando (local ou MongoDB Atlas)

### 1. Clonar o Repositório
```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO