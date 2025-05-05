<script>
    import { onMount } from "svelte";
    import { Svroller } from "svrollbar";
    import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
    import SpkBadge from "$lib/@spk/uielements/badge/SpkBadge.svelte";
    import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
    import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
    import SpkTablescomponent from "$lib/@spk/SpkTablescomponent.svelte";
  
    let arquivos = [
      { nome: "Capa_001.jpg", categoria: "Imagem", livro: "Vida Plena", capitulo: "1", tamanho: "2MB", data: "01/05/2025" },
      { nome: "audio_intro.mp3", categoria: "Áudio", livro: "Vida Plena", capitulo: "1", tamanho: "3.5MB", data: "02/05/2025" },
      { nome: "versiculo_chave.jpg", categoria: "Imagem", livro: "Sem Limites", capitulo: "3", tamanho: "1.1MB", data: "02/05/2025" },
    ];
  
    let filtroLivro = "Todos os Livros";
    let livros = ["Todos os Livros", "Vida Plena", "Sem Limites"];
  
    $: arquivosFiltrados = filtroLivro === "Todos os Livros"
      ? arquivos
      : arquivos.filter(a => a.livro === filtroLivro);
  </script>
  
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold">📁 Biblioteca de Arquivos</h5>
      <div class="d-flex gap-2">
        <select bind:value={filtroLivro} class="form-select">
          {#each livros as livro}
            <option>{livro}</option>
          {/each}
        </select>
        <SpkButton color="primary" text="Upload Arquivo" />
      </div>
    </div>
  
    <div class="table-responsive">
      <SpkTablescomponent
        header={["Arquivo", "Categoria", "Livro", "Capítulo", "Tamanho", "Data", "Ação"]}
        tableClass="table table-bordered"
        tBodyClass="align-middle"
      >
        {#each arquivosFiltrados as arq}
          <tr>
            <td>{arq.nome}</td>
            <td>{arq.categoria}</td>
            <td>{arq.livro}</td>
            <td>{arq.capitulo}</td>
            <td>{arq.tamanho}</td>
            <td>{arq.data}</td>
            <td>
              <div class="d-flex gap-2">
                <SpkButton buttontype="button" size="btn-sm" color="info-light" text={`<i class='ri-eye-line'></i>`} />
                <SpkButton buttontype="button" size="btn-sm" color="danger-light" text={`<i class='ri-delete-bin-line'></i>`} />
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
  