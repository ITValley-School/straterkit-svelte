<script>
  import Card from "$lib/@spk/SpkBasicCard.svelte";
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import ListGroup from "$lib/@spk/ListGroup/SpkListGroup.svelte";
  import TopicItem from "$lib/components/newItvalley/TopicItem.svelte";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";
  import { Toast } from "@sveltestrap/sveltestrap";

  export let data;

  let books = data.books;
  let topics = data.topics;

  let livroSelecionado = data.currentBookId;
  let selectedTopic = null;
  let selectedIndexPath = null;
  let selectedTopicId = null;

  let selectedTopicTitle = "";
  let selectedTopicDescription = "";
  let selectedTopicTranscription = "";

  let toastParams = {
    show: false,
    type: "success",
    message: "",
  };

  let file;

  const handleAddChapter = async () => {
    [topics] = await callBackendAPI(fetch, null, `/chapters`, "POST", {
      bookId: livroSelecionado,
    });
    selectedTopic = null;
  };

  const carregarTopicos = async (livroId) => {
    [topics] = await callBackendAPI(
      fetch,
      null,
      `/chapters/get_all_by_book_id/${livroId}`,
      "GET"
    );
  };

  const handleAddTopic = async (topicId, indexPath) => {
    [topics] = await callBackendAPI(fetch, null, `/topics/${topicId}`, "POST", {
      indexPath,
      bookId: livroSelecionado,
    });
    selectedTopic = null;
  };

  const handleDeleteTopic = async (topicId, indexPath) => {
    [topics] = await callBackendAPI(
      fetch,
      null,
      `/topics/${topicId}`,
      "DELETE",
      {
        indexPath,
        bookId: livroSelecionado,
      }
    );
    selectedTopic = null;
  };

  const handleSelectTopic = async (topicId, indexPath) => {
    selectedIndexPath = indexPath;
    selectedTopicId = topicId;
    const params = new URLSearchParams({ indexPath });
    [selectedTopic] = await callBackendAPI(
      fetch,
      null,
      `/topics/${topicId}?${params.toString()}`,
      "GET"
    );

    selectedTopicTitle = selectedTopic.title || "";
    selectedTopicDescription = selectedTopic.description || "";
    selectedTopicTranscription = selectedTopic.transcription || "";
  };

  const handleTopicInfoSave = async () => {
    [topics] = await callBackendAPI(
      fetch,
      null,
      `/topics/${selectedTopicId}`,
      "PUT",
      {
        title: selectedTopicTitle,
        description: selectedTopicDescription,
        transcription: selectedTopicTranscription,
        indexPath: selectedIndexPath,
        bookId: livroSelecionado,
      }
    );
  };

  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("info", JSON.stringify({ indexPath: selectedIndexPath }));

    [selectedTopic] = await callBackendAPI(
      fetch,
      null,
      `/topics/${selectedTopicId}/upload_file`,
      "POST",
      formData
    );
  };

  const handleImproveWithAI = async () => {
    let [result, error] = await callBackendAPI(
      fetch,
      null,
      `/topics/${selectedTopicId}/improve_with_ai`,
      "POST",
      {
        indexPath: selectedIndexPath,
      }
    );

    if (error) {
      toastParams = {
        show: true,
        type: "danger",
        message: error.detail,
      };
    } else {
      selectedTopicTranscription = result;
      toastParams = {
        show: true,
        type: "success",
        message: "Transcription improved successfully!",
      };
    }
  };

  const handleCloseToast = () => {
    toastParams.show = false;
  };
</script>

<div class="row mb-4">
  <div class="col-md-4">
    <label class="form-label" for="select-livro">Selecionar Livro</label>
    <select
      id="select-livro"
      placeholder="Selecione um livro"
      class="form-select"
      bind:value={livroSelecionado}
      on:change={() => carregarTopicos(livroSelecionado)}
    >
      {#each books as book}
        <option value={book.BookID}>{book.Title}</option>
      {/each}
    </select>
  </div>
</div>

<div class="row">
  <!-- Estrutura -->
  <div class="col-md-4">
    <Card cardProps="mb-4" headerTitle="Estrutura do Livro" Headerprops="pb-2">
      <span slot="content">
        <ListGroup CustomClass="nested-list">
          {#each topics as topic}
            <TopicItem
              {topic}
              {handleAddTopic}
              {handleDeleteTopic}
              topicId={topic["_id"]}
              onSelect={handleSelectTopic}
              selectedTopicId={selectedTopic ? selectedTopic._id : null}
            />
          {/each}
        </ListGroup>
        <Button
          text="+ Adicionar tópico"
          color="link"
          onclickfunc={handleAddChapter}
        />
      </span>
    </Card>
  </div>

  <!-- Editor -->
  <div class="col-md-8">
    <Card headerTitle="Editor de Transcrição">
      <span slot="content">
        <span class="form-label">Título</span>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Título"
          bind:value={selectedTopicTitle}
        />
        <span class="form-label">Descrição</span>
        <textarea
          class="form-control mb-3"
          bind:value={selectedTopicDescription}
          rows="5"
          maxlength="2000"
        />
        <span class="form-label">
          Transcrição
          <Button
            text="Improve with IA"
            color="outline-success"
            size="sm"
            onclickfunc={handleImproveWithAI}
          />
        </span>
        <textarea
          class="form-control mb-3"
          bind:value={selectedTopicTranscription}
          placeholder="Digite ou cole sua transcrição aqui..."
          rows="6"
        ></textarea>
        <div class="d-flex gap-2 mb-3 justify-content-end">
          <Button
            text="Save"
            color="outline-success"
            onclickfunc={handleTopicInfoSave}
          />
        </div>
      </span>
    </Card>

    <Card headerTitle="Biblioteca do Livro" class="mt-4">
      <span slot="content">
        <span class="form-label">
          Upload imagem/áudio
          <Button
            text="Upload"
            size="sm"
            color="primary"
            onclickfunc={handleUploadFile}
            disabled={!file}
          />
        </span>
        <input
          type="file"
          class="form-control mb-3"
          accept="image/*,audio/*"
          on:change={(e) => (file = e.target.files[0])}
        />
        <p>Aqui virão arquivos já enviados, com botão de reutilizar</p>
        <!-- Exemplo estático -->
        <ul class="list-group">
          {#if selectedTopic && selectedTopic.audio}
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {new URLSearchParams(selectedTopic.audio.url).get("file_name")}
              <Button text="Usar" size="sm" color="primary" />
            </li>
          {/if}
          {#if selectedTopic && selectedTopic.images}
            {#each selectedTopic.images as image}
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {new URLSearchParams(image.url).get("file_name")}
                <Button text="Usar" size="sm" color="primary" />
              </li>
            {/each}
          {/if}
        </ul>
      </span>
    </Card>
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
