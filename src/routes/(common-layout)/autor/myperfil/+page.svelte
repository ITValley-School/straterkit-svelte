<script>
  // Importing necessary components and utilities
  import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
  import {
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Toast,
  } from "@sveltestrap/sveltestrap";
  import { confirmSwal } from "$lib/components/confirmSwal.js";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";
  import { userData } from "$lib/store/userStore.js";
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";

  // Props passed to the component
  export let data;

  // Environment variable for Azure Data Lake URL
  const DATALAKE_URL = import.meta.env.VITE_BASE_AZURE_DATALAKE_URL;

  // Local state variables
  let file = null; // Holds the uploaded file
  let user = initializeUser(data.user); // User data initialization
  let errors = {}; // Form validation errors
  let toastParams = initializeToast(); // Toast notification parameters
  let fileInput; // Reference to the file input element
  let isLoading = false; // Loading state

  // Function to initialize user data
  function initializeUser(userData) {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: "Autor",
      photo: userData.photoURL
        ? `${DATALAKE_URL}/download?${userData.photoURL}`
        : null,
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  // Function to initialize toast parameters
  function initializeToast() {
    return {
      show: false,
      type: "success",
      message: "",
    };
  }

  // Form validation logic
  const validateForm = () => {
    errors = {};
    if (!user.firstName) errors.firstName = "O primeiro nome é obrigatório.";
    if (!user.lastName) errors.lastName = "Sobrenome é obrigatório.";
    if (user.password) {
      if (!user.newPassword) errors.newPassword = "Nova senha é obrigatória.";
      if (!user.confirmPassword)
        errors.confirmPassword = "Confirmação de senha é obrigatória.";
      if (user.newPassword !== user.confirmPassword)
        errors.confirmPassword = "As senhas não coincidem.";
    }
    return Object.keys(errors).length === 0;
  };

  // Function to handle saving user data
  async function handleSave() {
    if (!validateForm()) return;

    confirmSwal(
      "Você tem certeza que deseja salvar as alterações?",
      "",
      "info",
      async () => {
        isLoading = true;

        // Preparing form data for API call
        const formData = new FormData();
        formData.append(
          "info",
          JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            newPassword: user.newPassword,
            confirmPassword: user.confirmPassword,
          })
        );
        if (file) formData.append("file", file);

        // Making API call to update user data
        const [result, error] = await callBackendAPI(
          fetch,
          null,
          "/authors",
          "PUT",
          formData
        );

        if (result) {
          handleClear(); // Clear form fields
          userData.set(result); // Update user data in the store
          showToast("success", "Perfil atualizado com sucesso!");
        } else {
          showToast("danger", error.detail);
        }

        isLoading = false;
      }
    );
  }

  // Function to clear form fields
  function handleClear() {
    user = { ...user, password: "", newPassword: "", confirmPassword: "" };
    file = null;
    errors = {};
    fileInput.value = "";
  }

  // Function to close the toast notification
  function handleCloseToast() {
    toastParams.show = false;
  }

  // Function to handle file upload
  function handleUpload(event) {
    file = event.target.files[0];
    if (file) user.photo = URL.createObjectURL(file);
  }

  // Function to show toast notifications
  function showToast(type, message) {
    toastParams = { show: true, type, message };
  }
</script>

<svelte:head>
  <title>Meu Perfil | Plataforma do Autor</title>
</svelte:head>

{#if isLoading}
  <!-- Display loading spinner while saving data -->
  <LoadingSpinner />
{/if}

<Row class="my-4 needs-validation">
  <Col xl={4} class="mb-4">
    <!-- Profile picture card -->
    <SpkBasicCard
      cardProps="custom-card text-center"
      headerTitle="Foto de Perfil"
    >
      <div slot="content">
        <img
          src={user.photo || "/images/faces/1.jpg"}
          alt="Foto do usuário"
          class="rounded-circle mb-3"
          width="120"
          height="120"
        />
        <div class="mb-3">
          <input
            bind:this={fileInput}
            type="file"
            accept="image/*"
            class="form-control"
            on:change={handleUpload}
          />
        </div>
      </div>
    </SpkBasicCard>
  </Col>

  <Col xl={8}>
    <!-- Account information card -->
    <SpkBasicCard cardProps="custom-card" headerTitle="Informações da Conta">
      <div slot="content">
        <Form>
          <Row>
            <Col md={6}>
              <!-- First name input -->
              <FormGroup>
                <Label for="firstName">Primeiro nome</Label>
                <Input
                  id="firstName"
                  type="text"
                  bind:value={user.firstName}
                  invalid={!!errors.firstName}
                  feedback={errors.firstName}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <!-- Last name input -->
              <FormGroup>
                <Label for="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  type="text"
                  bind:value={user.lastName}
                  invalid={!!errors.lastName}
                  feedback={errors.lastName}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <!-- Email input (disabled) -->
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  bind:value={user.email}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <!-- Role input (disabled) -->
              <FormGroup>
                <Label for="role">Função</Label>
                <Input id="role" type="text" value={"Autor"} disabled />
              </FormGroup>
            </Col>
          </Row>

          <hr class="my-4" />

          <h6 class="fw-semibold mb-3">Alterar Senha</h6>
          <Row>
            <Col md={6}>
              <!-- Current password input -->
              <FormGroup>
                <Label for="password">Senha Atual</Label>
                <Input
                  id="password"
                  type="password"
                  bind:value={user.password}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <!-- New password input -->
              <FormGroup>
                <Label for="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  bind:value={user.newPassword}
                  disabled={!user.password}
                  invalid={!!errors.newPassword}
                  feedback={errors.newPassword}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <!-- Confirm new password input -->
              <FormGroup>
                <Label for="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  bind:value={user.confirmPassword}
                  disabled={!user.password}
                  invalid={!!errors.confirmPassword}
                  feedback={errors.confirmPassword}
                />
              </FormGroup>
            </Col>
          </Row>

          <div class="text-end mt-4">
            <!-- Save changes button -->
            <SpkButton
              color="primary"
              text="Salvar Alterações"
              onclickfunc={handleSave}
            />
          </div>
        </Form>
      </div>
    </SpkBasicCard>
  </Col>

  <!-- Toast notification container -->
  <div class="toast-container position-fixed top-0 end-0 p-3">
    {#if toastParams.show}
      <Toast
        id="primaryToast"
        color="primary"
        class={`colored-toast ${toastParams.type === "success" ? "bg-success" : toastParams.type === "warning" ? "bg-warning" : "bg-danger"}-transparent`}
        delay={3000}
        autohide
        aria-atomic="true"
        on:close={handleCloseToast}
      >
        <div
          class={`toast-header ${toastParams.type === "success" ? "bg-success" : toastParams.type === "warning" ? "bg-warning" : "bg-danger"} text-fixed-white`}
        >
          <strong class="me-auto">
            {toastParams.type === "success"
              ? "Success"
              : toastParams.type === "warning"
                ? "Warning"
                : "Error"}
          </strong>
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
</Row>
