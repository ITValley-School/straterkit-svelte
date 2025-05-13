<script>
  import { goto } from "$app/navigation";
  import Card from "$lib/@spk/SpkBasicCard.svelte";
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import SpkBadge from "$lib/@spk/uielements/badge/SpkBadge.svelte";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";

  export let data;

  let books = data.books;
  const DATALAKE_URL = import.meta.env.VITE_BASE_AZURE_DATALAKE_URL;

  const statusBadge = {
    rascunho: { text: "Rascunho", color: "secondary" },
    revisao: { text: "Em Revisão", color: "warning" },
    publicado: { text: "Publicado", color: "success" },
  };

  const handleChangeStatus = async (bookId, status) => {
    [books] = await callBackendAPI(
      fetch,
      null,
      `/books/${bookId}/change_status`,
      "POST",
      {
        status,
      }
    );
  };

  const handleDeleteBook = async (bookId) => {
    [books] = await callBackendAPI(fetch, null, `/books/${bookId}`, "DELETE");
  };
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h4 class="fw-bold">📚 Minhas Publicações</h4>
  <Button text="+ Novo Livro" color="primary" />
</div>

<div class="row">
  {#each books as book}
    <div class="col-md-6 col-lg-4 mb-4">
      <Card cardProps="h-100">
        <span slot="content">
          <img
            src={`${DATALAKE_URL}/download?${book.CoverImagePath}`}
            alt="Capa do livro"
            class="img-fluid rounded mb-3"
          />
          <h5 class="fw-semibold">{book.Title}</h5>
          <p class="text-muted fs-12 mb-1">
            Atualizado em {new Date(book.UpdatedAt).toLocaleString()}
          </p>
          <SpkBadge
            Color={statusBadge[book.Status].color}
            text={statusBadge[book.Status].text}
          />
          <div class="d-flex gap-2 mt-3">
            <Button
              text="Editar"
              color="outline-primary"
              size="sm"
              onclickfunc={() =>
                goto(`/books/writerbook?book_id=${book.BookID}`)}
            />
            {#if book.Status !== "publicado"}
              <Button
                text="Publicar"
                color="success"
                size="sm"
                onclickfunc={() => handleChangeStatus(book.BookID, "publicado")}
              />
            {/if}
            <Button
              text="Excluir"
              color="outline-danger"
              size="sm"
              onclickfunc={() => handleDeleteBook(book.BookID)}
            />
          </div>
        </span>
      </Card>
    </div>
  {/each}
</div>
