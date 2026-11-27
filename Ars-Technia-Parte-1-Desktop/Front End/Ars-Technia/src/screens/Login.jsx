
import React, { useState } from 'react';

export default function Login({ go, onRoleChange }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // CONTAS DE TESTE
  const CONTAS = [
    {
      email: 'professor@arstechnia.com',
      senha: '123456',
      perfil: 'professor',
    },
    {
      email: 'gestao@arstechnia.com',
      senha: '123456',
      perfil: 'gestao',
    },
  ];

  const entrar = (e) => {
    e.preventDefault();

    const conta = CONTAS.find(
      (usuario) =>
        usuario.email === email.trim().toLowerCase() &&
        usuario.senha === senha
    );

    if (!conta) {
      setErro('E-mail ou senha incorretos.');
      return;
    }

    setErro('');

    if (conta.perfil === 'gestao') {
      onRoleChange(true);
      go('homeManager');
    } else {
      onRoleChange(false);
      go('home');
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-brand">
        <img
          className="auth-brand-desktop"
          src="/assets/LogoComNome.png"
          alt="Ars-Technia"
        />
        <img
          className="auth-brand-mobile"
          src="/assets/LogoArsTechnia.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <form
        className="auth-form"
        onSubmit={entrar}
      >
        <h1>Bem-vindo de volta</h1>

        <p>
          Preencha os dados abaixo para acessar o aplicativo.
        </p>

        <label>
          E-mail

          <input
            type="email"
            required
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Senha

          <input
            type="password"
            required
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>

        {erro && (
          <p className="login-error">
            {erro}
          </p>
        )}

        <div className="auth-links">

          <button
            type="button"
            onClick={() =>
              window.alert(
                'Entre em contato com a administração para redefinir sua senha.'
              )
            }
          >
            Esqueceu a senha?
          </button>

          <span>
            Ainda não tem conta?{' '}
            <b onClick={() => go('cadastroConta')}>
              Cadastre-se
            </b>
          </span>

        </div>

        <button
          type="submit"
          className="auth-submit"
        >
          Entrar
        </button>

      </form>
    </div>
  );
}
