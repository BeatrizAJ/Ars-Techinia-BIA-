
import React, { useEffect, useState } from 'react';
import Shell from './components/Shell.jsx';

import Agendamento from './screens/Agendamento.jsx';
import CadastroDeConta from './screens/CadastroDeConta.jsx';
import CadastroDeSalas from './screens/CadastroDeSalas.jsx';
import DetalhesdoLocal from './screens/DetalhesdoLocal.jsx';
import EditarPerfil from './screens/EditarPerfil.jsx';
import Login from './screens/Login.jsx';
import Perfil from './screens/Perfil.jsx';
import PerfilGestao from './screens/PerfilGestao.jsx';
import Solicitacao from './screens/Solicitacao.jsx';
import SolicitacaoGESTAO from './screens/SolicitacaoGESTAO.jsx';
import TelaInicial from './screens/TelaInicial.jsx';
import TelaInicialGESTAO from './screens/TelaInicialGESTAO.jsx';
import VerificacaoAgendamento from './screens/VerificacaoAgendamento.jsx';

const MANAGER_ROUTES = [
  'homeManager',
  'solicitacaoGestao',
  'managerNotifications',
  'managerProfile',
  'cadastroSalas',
  'rooms',
];

const PROFESSOR_ROUTES = [
  'home',
  'solicitacao',
  'notifications',
  'agendamento',
  'booking',
];

const SALAS_INICIAIS = [
  {
    nome: 'Sala 14',
    local: 'Segundo andar',
    status: 'Reservada',
    classe: 'status-reservada',
    quantidade: '',
    descricao: '',
    imagem: null,
  },
  {
    nome: 'Sala 08',
    local: 'Primeiro andar',
    status: 'Aberta',
    classe: 'status-aberta',
    quantidade: '',
    descricao: '',
    imagem: null,
  },
  {
    nome: 'Laboratório de Informática',
    local: 'Bloco A',
    status: 'Aberta',
    classe: 'status-aberta',
    quantidade: '',
    descricao: '',
    imagem: null,
  },
  {
    nome: 'Sala 05',
    local: 'Segundo andar',
    status: 'Em manutenção',
    classe: 'status-manutencao',
    quantidade: '',
    descricao: '',
    imagem: null,
  },
  {
    nome: 'Sala 12',
    local: 'Primeiro andar',
    status: 'Fechada',
    classe: 'status-fechada',
    quantidade: '',
    descricao: '',
    imagem: null,
  },
  {
    nome: 'Sala 03',
    local: 'Bloco B',
    status: 'Aberta',
    classe: 'status-aberta',
    quantidade: '',
    descricao: '',
    imagem: null,
  },
];

function getRouteInfo() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [route, query = ''] = hash.split('?');
  const params = new URLSearchParams(query);
  const editar = params.get('editar');

  return {
    page: route || 'login',
    editingIndex:
      editar !== null && Number.isInteger(Number(editar))
        ? Number(editar)
        : null,
  };
}

function getCurrentPage() {
  return getRouteInfo().page;
}

function getInitialRole() {
  const route = getCurrentPage();

  if (MANAGER_ROUTES.includes(route)) return true;
  if (PROFESSOR_ROUTES.includes(route)) return false;

  return sessionStorage.getItem('ars-role') === 'gestao';
}

function getSavedPhotos() {
  return {
    professor: localStorage.getItem('ars-profile-photo-professor') || '',
    gestao: localStorage.getItem('ars-profile-photo-gestao') || '',
  };
}

export default function App() {
  const [page, setPage] = useState(getCurrentPage);
  const [manager, setManager] = useState(getInitialRole);
  const [decision, setDecision] = useState('Aguardando análise');
  const [selectedRequest, setSelectedRequest] = useState(0);

  const [profilePhotos, setProfilePhotos] = useState(getSavedPhotos);

  // Lista centralizada de salas
  const [salas, setSalas] = useState(SALAS_INICIAIS);

  // Índice da sala que está sendo editada
  const [editingRoomIndex, setEditingRoomIndex] = useState(
    () => getRouteInfo().editingIndex
  );

  const profilePhoto = manager
    ? profilePhotos.gestao
    : profilePhotos.professor;

  const go = (nextPage) => {
    const [route, query = ''] = nextPage.split('?');
    const params = new URLSearchParams(query);
    const editar = params.get('editar');

    setPage(route);

    setEditingRoomIndex(
      editar !== null && Number.isInteger(Number(editar))
        ? Number(editar)
        : null
    );

    window.location.hash = `/${nextPage}`;
  };

  const changeRole = (isManager) => {
    setManager(isManager);

    sessionStorage.setItem(
      'ars-role',
      isManager ? 'gestao' : 'professor'
    );
  };

  const saveProfilePhoto = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Selecione um arquivo de imagem.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const photo = reader.result;
      const accountType = manager ? 'gestao' : 'professor';
      const storageKey = `ars-profile-photo-${accountType}`;

      localStorage.setItem(storageKey, photo);

      setProfilePhotos((previous) => ({
        ...previous,
        [accountType]: photo,
      }));
    };

    reader.readAsDataURL(file);
  };

  // Atualiza a tela quando a rota muda
  useEffect(() => {
    const syncPage = () => {
      const routeInfo = getRouteInfo();
      const nextPage = routeInfo.page;

      setPage(nextPage);
      setEditingRoomIndex(routeInfo.editingIndex);

      if (MANAGER_ROUTES.includes(nextPage)) {
        changeRole(true);
      } else if (PROFESSOR_ROUTES.includes(nextPage)) {
        changeRole(false);
      }
    };

    window.addEventListener('hashchange', syncPage);

    return () => {
      window.removeEventListener('hashchange', syncPage);
    };
  }, []);

  const finish = (message) => {
    window.alert(message);
    go(manager ? 'homeManager' : 'home');
  };

  // Cadastra uma sala ou atualiza a sala selecionada
  const salvarSala = (dadosSala) => {
    if (editingRoomIndex !== null) {
      setSalas((anteriores) =>
        anteriores.map((sala, index) =>
          index === editingRoomIndex
            ? {
                ...sala,
                ...dadosSala,
                nome: dadosSala.nome || dadosSala.local || sala.nome,
                local: dadosSala.local,
              }
            : sala
        )
      );

      window.alert('Sala atualizada com sucesso!');
    } else {
      const novaSala = {
        ...dadosSala,
        nome: dadosSala.nome || dadosSala.local,
        status: 'Aberta',
        classe: 'status-aberta',
      };

      setSalas((anteriores) => [...anteriores, novaSala]);

      window.alert('Sala cadastrada com sucesso!');
    }

    go('homeManager');
  };

  const openVerification = (index = 0) => {
    setSelectedRequest(index);
    go('verificacao');
  };

  const decide = (result) => {
    setDecision(result);
    window.alert(`Solicitação ${result.toLowerCase()}!`);
    go('solicitacaoGestao');
  };

  if (page === 'login') {
    return (
      <Login
        go={go}
        onRoleChange={changeRole}
      />
    );
  }

  if (page === 'cadastroConta' || page === 'signup') {
    return <CadastroDeConta go={go} />;
  }

  if (page === 'agendamento' || page === 'booking') {
    return (
      <div className="booking-background">
        <Agendamento
          go={go}
          onBack={() => go(manager ? 'homeManager' : 'home')}
          onFinish={() =>
            finish('Solicitação cadastrada com sucesso!')
          }
        />
      </div>
    );
  }

  let content;

  switch (page) {
    case 'home':
    case 'homeManager':
      content = manager ? (
        <TelaInicialGESTAO
          go={go}
          salas={salas}
        />
      ) : (
        <TelaInicial go={go} />
      );
      break;

    case 'detalhes':
    case 'details':
      content = <DetalhesdoLocal go={go} />;
      break;

    case 'cadastroSalas':
    case 'rooms': {
      const salaParaEditar =
        editingRoomIndex !== null
          ? salas[editingRoomIndex] || null
          : null;

      content = (
        <CadastroDeSalas
          go={go}
          salaParaEditar={salaParaEditar}
          onFinish={salvarSala}
        />
      );
      break;
    }

    case 'editarPerfil':
    case 'edit':
      content = (
        <EditarPerfil
          go={go}
          manager={manager}
          profilePhoto={profilePhoto}
          onPhotoChange={saveProfilePhoto}
        />
      );
      break;

    case 'profile':
    case 'managerProfile':
      content = manager ? (
        <PerfilGestao
          go={go}
          profilePhoto={profilePhoto}
        />
      ) : (
        <Perfil
          go={go}
          profilePhoto={profilePhoto}
        />
      );
      break;

    case 'solicitacao':
    case 'notifications':
      content = (
        <Solicitacao
          go={go}
          decision={decision}
          onDetails={openVerification}
        />
      );
      break;

    case 'solicitacaoGestao':
    case 'managerNotifications':
      content = (
        <SolicitacaoGESTAO
          go={go}
          onDetails={openVerification}
        />
      );
      break;

    case 'verificacao':
      content = (
        <VerificacaoAgendamento
          go={go}
          requestIndex={selectedRequest}
          onDecision={decide}
        />
      );
      break;

    default:
      content = manager ? (
        <TelaInicialGESTAO
          go={go}
          salas={salas}
        />
      ) : (
        <TelaInicial go={go} />
      );
  }

  return (
    <Shell
      go={go}
      page={page}
      manager={manager}
      profilePhoto={profilePhoto}
    >
      {content}
    </Shell>
  );
}
