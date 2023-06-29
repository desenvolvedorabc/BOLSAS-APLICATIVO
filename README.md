## Conteúdo

* [Descrição do Projeto](#-descrição-do-projeto)
* [Funcionalidades](#-funcionalidades)
* [Como utilizar](#%EF%B8%8F-como-utilizar)
* [Configuração dos arquivos](#-configuração-dos-arquivos)
* [Bibliotecas, Frameworks e Dependências](#%EF%B8%8F-bibliotecas-frameworks-e-depend%C3%AAncias)


## 📖 Descrição do Projeto

O produto PARC tem por principal fundamento de funcionamento um sistema de gestão de bolsas, como importância no auxílio da gestão de bolsas oferecidas pelo estado e na parceira de colaboração no regime de colaboração entre estados e municípios. O software gera conta com módulos de criação de planos de trabalho e criação de relatórios mensais que irão compor a jornada do bolsista. A plataforma conta também com funcionalidades que acompanham os órgãos que apoiam as operações nos estados, e auxilia no processo de emissão de remessas de pagamento. O projeto conta com a entrega de 2 produtos (SITE ADM PARC / SITE DO ESTADO), sendo o SITE DO ESTADO a principal entrega do produto.


## 📱 Funcionalidades

Cadastros de estados parceiros com a possibilidade de customização do painel desse estado.
Cadastro de usuários administradores e usuários representantes de cada estado.
Criação de perfis de acesso para os usuários admins.

## 🛠️ Como utilizar

Necessário ter instalado no computador:
- Node.js
- Yarn


Clonar o projeto entrando no código fonte do repositório e clicando no botão code, utilizando a url disponível no terminal aberto na pasta onde se deseja salvar o projeto


Após clonar, abrir o terminal e acessar a pasta onde está localizado o projeto rodar o código ‘yarn install’ para instalar as configurações e pacotes das dependências utilizadas.

Finalizada a instalação utilizar o comando ‘yarn dev’ para rodar o projeto em ambiente de desenvolvimento ou ‘yarn buid’ depois ‘yarn start’ para rodar como seria em ambiente de produção.

Também é necessário ter o backend rodando e conectado para conseguir utilizar esse programa, para isso clone o repositório disponivel no link ‘https://bitbucket.org/going2-mobile/parc-bolsas-backend/src/master/’ e siga os passos do readme para inicializar, insira também o endereço em que rodará o backend no .env.development seguindo o padrão de variáveis disponível no .env.exemple


## 📁 Configuração dos arquivos


 

















Os arquivos são organizados em pastas:

- Public: Contem as imagens utilizadas no template do sistema e arquivos estáticos disponíveis para download.
- Src: Possui os codigos com os components e funções, disponibilizado da seguinte forma:









          
          
          
          
        - Components: Contem os componentes usados nas páginas, organizados em pastas pela tela em que pertencem ou pela função do componente.
        - Pages: Onde estão os arquivos das páginas, onde no padrão next as urls são geradas utilizando o nome dos arquivos e hierarquia de pastas dentro da pages.
        - Context: Arquivo dos contextos disponibilizando variáveis que podem ser utilizadas em vários arquivos.
        - Lib: Configuração de bibliotecas.
        - Services: arquivos com funções para conexão e comunicação com a API.
        - Shared: estilizações de componentes utilizando styled components que são utilizados em diversos componentes.
        - Utils: Funções e informações de utilidade para uso geral.

- Styles: arquivos de estilo global.
- Temp: pasta de arquivos temporários utilizados no upload.
- .env: arquivo onde fica a rota de conexão com a API.
- .env.development: arquivo com a rota de conexão com a API para o ambiente de desenvolvimento.
- O restante dos arquivos são de configurações do projeto.

## Regras de acessos e Hierarquias

<a href="https://bitbucket.org/going2-mobile/parc-bolsas-frontend/src/develop/PARC-Menus_e_Acessos.xlsx" target="_blank" download>Acessos</a>

<a href="https://bitbucket.org/going2-mobile/parc-bolsas-frontend/src/develop/Guia_de_regras_de_negócios-Hierarquia_de_Acessos.pdf" target="_blank" download>Hierarquia</a>

## ⚙️ Bibliotecas, Frameworks e Dependencias

- React.JS
- Next.JS
- Typescript
- Material-UI
- Material-UI Color
- SVGR
- React Query
- Axios
- Date-fns
- Date-fns-tz
- File-saver
- Bootstrap
- React-bootstrap
- Formidable
- Formik
- Highcharts
- Jszip
- Jwt-decode
- Nookies
- Polished
- React-csv
- React-dom
- React-icons
- React-idle-timer
- React-loading
- React-quill
- React-to-print
- Styled-components
- Webpack
- xlxs
- Yup
- Eslint
