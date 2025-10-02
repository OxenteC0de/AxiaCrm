<p align="center">
<img src="assets/logo01.png" alt="Logo AxiaCRM" width="180"/>
</p>

📊 **AxiaCRM – Sistema de Gestão de Relacionamento com o Cliente**

📖 **Descrição Geral**

O AxiaCRM é um sistema de Customer Relationship Management (Gestão de Relacionamento com o Cliente) desenvolvido para facilitar a organização de contatos, clientes, oportunidades e interações comerciais.

O sistema visa centralizar dados de Clientes, rastrear o ciclo de vida de Oportunidades (negócios/vendas) e garantir maior eficiência e organização para a equipe comercial.

🚀 **Funcionalidades Existentes**

👥 Gestão de Usuários:	Cadastro e autenticação de usuários. Permite a associação do usuário responsável a clientes e oportunidades.

🏢 Gestão de Clientes:	CRUD completo de clientes, com nome, e-mail, telefone e status de contrato. Segmentação e responsabilidade por usuário.

📈 Oportunidade: CRUD de oportunidades de negócio vinculadas a clientes, com rastreamento de título, valor e status.

📝 **Implementações Futuras**

Tarefa (Atividades e Interação): Cadastro de tarefas vinculadas a clientes e usuários. Essencial para garantir organização e rastreabilidade das interações, sendo uma funcionalidade central em sistemas CRM.

🗂️ **Estrutura de Dados (Entidades)**

Usuário:	id, nome, email, senha, foto, cargo.
Cliente:	id, nome, email, telefone, statusContrato	usuario_id.
Oportunidade:	id, título, valor, status, data	cliente_id usuario_id.
Tarefa (Implementação Futura):	id, tipo, descrição, data	cliente_id, usuario_id.

📊 **Diagrama da Entidade**
<img src="assets/diagrama.png" alt="Diagrama de Entidades do AxiaCRM" width="600"/>
</p>

🛠️ **Tecnologias Utilizadas**

Node.js
NestJS (Framework para backend)
TypeORM (Mapeamento Objeto-Relacional)
TypeScript
PostgreSQL (Banco de dados principal, adaptável via TypeORM)
Passport/JWT (para Autenticação e Autorização)

📦 **Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

Git
Node.js (Versão LTS recomendada)
npm ou Yarn
PostgreSQL (Servidor de banco de dados)

⚙️ **Como Rodar o Projeto**

1. Clonar repositório
git clone https://github.com/OxenteC0de/AxiaCrm.git
cd AxiaCRM

2. Instalar as dependências
npm install

3. Configurar o banco de dados

No arquivo app.module.ts, configure suas credenciais:

	TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 3360,
  username: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
  autoLoadEntities: true,
  synchronize: true, // apenas em ambiente de desenvolvimento
}),


4. Rodar o projeto
npm run start:dev

O servidor estará disponível em: 👉 http://localhost:4000

👥 **Equipe Responsável**

David:	Service de Cliente, Service de Entidades e README.
Dilvani:	Controller e Module de Cliente.
Janaina:	Entidade Usuário, configuração do Insomnia e README.
Karine:	Service, Controller e Module de Usuário.
Tauane:	Module de Oportunidade e Scrum Master.
William:	Base do projeto, Entidade, Service e Controller de Oportunidade.
Winnie:	Entidade Cliente e configuração do app.module.ts.