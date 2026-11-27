import React from 'react';
export default function CadastroDeConta({ go }) {
  return <div className="auth-page"><div className="auth-brand"><img className="auth-brand-desktop" src="/assets/LogoComNome.png" alt="Ars-Technia" /><img className="auth-brand-mobile" src="/assets/LogoArsTechnia.png" alt="" aria-hidden="true" /></div>
    <form className="auth-form" onSubmit={e => { e.preventDefault(); go('login'); }}>
      <h1>Criar Conta</h1><p>Preencha os dados abaixo para acessar sua conta.</p>
      <label>Nome Completo<input required placeholder="Digite seu nome completo" /></label>
      <label>E-mail<input type="email" required placeholder="Nome@email.com" /></label>
      <label>Senha<input type="password" required placeholder="Crie uma senha" /></label>
      <label className="terms"><input type="checkbox" required /> Li e aceito os termos de uso e a política de privacidade.</label>
      <button className="auth-submit">Criar Conta</button>
      <div className="auth-links center">Já tem uma conta? <b onClick={() => go('login')}>Entrar</b></div>
    </form>
  </div>;
}
