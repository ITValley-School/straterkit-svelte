<script>
  import Card from "$lib/@spk/SpkBasicCard.svelte";
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import Spinner from "$lib/@spk/uielements/spinners/SpkSpinners.svelte";
  import { confirmSwal } from "$lib/components/confirmSwal.js";
  import { post } from "$lib/utils/requestUtils.js";
  import { Label, Toast } from "@sveltestrap/sveltestrap";
  import { userData } from "$lib/store/userStore.js";

  let titulo = "";
  let subtitulo = "";
  let categoria = 0;
  let idioma = 0;
  let publico = "";
  let descricao = "";
  let capa = null;
  let coautores = [];
  let novoCoautor = "";
  let errors = {};
  let isValid = false;
  let fileInput;
  let isLoading = false;
  let toastParams = {
    show: false,
    type: "success",
    message: "",
  };

  function adicionarCoautor() {
    if (novoCoautor.trim()) {
      coautores = [...coautores, novoCoautor];
      novoCoautor = "";
    }
  }

  const validateForm = () => {
    errors = {};
    if (!titulo) errors.titulo = "Título é obrigatório";
    if (!subtitulo) errors.subtitulo = "Subtítulo é obrigatório";
    if (!categoria) errors.categoria = "Categoria é obrigatória";
    if (!idioma) errors.idioma = "Idioma é obrigatório";
    if (!publico) errors.publico = "Público-alvo é obrigatório";
    if (!descricao) errors.descricao = "Descrição é obrigatória";
    if (!capa) errors.capa = "Capa é obrigatória";

    isValid = true;

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      confirmSwal(
        "Are you sure you want to save this book?",
        "",
        "info",
        async () => {
          isLoading = true;
          const formData = new FormData();
          formData.append(
            "info",
            JSON.stringify({
              Title: titulo,
              SubTitle: subtitulo,
              CategoryID: categoria,
              LanguageID: idioma,
              Audience: publico,
              Description: descricao,
              CoAuthors: coautores,
            })
          );
          formData.append("file", capa);

          const [result] = await post(fetch, "/books", formData);

          if (result.book_id) {
            handleClear();
            toastParams = {
              show: true,
              type: "success",
              message: "Book created successfully!",
            };
          } else {
            toastParams = {
              show: true,
              type: "danger",
              message: "Error creating book!",
            };
          }

          isLoading = false;
        }
      );
    }
  };

  const handleClear = () => {
    titulo = "";
    subtitulo = "";
    categoria = 0;
    idioma = 0;
    publico = "";
    descricao = "";
    capa = null;
    coautores = [];
    novoCoautor = "";
    errors = {};
    isValid = false;
    fileInput.value = "";
  };

  const handleCloseToast = () => {
    toastParams.show = false;
  };
</script>

<div class="row">
  <div class={`col-md-8 needs-validation ${isValid ? "was-validated" : ""} `}>
    <Card headerTitle="Cadastrar Novo Livro">
      <span slot="content">
        <div class="row g-3">
          <div class="col-md-6">
            <Label for="titulo">Título do Livro</Label>
            <input
              type="text"
              class="form-control"
              id="titulo"
              bind:value={titulo}
              required
            />
            {#if errors.titulo}
              <div class="invalid-feedback">{errors.titulo}</div>
            {/if}
          </div>
          <div class="col-md-6">
            <Label for="subtitulo">Subtítulo</Label>
            <input
              type="text"
              class="form-control"
              id="subtitulo"
              bind:value={subtitulo}
              required
            />
            {#if errors.subtitulo}
              <div class="invalid-feedback">{errors.subtitulo}</div>
            {/if}
          </div>
          <div class="col-md-6">
            <Label for="categoria">Categoria</Label>
            <select
              class="form-select"
              id="categoria"
              bind:value={categoria}
              required
            >
              <option value={1}>Ficção</option>
              <option value={2}>Não-ficção</option>
              <option value={3}>Técnico</option>
              <option value={4}>Autoajuda</option>
            </select>
            {#if errors.categoria}
              <div class="invalid-feedback">{errors.categoria}</div>
            {/if}
          </div>
          <div class="col-md-6">
            <Label for="idioma">Idioma</Label>
            <select
              class="form-select"
              id="idioma"
              bind:value={idioma}
              required
            >
              <option value={1}>Português (BR)</option>
              <option value={2}>Inglês</option>
              <option value={3}>Espanhol</option>
            </select>
            {#if errors.idioma}
              <div class="invalid-feedback">{errors.idioma}</div>
            {/if}
          </div>
          <div class="col-12">
            <Label for="publico">Público-alvo / Objetivo</Label>
            <textarea
              class="form-control"
              id="publico"
              bind:value={publico}
              rows="2"
              required
            />
            {#if errors.publico}
              <div class="invalid-feedback">{errors.publico}</div>
            {/if}
          </div>
        </div>
      </span>
    </Card>

    <Card headerTitle="Descrição do Livro">
      <span slot="content">
        <Label for="descricao">Descrição Geral</Label>
        <textarea
          class="form-control"
          id="descricao"
          bind:value={descricao}
          rows="5"
          maxlength="2000"
          required
        />
        {#if errors.descricao}
          <div class="invalid-feedback">{errors.descricao}</div>
        {/if}
      </span>
    </Card>
  </div>

  <div class="col-md-4">
    <Card headerTitle="Capa do Livro">
      <span
        slot="content"
        class={`needs-validation ${isValid ? "was-validated" : ""} `}
      >
        <input
          type="file"
          bind:this={fileInput}
          class="form-control mb-2"
          accept="image/*"
          on:change={(e) => (capa = e.target.files[0])}
          required
        />
        {#if errors.capa}
          <div class="invalid-feedback">{errors.capa}</div>
        {/if}
        {#if capa}
          <img
            src={URL.createObjectURL(capa)}
            alt="Preview da capa"
            class="img-fluid rounded shadow"
          />
        {/if}
      </span>
    </Card>

    <Card headerTitle="Autores">
      <span slot="content">
        <p><strong>Autor Principal:</strong> {$userData.fullName}</p>
        <div class="input-group mb-2">
          <input
            class="form-control"
            bind:value={novoCoautor}
            placeholder="Nome do coautor"
          />
          <button class="btn btn-outline-primary" on:click={adicionarCoautor}
            >+</button
          >
        </div>
        <ul class="ps-3">
          {#each coautores as coautor}
            <li>{coautor}</li>
          {/each}
        </ul>
      </span>
    </Card>

    <div class="d-flex justify-content-between mt-4">
      <Button
        text="Cancelar"
        color="outline-danger"
        onclickfunc={handleClear}
        disabled={isLoading}
      />
      <Button color="primary" onclickfunc={handleSubmit} disabled={isLoading}>
        {#if isLoading}
          <Spinner type="border" color="light" size="sm" />
        {/if}
        Salvar Livro
      </Button>
    </div>
  </div>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    {#if toastParams.show}
      <Toast
        id="primaryToast"
        color="primary"
        class={`colored-toast ${toastParams.type === "success" ? "bg-success" : toastParams.type === "warning" ? "bg-warning" : "bg-danger"}-transparent`}
        delay={3000}
        autohide
        aria-atomic="true"
        on:close={() => (toastParams.show = false)}
      >
        <div
          class={`toast-header ${toastParams.type === "success" ? "bg-success" : toastParams.type === "warning" ? "bg-warning" : "bg-danger"} text-fixed-white`}
        >
          <strong class="me-auto"
            >{toastParams.type === "success"
              ? "Success"
              : toastParams.type === "warning"
                ? "Warning"
                : "Error"}</strong
          >
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            on:click={handleCloseToast}
          ></button>
        </div>
        <div class="toast-body">{toastParams.message}</div>
      </Toast>
    {/if}
  </div>
</div>
