
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

const PERFIS_INICIAIS = {
  professor: {
    nome: 'Alexia Vitória',
    email: 'Alexia@gmail.com',
    foto: '',
  },
  gestao: {
    nome: 'Juscelino',
    email: 'jussaADM@gmail.com',
    foto: '',
  },
};

function getSavedProfiles() {
  try {
    const saved = localStorage.getItem('ars-user-profiles');

    if (saved) {
      const parsed = JSON.parse(saved);

      return {
        professor: {
          ...PERFIS_INICIAIS.professor,
          ...parsed.professor,
        },
        gestao: {
          ...PERFIS_INICIAIS.gestao,
          ...parsed.gestao,
        },
      };
    }
  } catch (error) {
    console.error('Erro ao carregar os perfis:', error);
  }

  return PERFIS_INICIAIS;
}

function getSavedRoom() {
  try {
    const saved = sessionStorage.getItem('ars-selected-room');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Erro ao recuperar a sala selecionada:', error);
    return null;
  }
}

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
  return sessionStorage.getItem('ars-role') === 'gestao';
}

export default function App() {
  const [page, setPage] = useState(getCurrentPage);
  const [manager, setManager] = useState(getInitialRole);

  const [decision, setDecision] = useState('Aguardando análise');
  const [selectedRequest, setSelectedRequest] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Guarda diretamente os dados da sala selecionada.
  const [selectedRoom, setSelectedRoom] = useState(getSavedRoom);

  const [profiles, setProfiles] = useState(getSavedProfiles);
  const [salas, setSalas] = useState(SALAS_INICIAIS);

  const [editingRoomIndex, setEditingRoomIndex] = useState(
    () => getRouteInfo().editingIndex
  );

  const accountType = manager ? 'gestao' : 'professor';
  const profileData = profiles[accountType];
  const profilePhoto = profileData.foto;

  // Salva os perfis no navegador.
  useEffect(() => {
    localStorage.setItem(
      'ars-user-profiles',
      JSON.stringify(profiles)
    );
  }, [profiles]);

  // Navegação.
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

  // Altera o tipo de usuário.
  const changeRole = (isManager) => {
    setManager(isManager);

    sessionStorage.setItem(
      'ars-role',
      isManager ? 'gestao' : 'professor'
    );
  };

  // Atualiza nome e e-mail do perfil.
  const saveProfile = (dados) => {
    setProfiles((previous) => ({
      ...previous,
      [accountType]: {
        ...previous[accountType],
        nome: dados.nome,
        email: dados.email,
      },
    }));

    window.alert('Dados atualizados com sucesso!');
    go('profile');
  };

  // Atualiza a foto do perfil.
  const saveProfilePhoto = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Selecione um arquivo de imagem.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfiles((previous) => ({
        ...previous,
        [accountType]: {
          ...previous[accountType],
          foto: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  // Sincroniza a rota.
  useEffect(() => {
    const syncPage = () => {
      const routeInfo = getRouteInfo();

      setPage(routeInfo.page);
      setEditingRoomIndex(routeInfo.editingIndex);
    };

    window.addEventListener('hashchange', syncPage);

    return () => {
      window.removeEventListener('hashchange', syncPage);
    };
  }, []);

  // Finaliza uma ação.
  const finish = (message) => {
    window.alert(message);

    setSelectedBooking(null);
    go(manager ? 'homeManager' : 'home');
  };

  // Cadastra ou edita uma sala.
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

  // Abre os detalhes guardando o objeto completo da sala.
  const openRoomDetails = (sala) => {
    if (!sala || typeof sala !== 'object') {
      window.alert('Não foi possível encontrar os dados desta sala.');
      return;
    }

    setSelectedRoom(sala);

    sessionStorage.setItem(
      'ars-selected-room',
      JSON.stringify(sala)
    );

    go('detalhes');
  };

  // Abre um agendamento.
  const openProfessorBooking = (booking) => {
    setSelectedBooking(booking);
    go('agendamento');
  };

  // Abre a verificação de uma solicitação.
  const openManagerVerification = (index = 0) => {
    setSelectedRequest(index);
    go('verificacao');
  };

  // Decide uma solicitação.
  const decide = (result) => {
    setDecision(result);

    window.alert(`Solicitação ${result.toLowerCase()}!`);

    go('solicitacaoGestao');
  };

  // Login.
  if (page === 'login') {
    return (
      <Login
        go={go}
        onRoleChange={changeRole}
      />
    );
  }

  // Cadastro de conta.
  if (page === 'cadastroConta' || page === 'signup') {
    return <CadastroDeConta go={go} />;
  }

  // Agendamento.
  if (page === 'agendamento' || page === 'booking') {
    return (
      <div className="booking-background">
        <Agendamento
          initialData={selectedBooking}
          profileData={profileData}
          onBack={() => {
            if (selectedBooking?.tipo === 'novo') {
              setSelectedBooking(null);
              go('detalhes');
            } else if (selectedBooking) {
              setSelectedBooking(null);
              go('solicitacao');
            } else {
              go(manager ? 'homeManager' : 'home');
            }
          }}
          onFinish={(dados) => {
            console.log('Dados da solicitação:', dados);
            finish('Solicitação cadastrada com sucesso!');
          }}
        />
      </div>
    );
  }

  let content;

  switch (page) {
    // Tela inicial.
    case 'home':
    case 'homeManager':
      content = manager ? (
        <TelaInicialGESTAO
          go={go}
          salas={salas}
          onSelectRoom={openRoomDetails}
          profileData={profileData}
        />
      ) : (
        <TelaInicial
          go={go}
          profileData={profileData}
          salas={salas}
          onSelectRoom={openRoomDetails}
        />
      );
      break;

    // Detalhes da sala.
    case 'detalhes':
    case 'details':
      content = (
        <DetalhesdoLocal
          go={go}
          sala={selectedRoom}
          onRequest={
            !manager
              ? () => {
                setSelectedBooking({
                  tipo: 'novo',
                  sala: selectedRoom,
                });

                go('agendamento');
              }
              : undefined
          }
        />
      );
      break; k;

    // Cadastro de salas.
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

    // Edição de perfil.
    case 'editarPerfil':
    case 'edit':
      content = (
        <EditarPerfil
          go={go}
          manager={manager}
          profileData={profileData}
          profilePhoto={profilePhoto}
          onPhotoChange={saveProfilePhoto}
          onSave={saveProfile}
        />
      );
      break;

    // Perfil.
    case 'profile':
    case 'managerProfile':
      content = manager ? (
        <PerfilGestao
          go={go}
          profileData={profileData}
          profilePhoto={profilePhoto}
        />
      ) : (
        <Perfil
          go={go}
          profileData={profileData}
          profilePhoto={profilePhoto}
        />
      );
      break;

    // Solicitações do professor.
    case 'solicitacao':
    case 'notifications':
      content = (
        <Solicitacao
          go={go}
          decision={decision}
          onDetails={openProfessorBooking}
          profileData={profileData}
        />
      );
      break;

    // Solicitações da gestão.
    case 'solicitacaoGestao':
    case 'managerNotifications':
      content = (
        <SolicitacaoGESTAO
          go={go}
          onDetails={openManagerVerification}
          profileData={profileData}
        />
      );
      break;

    // Verificação de agendamento.
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
          onSelectRoom={openRoomDetails}
          profileData={profileData}
        />
      ) : (
        <TelaInicial
          go={go}
          profileData={profileData}
        />
      );
  }

  return (
    <Shell
      go={go}
      page={page}
      manager={manager}
      profilePhoto={profilePhoto}
      profileName={profileData.nome}
    >
      {content}
    </Shell>
  );
}
