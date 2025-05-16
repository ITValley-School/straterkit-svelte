<script>
  // Importing necessary components and utilities
  import { onMount } from "svelte";
  import Card from "$lib/@spk/SpkBasicCard.svelte";
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import TopicItem from "$lib/components/newItvalley/TopicItem.svelte";
  import { callBackendAPI } from "$lib/utils/requestUtils.js";
  import { confirmSwal } from "$lib/components/confirmSwal.js";
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
  import ToastContainer from "$lib/components/ToastContainer.svelte";

  // Destructuring data into variables
  let books = [],
    topic = {},
    livroSelecionado = null;
  let original = null;
  let nodes = {};
  let selectedTopic = null; // Currently selected topic
  let selectedIndexPath = null; // Index path of the selected topic
  let selectedTopicId = null; // ID of the selected topic

  // Topic details
  let selectedTopicTitle = "";
  let selectedTopicDescription = "";
  let selectedTopicTranscription = "";

  let isLoading = false; // Loading state
  let toastParams = initializeToast(); // Toast notification parameters
  let fileInput; // File input element reference
  let file; // Selected file for upload

  onMount(async () => {
    isLoading = true;

    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("book_id");

    const [_books] = await callBackendAPI(fetch, null, "/books", "GET");

    const _livroSelecionado = _books.length
      ? bookId
        ? parseInt(bookId)
        : _books[0].BookID
      : null;

    let _topics = [];

    if (_books.length > 0)
      [_topics] = await callBackendAPI(
        fetch,
        null,
        `/chapters/get_all_by_book_id/${_livroSelecionado}`,
        "GET"
      );

    books = _books;
    topic = { _id: -1, title: "", children: _topics };

    updateNodes();

    livroSelecionado = _livroSelecionado;

    isLoading = false;
  });

  const updateNodes = () => {
    nodes = {};
    const flatten = (node, indexPath) => {
      node.id = node._id;
      node.indexPath = indexPath;
      node.children = node.children ? node.children : [];
      nodes[node.id] = node;
      if (node.children)
        node.children.forEach((child, i) => flatten(child, [...indexPath, i]));
    };
    flatten(topic, []);

    original = JSON.parse(JSON.stringify(topic));
  };

  // Initialize toast parameters
  function initializeToast() {
    return { show: false, type: "success", message: "" };
  }

  // Reset all selection-related variables
  function resetSelection() {
    selectedTopic = null;
    selectedIndexPath = null;
    selectedTopicId = null;
    selectedTopicTitle = "";
    selectedTopicDescription = "";
    selectedTopicTranscription = "";
    file = null;
    if (fileInput) fileInput.value = "";
  }

  // Generic function to handle API actions
  async function handleAction(url, method, body = null, successMessage = "") {
    isLoading = true;
    const [result, error] = await callBackendAPI(
      fetch,
      null,
      url,
      method,
      body
    );
    isLoading = false;

    if (result) {
      topic = { id: -1, title: "", children: result }; // Update topic list
      updateNodes();
      resetSelection();
      if (successMessage) showToast("success", successMessage);
    } else {
      showToast("danger", error?.detail || "Erro ao realizar a ação.");
    }
  }

  // Add a new chapter
  const handleAddChapter = () =>
    confirmSwal(
      "Tem certeza de que deseja adicionar um novo capítulo?",
      "",
      "info",
      () =>
        handleAction(
          "/chapters",
          "POST",
          { bookId: livroSelecionado },
          "Capítulo adicionado com sucesso!"
        )
    );

  // Load topics for a selected book
  const carregarTopicos = (livroId) => {
    resetSelection();
    handleAction(`/chapters/get_all_by_book_id/${livroId}`, "GET");
  };

  // Add a new topic
  const handleAddTopic = (indexPath) => {
    let topicId = topic.children[indexPath[0]]?._id;
    indexPath = indexPath.slice(1);

    confirmSwal(
      "Tem certeza de que deseja adicionar um novo tópico?",
      "",
      "info",
      () =>
        handleAction(
          `/topics/${topicId}`,
          "POST",
          { indexPath, bookId: livroSelecionado },
          "Tópico adicionado com sucesso!"
        )
    );
  };

  // Delete a topic
  const handleDeleteTopic = (indexPath) => {
    let topicId = topic.children[indexPath[0]]?._id;
    indexPath = indexPath.slice(1);

    confirmSwal(
      "Tem certeza de que deseja excluir este tópico?",
      "",
      "warning",
      () =>
        handleAction(
          `/topics/${topicId}`,
          "DELETE",
          { indexPath, bookId: livroSelecionado },
          "Tópico excluído com sucesso!"
        )
    );
  };

  // Select a topic and load its details
  const handleSelectTopic = async (indexPath) => {
    let topicId = topic.children[indexPath[0]]?._id;
    indexPath = indexPath.slice(1);

    isLoading = true;
    selectedIndexPath = indexPath;
    selectedTopicId = topicId;

    const params = new URLSearchParams({ indexPath });
    const [result, error] = await callBackendAPI(
      fetch,
      null,
      `/topics/${topicId}?${params.toString()}`,
      "GET"
    );

    isLoading = false;

    if (error) {
      showToast("danger", error?.detail || "Erro ao carregar os tópicos.");
    } else {
      selectedTopic = result;
      selectedTopicTitle = selectedTopic.title || "";
      selectedTopicDescription = selectedTopic.description || "";
      selectedTopicTranscription = selectedTopic.transcription || "";
    }
  };

  // Save topic information
  const handleTopicInfoSave = () =>
    confirmSwal(
      "Tem certeza de que deseja salvar as informações deste tópico?",
      "",
      "warning",
      () =>
        handleAction(
          `/topics/${selectedTopicId}`,
          "PUT",
          {
            title: selectedTopicTitle,
            description: selectedTopicDescription,
            transcription: selectedTopicTranscription,
            indexPath: selectedIndexPath,
            bookId: livroSelecionado,
          },
          "Informações do tópico salvas com sucesso!"
        )
    );

  // Upload a file
  const handleUploadFile = () =>
    confirmSwal(
      "Tem certeza de que deseja fazer o upload deste arquivo?",
      "",
      "warning",
      async () => {
        isLoading = true;

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "info",
          JSON.stringify({ indexPath: selectedIndexPath })
        );

        const [result, error] = await callBackendAPI(
          fetch,
          null,
          `/topics/${selectedTopicId}/upload_file`,
          "POST",
          formData
        );

        isLoading = false;

        if (result) {
          resetSelection();
          showToast("success", "Arquivo enviado com sucesso!");
        } else {
          showToast("danger", error?.detail || "Erro ao enviar o arquivo.");
        }
      }
    );

  // Improve transcription using AI
  const handleImproveWithAI = () =>
    confirmSwal(
      "Tem certeza de que deseja melhorar a transcrição com IA?",
      "",
      "warning",
      async () => {
        isLoading = true;

        const [result, error] = await callBackendAPI(
          fetch,
          null,
          `/topics/${selectedTopicId}/improve_with_ai`,
          "POST",
          { indexPath: selectedIndexPath }
        );

        isLoading = false;

        if (result) {
          selectedTopicTranscription = result;
          showToast("success", "Transcrição melhorada com sucesso!");
        } else {
          showToast(
            "danger",
            error?.detail || "Erro ao melhorar a transcrição."
          );
        }
      }
    );

  // Show toast notification
  function showToast(type, message) {
    toastParams = { show: true, type, message };
  }

  // Close toast notification
  const handleCloseToast = () => (toastParams.show = false);

  const onFinalize = (sourcePath, destinationPath, destinationIndex) => {
    confirmSwal(
      "Tem certeza de que deseja alterar a ordem dos tópicos?",
      "",
      "warning",
      async () => {
        isLoading = true;

        const [result, error] = await callBackendAPI(
          fetch,
          null,
          `/topics/change_order`,
          "POST",
          {
            sourcePath,
            destinationPath,
            bookId: livroSelecionado,
            index: destinationIndex,
          }
        );

        isLoading = false;

        if (result) {
          topic = { id: -1, title: "", children: result }; // Update topic list
          updateNodes();
          showToast("success", "Ordem dos tópicos alterada com sucesso!");
        } else {
          topic = original;
          updateNodes();

          showToast(
            "danger",
            error?.detail || "Erro ao alterar a ordem dos tópicos."
          );
        }
      },
      () => {
        topic = original;
        updateNodes();
      }
    );
  };
</script>

{#if isLoading}
  <LoadingSpinner />
{/if}

<!-- Book selection dropdown -->
<div class="row mb-4">
  <div class="col-md-4">
    <label class="form-label" for="select-livro">Selecionar Livro</label>
    <select
      id="select-livro"
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
  <!-- Book structure section -->
  <div class="col-md-4">
    <Card cardProps="mb-4" headerTitle="Estrutura do Livro" Headerprops="pb-2">
      <span slot="content">
        <TopicItem
          node={topic}
          bind:nodes
          {onFinalize}
          {handleAddTopic}
          {handleDeleteTopic}
          {handleSelectTopic}
          selectedTopicId={selectedTopic?._id}
        />
        <Button
          text="+ Adicionar tópico"
          color="link"
          onclickfunc={handleAddChapter}
          disabled={!livroSelecionado || !!selectedTopicId}
        />
      </span>
    </Card>
  </div>

  <!-- Transcription editor section -->
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
            text="Melhore com IA"
            color="outline-success"
            size="sm"
            onclickfunc={handleImproveWithAI}
            disabled={!selectedTopic}
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
            text="Salvar"
            color="outline-success"
            onclickfunc={handleTopicInfoSave}
            disabled={!selectedTopic}
          />
          <Button
            text="Cancelar"
            color="outline-danger"
            onclickfunc={() => resetSelection()}
            disabled={!selectedTopic}
          />
        </div>
      </span>
    </Card>

    <!-- File upload section -->
    <Card headerTitle="Biblioteca do Livro" class="mt-4">
      <span slot="content">
        <span class="form-label">
          Upload imagem/áudio
          <Button
            text="Upload"
            size="sm"
            color="primary"
            onclickfunc={handleUploadFile}
            disabled={!file || !selectedTopic}
          />
        </span>
        <input
          type="file"
          bind:this={fileInput}
          class="form-control mb-3"
          accept="image/*,audio/*"
          on:change={(e) => (file = e.target.files[0])}
        />
        <p>Aqui virão arquivos já enviados, com botão de reutilizar</p>
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
              </li>
            {/each}
          {/if}
        </ul>
      </span>
    </Card>
  </div>

  <!-- Toast notification container -->
  <ToastContainer bind:toastParams onClose={handleCloseToast} />
</div>
