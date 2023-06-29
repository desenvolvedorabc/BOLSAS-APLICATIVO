import {
  MdOutlineHome,
  MdOutlineSettings,
  MdOutlineSupervisorAccount,
} from 'react-icons/md';
import { FaRegHandshake } from 'react-icons/fa';
import Log from 'public/assets/images/log.svg';
import Admin from 'public/assets/images/admin.svg';
import Profile from 'public/assets/images/profile.svg';

export const PERFISLINKS = [
  {
    grupo: '',
    items: [
      {
        name: 'Home',
        path: '/',
        ARE_NOME: 'HOME',
        validate: true,
        icon: <MdOutlineHome size={22} />,
      },
    ],
  },
  {
    grupo: 'Gestão de Parceiros',
    ARE_NOME: 'REL',
    items: [
      {
        name: 'Usuários do Estado',
        ARE_NOME: 'USU_EST',
        path: '/usuarios-estado',
        icon: <MdOutlineSupervisorAccount size={22} />,
      },
      {
        name: 'Estados Parceiros',
        ARE_NOME: 'EST_PAR',
        path: '/estados-parceiros',
        icon: <FaRegHandshake size={22} />,
      },
    ],
  },
  {
    ARE_NOME: 'GEST',
    grupo: 'Gestão de Acessos',
    items: [
      {
        name: 'Usuários Admin',
        ARE_NOME: 'USU_ADM',
        path: '/usuarios-admin',
        icon: <Admin size={22} />,
      },
      {
        name: 'Perfis de Usuário',
        ARE_NOME: 'PER_USU',
        path: '/perfis-de-usuario',
        icon: <Profile size={22} />,
      },
      {
        name: 'Minha Conta',
        ARE_NOME: 'MIN_CON',
        path: `/minha-conta`,
        validate: true,
        icon: <MdOutlineSettings size={22} />,
      },
    ],
  },
  {
    ARE_NOME: 'SUP',
    grupo: 'Suporte',
    items: [
      {
        name: 'Logs do Sistema',
        ARE_NOME: 'LOGS',
        path: `/logs`,
        icon: <Log size={22} />,
      },
    ],
  },
];

export const ADMINLINKS = [
  // {
  //   grupo: '',
  //   items: [
  //     {
  //       name: 'Home',
  //       path: '/',
  //       ARE_NOME: 'HOME',
  //       validate: true,
  //       icon: <MdOutlineHome size={22} />,
  //     },
  //   ],
  // },
  {
    grupo: 'Gestão de Parceiros',
    ARE_NOME: 'REL',
    items: [
      {
        name: 'Usuários do Estado',
        ARE_NOME: 'USU_EST',
        path: '/usuarios-estado',
        icon: <MdOutlineSupervisorAccount size={22} />,
      },
      {
        name: 'Estados Parceiros',
        ARE_NOME: 'EST_PAR',
        path: '/estados-parceiros',
        icon: <FaRegHandshake size={22} />,
      },
    ],
  },
  {
    ARE_NOME: 'GEST',
    grupo: 'Gestão de Acessos',
    items: [
      {
        name: 'Usuários Admin',
        ARE_NOME: 'USU_ADM',
        path: '/usuarios-admin',
        icon: <Admin size={22} />,
      },
      {
        name: 'Perfis de Usuário',
        ARE_NOME: 'PER_USU',
        path: '/perfis-de-usuario',
        icon: <Profile size={22} />,
      },
      // {
      //   name: 'Minha Conta',
      //   ARE_NOME: 'MIN_CON',
      //   path: `/minha-conta`,
      //   validate: true,
      //   icon: <MdOutlineSettings size={22} />,
      // },
    ],
  },
  {
    ARE_NOME: 'SUP',
    grupo: 'Suporte',
    items: [
      {
        name: 'Logs do Sistema',
        ARE_NOME: 'LOGS',
        path: `/logs`,
        icon: <Log size={22} />,
      },
    ],
  },
];
