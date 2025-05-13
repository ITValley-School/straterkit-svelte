<script>
  import { onMount } from "svelte";
  import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import SpkTablescomponent from "$lib/@spk/SpkTablescomponent.svelte";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";

  export let data;

  let books = data.books;
  let topics = data.topics;
  let livroSelecionado = null;
  let assets = [];

  const DATALAKE_URL = import.meta.env.VITE_BASE_AZURE_DATALAKE_URL;

  onMount(() => {
    livroSelecionado = 0;
    assets = [];
    filterAssets(topics);
  });

  const filterAssets = (items, indexPath = []) => {
    items.forEach((item, index) => {
      const currentPath = [...indexPath, index];
      const topicId = topics[currentPath[0]]?._id;

      if (item.audio) {
        assets.push({
          indexPath: currentPath.slice(1),
          topicId,
          ...item.audio,
          type: "audio",
        });
      }

      if (item.images) {
        item.images.forEach((image, imageIndex) => {
          assets.push({
            indexPath: [...currentPath.slice(1), imageIndex],
            topicId,
            ...image,
            type: "image",
          });
        });
      }

      if (item.children) {
        filterAssets(item.children, currentPath);
      }
    });
  };

  const carregarTopicos = async (livroId) => {
    [topics] = await callBackendAPI(
      fetch,
      null,
      `/chapters/get_all_by_book_id/${books[livroId].BookID}`,
      "GET"
    );
    assets = [];
    filterAssets(topics);
  };

  const handleDeleteAsset = async (asset) => {
    const topicId = asset.topicId;
    const indexPath = asset.indexPath;

    [topics] = await callBackendAPI(
      fetch,
      null,
      `/topics/${topicId}/delete_asset`,
      "DELETE",
      {
        indexPath,
        bookId: books[livroSelecionado].BookID,
        type: asset.type,
      }
    );

    assets = [];
    filterAssets(topics);
  };
</script>

<div class="container-fluid">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h5 class="fw-bold">📁 Biblioteca de Arquivos</h5>
    <div class="d-flex gap-2">
      <select
        bind:value={livroSelecionado}
        class="form-select"
        on:change={() => carregarTopicos(livroSelecionado)}
      >
        {#each books as book, i}
          <option value={i}>{book.Title}</option>
        {/each}
      </select>
      <SpkButton color="primary" text="Upload Arquivo" />
    </div>
  </div>

  <div class="table-responsive">
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
              <SpkButton
                buttontype="button"
                size="btn-sm"
                color="info-light"
                text={`<i class='ri-eye-line'></i>`}
                onclickfunc={() => {
                  window.open(
                    `${DATALAKE_URL}/download?${asset.url}`,
                    "_blank"
                  );
                }}
              />
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
</div>

<style>
  select.form-select {
    width: 200px;
  }
</style>
