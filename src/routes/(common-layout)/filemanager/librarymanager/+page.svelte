<script>
  import { onMount } from "svelte";
  import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import SpkTablescomponent from "$lib/@spk/SpkTablescomponent.svelte";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";
  import { confirmSwal } from "$lib/components/confirmSwal.js";
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
  import ToastContainer from "$lib/components/ToastContainer.svelte";

  export let data;

  // Initialize variables for books, topics, assets, and UI states
  let books = data.books;
  let topics = data.topics;
  let assets = [];
  let livroSelecionado = null;
  let isLoading = false;
  let toastParams = initializeToast();

  // Azure Data Lake URL from environment variables
  const DATALAKE_URL = import.meta.env.VITE_BASE_AZURE_DATALAKE_URL;

  // Lifecycle hook to initialize selected book and filter assets
  onMount(() => {
    livroSelecionado = 0;
    assets = [];
    filterAssets(topics);
  });

  // Initialize toast parameters
  function initializeToast() {
    return { show: false, type: "success", message: "" };
  }

  // Recursively filter assets from topics and populate the assets array
  function filterAssets(items, indexPath = []) {
    items.forEach((item, index) => {
      const currentPath = [...indexPath, index];
      const topicId = topics[currentPath[0]]?._id;

      // Add audio assets
      if (item.audio) {
        assets.push(createAsset(item.audio, currentPath, topicId, "audio"));
      }

      // Add image assets
      if (item.images) {
        item.images.forEach((image, imageIndex) => {
          assets.push(
            createAsset(image, [...currentPath, imageIndex], topicId, "image")
          );
        });
      }

      // Recursively process child topics
      if (item.children) {
        filterAssets(item.children, currentPath);
      }
    });
  }

  // Create an asset object with metadata
  function createAsset(data, indexPath, topicId, type) {
    return {
      indexPath: indexPath.slice(1),
      topicId,
      ...data,
      type,
    };
  }

  // Load topics for the selected book
  async function carregarTopicos(livroId) {
    isLoading = true;

    const [newTopics, error] = await callBackendAPI(
      fetch,
      null,
      `/chapters/get_all_by_book_id/${books[livroId].BookID}`,
      "GET"
    );

    isLoading = false;

    if (error) {
      return showToast(
        "danger",
        error.detail || "Erro ao carregar os tópicos."
      );
    }

    topics = newTopics;
    assets = [];
    filterAssets(topics);
  }

  // Handle asset deletion with confirmation
  async function handleDeleteAsset(asset) {
    const { topicId, indexPath, type } = asset;

    confirmSwal(
      "Tem certeza de que deseja excluir este ativo?",
      "",
      "warning",
      async () => {
        isLoading = true;

        const [newTopics, error] = await callBackendAPI(
          fetch,
          null,
          `/topics/${topicId}/delete_asset`,
          "DELETE",
          {
            indexPath,
            bookId: books[livroSelecionado].BookID,
            type,
          }
        );

        isLoading = false;

        if (newTopics) {
          topics = newTopics;
          assets = [];
          filterAssets(topics);
          showToast("success", "Ativo excluído com sucesso!");
        } else {
          showToast("danger", error.detail);
        }
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

  // Download an asset from Azure Data Lake
  function downloadAsset(asset) {
    const anchor = document.createElement("a");
    anchor.href = `${DATALAKE_URL}/download?${asset.url}`;
    anchor.download = new URLSearchParams(asset.url).get("file_name");
    anchor.click();
  }
</script>

{#if isLoading}
  <!-- Show loading spinner while data is being fetched -->
  <LoadingSpinner />
{/if}

<div class="container-fluid">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h5 class="fw-bold">📁 Biblioteca de Arquivos</h5>
    <div class="d-flex gap-2">
      <!-- Dropdown to select a book -->
      <select
        bind:value={livroSelecionado}
        class="form-select"
        on:change={() => carregarTopicos(livroSelecionado)}
      >
        {#each books as book, i}
          <option value={i}>{book.Title}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="table-responsive">
    <!-- Table component to display assets -->
    <SpkTablescomponent
      header={[
        { title: "Arquivo" },
        { title: "Categoria" },
        { title: "Livro" },
        { title: "Tamanho" },
        { title: "Data" },
        { title: "Ação" },
      ]}
      tableClass="table table-bordered"
      tBodyClass="align-middle"
    >
      {#each assets as asset}
        <tr>
          <td>{new URLSearchParams(asset.url).get("file_name")}</td>
          <td>{asset.type === "image" ? "Imagem" : "Áudio"}</td>
          <td>{books[livroSelecionado].Title}</td>
          <td>{asset.size}</td>
          <td>{new Date(asset.created_at).toLocaleString()}</td>
          <td>
            <div class="d-flex gap-2">
              <!-- Button to download the asset -->
              <SpkButton
                buttontype="button"
                size="btn-sm"
                color="info-light"
                text={`<i class='ri-eye-line'></i>`}
                onclickfunc={() => downloadAsset(asset)}
              />
              <!-- Button to delete the asset -->
              <SpkButton
                buttontype="button"
                size="btn-sm"
                color="danger-light"
                text={`<i class='ri-delete-bin-line'></i>`}
                onclickfunc={() => handleDeleteAsset(asset)}
              />
            </div>
          </td>
        </tr>
      {/each}
    </SpkTablescomponent>
  </div>

  <!-- Toast notification container -->
  <ToastContainer bind:toastParams onClose={handleCloseToast} />
</div>

<style>
  /* Style for the dropdown */
  select.form-select {
    width: 200px;
  }
</style>
