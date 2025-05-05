<script>
    import Card from '$lib/@spk/SpkBasicCard.svelte';
    import Button from '$lib/@spk/uielements/Button/SpkButton.svelte';
    import SpkBadge from '$lib/@spk/uielements/badge/SpkBadge.svelte';
  
    let livros = [
      {
        titulo: "Vida Plena",
        capa: "/images/capas/vidaplena.jpg",
        status: "rascunho",
        atualizadoEm: "02/05/2025",
        progresso: 40
      },
      {
        titulo: "Sem Limites",
        capa: "/images/capas/semlimites.jpg",
        status: "publicado",
        atualizadoEm: "28/04/2025",
        progresso: 100
      }
    ];
  
    const statusBadge = {
      rascunho: { text: "Rascunho", color: "secondary" },
      revisao: { text: "Em Revisão", color: "warning" },
      publicado: { text: "Publicado", color: "success" }
    };
  </script>
  
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold">📚 Minhas Publicações</h4>
    <Button text="+ Novo Livro" color="primary" />
  </div>
  
  <div class="row">
    {#each livros as livro}
      <div class="col-md-6 col-lg-4 mb-4">
        <Card cardProps="h-100">
          <span slot="content">
            <img src={livro.capa} alt="Capa do livro" class="img-fluid rounded mb-3" />
            <h5 class="fw-semibold">{livro.titulo}</h5>
            <p class="text-muted fs-12 mb-1">Atualizado em {livro.atualizadoEm}</p>
            <SpkBadge Color={statusBadge[livro.status].color} text={statusBadge[livro.status].text} />
            <div class="progress mt-2" style="height: 5px;">
              <div class="progress-bar bg-info" style="width: {livro.progresso}%"></div>
            </div>
            <div class="d-flex gap-2 mt-3">
              <Button text="Editar" color="outline-primary" size="sm" />
              {#if livro.status !== 'publicado'}
                <Button text="Publicar" color="success" size="sm" />
              {/if}
              <Button text="Excluir" color="outline-danger" size="sm" />
            </div>
          </span>
        </Card>
      </div>
    {/each}
  </div>
  