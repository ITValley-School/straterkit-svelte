<script>
  // Import necessary modules and components
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Card from "$lib/@spk/SpkBasicCard.svelte";
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import SpkBadge from "$lib/@spk/uielements/badge/SpkBadge.svelte";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";
  import { confirmSwal } from "$lib/components/confirmSwal.js";
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
  import ToastContainer from "$lib/components/ToastContainer.svelte";

  // Initialize books and other state variables
  let books = [];
  let toastParams = initializeToast();
  let isLoading = false;
  const DATALAKE_URL = import.meta.env.VITE_BASE_AZURE_DATALAKE_URL;

  // Define status badges for different book statuses
  const statusBadge = {
    rascunho: { text: "Rascunho", color: "secondary" },
    revisao: { text: "Em Revisão", color: "warning" },
    publicado: { text: "Publicado", color: "success" },
  };

  // Lifecycle hook to initialize selected book and filter assets
  onMount(async () => {
    isLoading = true;

    const [_books] = await callBackendAPI(fetch, null, "/books", "GET");

    books = _books;

    isLoading = false;
  });

  // Function to initialize toast parameters
  function initializeToast() {
    return { show: false, type: "success", message: "" };
  }

  // Handle actions like changing status or deleting a book
  async function handleAction(action, bookId, status = null) {
    const messages = {
      changeStatus: {
        confirm: "Você tem certeza que deseja alterar o status do livro?",
        success: "Status do livro atualizado com sucesso!",
        error: "Erro ao atualizar o status do livro.",
      },
      delete: {
        confirm: "Você tem certeza que deseja excluir este livro?",
        success: "Livro excluído com sucesso!",
        error: "Erro ao excluir o livro.",
      },
    };

    // Show confirmation dialog before proceeding
    confirmSwal(
      messages[action].confirm,
      "",
      action === "changeStatus" ? "info" : "warning",
      async () => {
        isLoading = true; // Show loading spinner

        const endpoint =
          action === "changeStatus"
            ? `/books/${bookId}/change_status`
            : `/books/${bookId}`;
        const method = action === "changeStatus" ? "POST" : "DELETE";
        const body = action === "changeStatus" ? { status } : null;

        // Call backend API to perform the action
        const [result, error] = await callBackendAPI(
          fetch,
          null,
          endpoint,
          method,
          body
        );

        // Show success or error toast based on the result
        if (result) {
          books = result;
          showToast("success", messages[action].success);
        } else {
          showToast("danger", error.detail || messages[action].error);
        }

        isLoading = false; // Hide loading spinner
      }
    );
  }

  // Close the toast notification
  function handleCloseToast() {
    toastParams.show = false;
  }

  // Show a toast notification with a specific type and message
  function showToast(type, message) {
    toastParams = { show: true, type, message };
  }
</script>

{#if isLoading}
  <!-- Show loading spinner while an action is being processed -->
  <LoadingSpinner />
{/if}

<div class="d-flex justify-content-between align-items-center mb-4">
  <!-- Page header -->
  <h4 class="fw-bold">📚 Minhas Publicações</h4>
</div>

<div class="row">
  {#each books as book}
    <div class="col-md-6 col-lg-4 mb-4">
      <!-- Card for each book -->
      <Card cardProps="h-100">
        <span slot="content">
          <!-- Book cover image -->
          <img
            src={`${DATALAKE_URL}/download?${book.CoverImagePath}`}
            alt="Capa do livro"
            class="img-fluid rounded mb-3"
          />
          <!-- Book title -->
          <h5 class="fw-semibold">{book.Title}</h5>
          <!-- Last updated date -->
          <p class="text-muted fs-12 mb-1">
            Atualizado em {new Date(book.UpdatedAt).toLocaleString()}
          </p>
          <!-- Status badge -->
          <SpkBadge
            Color={statusBadge[book.Status].color}
            text={statusBadge[book.Status].text}
          />
          <div class="d-flex gap-2 mt-3">
            <!-- Edit button -->
            <Button
              text="Editar"
              color="outline-primary"
              size="sm"
              onclickfunc={() =>
                goto(`/books/writerbook?book_id=${book.BookID}`)}
            />
            {#if book.Status !== "publicado"}
              <!-- Publish button (only if not already published) -->
              <Button
                text="Publicar"
                color="success"
                size="sm"
                onclickfunc={() =>
                  handleAction("changeStatus", book.BookID, "publicado")}
              />
            {/if}
            <!-- Delete button -->
            <Button
              text="Excluir"
              color="outline-danger"
              size="sm"
              onclickfunc={() => handleAction("delete", book.BookID)}
            />
          </div>
        </span>
      </Card>
    </div>
  {/each}

  <ToastContainer bind:toastParams onClose={handleCloseToast} />
</div>
