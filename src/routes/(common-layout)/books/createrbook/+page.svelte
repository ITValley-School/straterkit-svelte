<script>
  // Importing necessary components and utilities
  import Card from "$lib/@spk/SpkBasicCard.svelte"; // Custom card component
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte"; // Custom button component
  import { confirmSwal } from "$lib/components/confirmSwal.js"; // Utility for confirmation modals
  import { Input, Label } from "@sveltestrap/sveltestrap"; // Sveltestrap components for form inputs
  import { userData } from "$lib/store/userStore.js"; // Store for user data
  import ToastContainer from "$lib/components/ToastContainer.svelte"; // Toast notification container
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte"; // Loading spinner component
  import { createBook } from "$lib/services/bookService.js";

  // Initializing form data and state variables
  let formData = {
    titulo: "", // Title of the book
    subtitulo: "", // Subtitle of the book
    categoria: 0, // Category ID
    idioma: 0, // Language ID
    publico: "", // Target audience
    descricao: "", // General description
    capa: null, // Cover image file
    coautores: [], // List of co-authors
    novoCoautor: "", // New co-author input
  };
  let errors = {}; // Object to store validation errors
  let isLoading = false; // Loading state for form submission

  // Toast notification parameters
  let toastParams = initializeToast();

  // Function to initialize toast parameters
  function initializeToast() {
    return { show: false, type: "success", message: "" }; // Default toast state
  }

  // Function to add a co-author to the list
  function adicionarCoautor() {
    if (formData.novoCoautor.trim()) {
      formData.coautores = [...formData.coautores, formData.novoCoautor]; // Add new co-author
      formData.novoCoautor = ""; // Clear input field
    }
  }

  // Form validation logic
  const validateForm = () => {
    errors = {}; // Reset errors
    if (!formData.titulo) errors.titulo = "Título é obrigatório"; // Title is required
    if (!formData.subtitulo) errors.subtitulo = "Subtítulo é obrigatório"; // Subtitle is required
    if (!formData.categoria) errors.categoria = "Categoria é obrigatória"; // Category is required
    if (!formData.idioma) errors.idioma = "Idioma é obrigatório"; // Language is required
    if (!formData.publico) errors.publico = "Público-alvo é obrigatório"; // Target audience is required
    if (!formData.descricao) errors.descricao = "Descrição é obrigatória"; // Description is required
    if (!formData.capa) errors.capa = "Capa é obrigatória"; // Cover image is required

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop if validation fails

    confirmSwal(
      "Tem certeza de que deseja salvar este livro?", // Confirmation message
      "",
      "info",
      async () => {
        isLoading = true; // Show loading spinner

        const [result, error] = await createBook(formData);

        if (result) {
          handleClear(); // Clear form on success
          showToast("success", "Livro salvo com sucesso!"); // Show success toast
        } else {
          showToast("danger", error.detail); // Show error toast
        }

        isLoading = false; // Hide loading spinner
      }
    );
  };

  // Function to clear the form
  const handleClear = () => {
    formData = {
      titulo: "",
      subtitulo: "",
      categoria: 0,
      idioma: 0,
      publico: "",
      descricao: "",
      capa: null,
      coautores: [],
      novoCoautor: "",
    }; // Reset form data
    errors = {}; // Clear errors
    const inputElement = document.getElementById("cover-image");
    if (inputElement) inputElement.value = ""; // Reset file input
  };

  // Function to close the toast notification
  const handleCloseToast = () => {
    toastParams.show = false; // Hide toast
  };

  // Function to show toast notifications
  function showToast(type, message) {
    toastParams = { show: true, type, message }; // Update toast parameters
  }
</script>

{#if isLoading}
  <LoadingSpinner /> <!-- Show loading spinner if isLoading is true -->
{/if}

<div class="row">
  <div class="col-md-8 needs-validation">
    <!-- Form for book details -->
    <Card headerTitle="Cadastrar Novo Livro">
      <span slot="content">
        <div class="row g-3">
          <!-- Title input -->
          <div class="col-md-6">
            <Label for="titulo">Título do Livro</Label>
            <Input
              type="text"
              id="titulo"
              bind:value={formData.titulo}
              invalid={!!errors.titulo}
              feedback={errors.titulo}
            />
          </div>
          <!-- Subtitle input -->
          <div class="col-md-6">
            <Label for="subtitulo">Subtítulo</Label>
            <Input
              type="text"
              id="subtitulo"
              bind:value={formData.subtitulo}
              invalid={!!errors.subtitulo}
              feedback={errors.subtitulo}
            />
          </div>
          <!-- Category dropdown -->
          <div class="col-md-6">
            <Label for="categoria">Categoria</Label>
            <Input
              type="select"
              id="categoria"
              bind:value={formData.categoria}
              invalid={!!errors.categoria}
              feedback={errors.categoria}
            >
              <option value={1}>Ficção</option>
              <option value={2}>Não-ficção</option>
              <option value={3}>Técnico</option>
              <option value={4}>Autoajuda</option>
            </Input>
          </div>
          <!-- Language dropdown -->
          <div class="col-md-6">
            <Label for="idioma">Idioma</Label>
            <Input
              type="select"
              id="idioma"
              bind:value={formData.idioma}
              invalid={!!errors.idioma}
              feedback={errors.idioma}
            >
              <option value={1}>Português (BR)</option>
              <option value={2}>Inglês</option>
              <option value={3}>Espanhol</option>
            </Input>
          </div>
          <!-- Target audience input -->
          <div class="col-12">
            <Label for="publico">Público-alvo / Objetivo</Label>
            <Input
              type="textarea"
              id="publico"
              bind:value={formData.publico}
              rows="2"
              invalid={!!errors.publico}
              feedback={errors.publico}
            />
          </div>
        </div>
      </span>
    </Card>

    <!-- Description input -->
    <Card headerTitle="Descrição do Livro">
      <span slot="content">
        <Label for="descricao">Descrição Geral</Label>
        <Input
          type="textarea"
          id="descricao"
          bind:value={formData.descricao}
          rows="5"
          maxlength="2000"
          invalid={!!errors.descricao}
          feedback={errors.descricao}
        />
      </span>
    </Card>
  </div>

  <div class="col-md-4">
    <!-- Cover image upload -->
    <Card headerTitle="Capa do Livro">
      <span slot="content" class="needs-validation">
        <Input
          type="file"
          id="cover-image"
          accept="image/*"
          on:change={(e) => (formData.capa = e.target.files[0])}
          invalid={!!errors.capa}
          feedback={errors.capa}
        />
        {#if formData.capa}
          <img
            src={URL.createObjectURL(formData.capa)}
            alt="Preview da capa"
            class="img-fluid rounded shadow"
          />
        {/if}
      </span>
    </Card>

    <!-- Co-authors section -->
    <Card headerTitle="Autores">
      <span slot="content">
        <p><strong>Autor Principal:</strong> {$userData.fullName}</p>
        <div class="input-group mb-2">
          <input
            class="form-control"
            bind:value={formData.novoCoautor}
            placeholder="Nome do coautor"
          />
          <button class="btn btn-outline-primary" on:click={adicionarCoautor}
            >+</button
          >
        </div>
        <ul class="ps-3">
          {#each formData.coautores as coautor}
            <li>{coautor}</li>
          {/each}
        </ul>
      </span>
    </Card>

    <!-- Action buttons -->
    <div class="d-flex justify-content-between mt-4">
      <Button
        text="Cancelar"
        color="outline-danger"
        onclickfunc={handleClear}
      />
      <Button color="primary" onclickfunc={handleSubmit}>Salvar Livro</Button>
    </div>
  </div>

  <!-- Toast notification container -->
  <ToastContainer bind:toastParams onClose={handleCloseToast} />
</div>
