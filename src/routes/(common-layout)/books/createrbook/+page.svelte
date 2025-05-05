<script>
  import Card from '$lib/@spk/SpkBasicCard.svelte';
  import Button from '$lib/@spk/uielements/Button/SpkButton.svelte';
  import { Input, Label } from '@sveltestrap/sveltestrap';

  let titulo = '';
  let subtitulo = '';
  let categoria = '';
  let idioma = 'Português (BR)';
  let publico = '';
  let descricao = '';
  let capa = null;
  let coautores = [];
  let novoCoautor = '';

  function adicionarCoautor() {
    if (novoCoautor.trim()) {
      coautores = [...coautores, novoCoautor];
      novoCoautor = '';
    }
  }
</script>

<div class="row">
  <div class="col-md-8">
    <Card headerTitle="Cadastrar Novo Livro">
      <span slot="content">
        <div class="row g-3">
          <div class="col-md-6">
            <Label for="titulo">Título do Livro</Label>
            <Input id="titulo" type="text" bind:value={titulo} />
          </div>
          <div class="col-md-6">
            <Label for="subtitulo">Subtítulo</Label>
            <Input id="subtitulo" type="text" bind:value={subtitulo} />
          </div>
          <div class="col-md-6">
            <Label for="categoria">Categoria</Label>
            <Input id="categoria" type="select" bind:value={categoria}>
              <option disabled selected>Selecione</option>
              <option>Ficção</option>
              <option>Não-ficção</option>
              <option>Técnico</option>
              <option>Autoajuda</option>
            </Input>
          </div>
          <div class="col-md-6">
            <Label for="idioma">Idioma</Label>
            <Input id="idioma" type="select" bind:value={idioma}>
              <option>Português (BR)</option>
              <option>Inglês</option>
              <option>Espanhol</option>
            </Input>
          </div>
          <div class="col-12">
            <Label for="publico">Público-alvo / Objetivo</Label>
            <Input id="publico" type="textarea" rows="2" bind:value={publico} />
          </div>
        </div>
      </span>
    </Card>

    <Card headerTitle="Descrição do Livro" class="mt-4">
      <span slot="content">
        <Label for="descricao">Descrição Geral</Label>
        <Input id="descricao" type="textarea" rows="5" bind:value={descricao} maxlength="2000" />
      </span>
    </Card>
  </div>

  <div class="col-md-4">
    <Card headerTitle="Capa do Livro">
      <span slot="content">
        <input type="file" class="form-control mb-2" accept="image/*" on:change={(e) => capa = e.target.files[0]} />
        {#if capa}
          <img src={URL.createObjectURL(capa)} alt="Preview da capa" class="img-fluid rounded shadow" />
        {/if}
      </span>
    </Card>

    <Card headerTitle="Autores" class="mt-4">
      <span slot="content">
        <p><strong>Autor Principal:</strong> Carlos Viana</p>
        <div class="input-group mb-2">
          <input class="form-control" bind:value={novoCoautor} placeholder="Nome do coautor" />
          <button class="btn btn-outline-primary" on:click={adicionarCoautor}>+</button>
        </div>
        <ul class="ps-3">
          {#each coautores as coautor}
            <li>{coautor}</li>
          {/each}
        </ul>
      </span>
    </Card>

    <div class="d-flex justify-content-between mt-4">
      <Button text="Cancelar" color="outline-danger" />
      <Button text="Salvar Livro" color="primary" />
      <Button text="Salvar e Continuar" color="success" />
    </div>
  </div>
</div>
