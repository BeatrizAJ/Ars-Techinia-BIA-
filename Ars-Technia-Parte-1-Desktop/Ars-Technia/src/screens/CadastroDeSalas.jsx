
import React, { useState, useEffect } from 'react';
import Heading from '../components/Heading.jsx';

export default function CadastroDeSalas({
  onFinish = () => {},
  salaParaEditar = null
}) {
  const [quantidade, setQuantidade] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [arquivoImagem, setArquivoImagem] = useState(null);

  const modoEdicao = salaParaEditar !== null;

  useEffect(() => {
    if (salaParaEditar) {
      setQuantidade(salaParaEditar.quantidade || '');
      setLocal(salaParaEditar.local || '');
      setDescricao(salaParaEditar.descricao || '');
      setImagem(salaParaEditar.imagem || null);
    } else {
      setQuantidade('');
      setLocal('');
      setDescricao('');
      setImagem(null);
      setArquivoImagem(null);
    }
  }, [salaParaEditar]);

  const selecionarImagem = (e) => {
    const arquivo = e.target.files?.[0];

    if (arquivo && arquivo.type.startsWith('image/')) {
      setArquivoImagem(arquivo);

      const novaImagem = URL.createObjectURL(arquivo);
      setImagem(novaImagem);
    }
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    const dadosSala = {
      ...salaParaEditar,
      quantidade,
      local,
      descricao,
      imagem,
      arquivoImagem
    };

    onFinish(dadosSala);
  };

  return (
    <>
      <Heading
        eyebrow="GESTÃO"
        title={modoEdicao ? "Editar Sala" : "Cadastro de Salas"}
        desc={
          modoEdicao
            ? "Altere as informações da sala selecionada."
            : "Cadastre o local e as informações necessárias para as reservas."
        }
      />

      <form
        className="rooms-form"
        onSubmit={enviarFormulario}
      >
        <label>
          Quantidade alunos *
          <input
            required
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Ex: Máx.20"
          />
        </label>

        <label>
          Local / Setor *
          <input
            required
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Sala 02 / Administração"
          />
        </label>

        <label>
          Descrição do Local *
          <textarea
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Local reservado para aulas práticas..."
          />
        </label>

        <label>Imagem</label>

        <input
          id="imagem-sala"
          type="file"
          accept="image/*"
          hidden
          onChange={selecionarImagem}
        />

        <label
          htmlFor="imagem-sala"
          className="upload-placeholder"
        >
          {imagem ? (
            <img
              src={imagem}
              alt="Imagem da sala"
              className="preview-image"
            />
          ) : (
            <span>＋</span>
          )}
        </label>

        <p>Os campos com * são obrigatórios.</p>

        <button className="blue-wide" type="submit">
          {modoEdicao ? 'Salvar alterações' : 'Cadastrar'}
        </button>
      </form>
    </>
  );
}
