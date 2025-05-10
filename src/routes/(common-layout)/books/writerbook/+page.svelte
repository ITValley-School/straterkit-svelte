<script>
  import Card from "$lib/@spk/SpkBasicCard.svelte";
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import ListGroup from "$lib/@spk/ListGroup/SpkListGroup.svelte";
  import TopicItem from "$lib/components/newItvalley/TopicItem.svelte";
  import { onMount } from "svelte";
  import { PUBLIC_BACKEND_API_URL } from "$env/static/public";

  let livros = [
    { id: 1, titulo: "Manual da Vitória" },
    { id: 2, titulo: "Mentalidade de Crescimento" },
  ];

  let livroSelecionado = null;
  let topics = [];

  onMount(() => {
    livroSelecionado = livros[0].id;
    carregarTopicos(livroSelecionado);
  });

  function carregarTopicos(livroId) {
    // Simula fetch
    topics =
      livroId === 1
        ? [
            {
              id: 1,
              title: "Tópico 1",
              children: [
                {
                  id: 2,
                  title: "Subtópico 1",
                  children: [{ id: 3, title: "Sub-subtópico", children: [] }],
                },
              ],
            },
            { id: 4, title: "Tópico 2", children: [] },
          ]
        : [
            { id: 5, title: "Capítulo A", children: [] },
            { id: 6, title: "Capítulo B", children: [] },
          ];
  }
</script>

<div class="row mb-4">
  <div class="col-md-4">
    <label class="form-label">Selecionar Livro</label>
    <select
      class="form-select"
      bind:value={livroSelecionado}
      on:change={() => carregarTopicos(livroSelecionado)}
    >
      {#each livros as livro}
        <option value={livro.id}>{livro.titulo}</option>
      {/each}
    </select>
  </div>
</div>

<div class="row">
  <!-- Estrutura -->
  <div class="col-md-4">
    <Card cardProps="mb-4" headerTitle="Estrutura do Livro" Headerprops="pb-2">
      <span slot="customheader" class="w-100 d-flex justify-content-end">
        <Button text="Editar Ordem" color="secondary" customClass="mb-2" />
      </span>

      <span slot="content">
        <ListGroup CustomClass="nested-list">
          {#each topics as topic}
            <TopicItem {topic} />
          {/each}
        </ListGroup>
        <Button text="+ Adicionar tópico" color="link" />
      </span>
    </Card>
  </div>

  <!-- Editor -->
  <div class="col-md-8">
    <Card headerTitle="Editor de Transcrição">
      <span slot="content">
        <label class="form-label">Transcrição</label>
        <div class="btn-group mb-2">
          <Button
            text="<b>B</b>"
            buttontype="button"
            color="outline-secondary"
          />
          <Button
            text="<i>I</i>"
            buttontype="button"
            color="outline-secondary"
          />
          <Button
            text="<u>U</u>"
            buttontype="button"
            color="outline-secondary"
          />
        </div>
        <textarea
          rows="6"
          class="form-control mb-3"
          placeholder="Digite ou cole sua transcrição aqui..."
        ></textarea>
        <div class="d-flex gap-2 mb-3">
          <Button text="Editar Transcrição" color="outline-primary" />
          <Button text="Improve with IA" color="outline-success" />
        </div>
        <div
          class="mb-3 border rounded p-3 text-center bg-light"
          style="border-style: dashed;"
        >
          <i class="bi bi-image" style="font-size: 2rem;"></i>
          <p class="mb-1">Upload imagem</p>
          <input type="file" class="form-control" accept="image/*" />
        </div>
      </span>
    </Card>

    <Card headerTitle="Biblioteca do Livro" class="mt-4">
      <span slot="content">
        <p>Aqui virão arquivos já enviados, com botão de reutilizar</p>
        <!-- Exemplo estático -->
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            imagem01.png <Button text="Usar" size="sm" color="primary" />
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            audio_intro.mp3 <Button text="Usar" size="sm" color="primary" />
          </li>
        </ul>
      </span>
    </Card>
  </div>
</div>
