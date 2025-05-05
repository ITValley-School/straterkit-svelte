<script>
    import { onMount } from "svelte";
    import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
    import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
    import SpkCrmCard from "$lib/@spk/dashboards/SpkCrmCard.svelte";
    import SpkApexChart from "$lib/@spk/charts/SpkApexChart.svelte";
    import { Col, Row } from "@sveltestrap/sveltestrap";
  
    // Mock data
    let stats = [
      { title: "Livros Criados", value: "12", id: "books", iconClass: "ri-book-3-line", iconBgClass: "bg-primary", percentage: "+8%", trendClass: "text-success", linkText: "Ver todos" },
      { title: "Capítulos Escritos", value: "87", id: "chapters", iconClass: "ri-file-list-line", iconBgClass: "bg-success", percentage: "+15%", trendClass: "text-success", linkText: "Continuar" },
      { title: "Palavras escritas este mês", value: "13.456", id: "words", iconClass: "ri-edit-2-line", iconBgClass: "bg-info", percentage: "+5%", trendClass: "text-success", linkText: "Detalhes" },
      { title: "Mídias Utilizadas", value: "34", id: "media", iconClass: "ri-image-line", iconBgClass: "bg-warning", percentage: "+3%", trendClass: "text-success", linkText: "Ir para biblioteca" }
    ];
  
    let chartOptions = {
      chart: { id: "escrita-historico", type: "line" },
      xaxis: { categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] },
      series: [{ name: "Palavras", data: [340, 540, 430, 780, 660, 800, 920] }]
    };
  
    let recentBooks = [
      { title: "Vida Plena", lastEdited: "Há 2 dias", chapters: 5 },
      { title: "Sem Limites", lastEdited: "Ontem", chapters: 3 },
      { title: "A Jornada", lastEdited: "Hoje", chapters: 8 }
    ];
  
    let activities = [
      "Você escreveu 834 palavras ontem",
      "Adicionou imagem ‘versiculo_chave.jpg’ ao livro Vida Plena",
      "Criou o capítulo 2 do livro A Jornada"
    ];
  </script>
  
  <!-- Page Title -->
  <svelte:head>
    <title>Dashboard | Autor</title>
  </svelte:head>
  
  <!-- Título da Página -->
  <div class="my-4">
    <h4 class="fw-bold mb-1">Olá, bem-vindo de volta 👋</h4>
    <p class="text-muted">Aqui está um resumo da sua jornada como autor.</p>
  </div>
  
  <!-- Cards de Estatísticas -->
  <Row>
    {#each stats as stat}
      <Col xl={3} md={6} sm={12} class="mb-3">
        <SpkCrmCard {...stat} />
      </Col>
    {/each}
  </Row>
  
  <!-- Gráfico e Atividades -->
  <Row>
    <Col xl={8}>
      <SpkBasicCard cardProps="custom-card" headerTitle="Progresso semanal de escrita" cardBodyProps="">
        <div slot="content">
          <SpkApexChart id="escrita-historico" options={chartOptions} customClass="" />
        </div>
      </SpkBasicCard>
    </Col>
  
    <Col xl={4}>
      <SpkBasicCard cardProps="custom-card" headerTitle="Atividade recente" cardBodyProps="">
        <div slot="content">
          <ul class="list-group list-group-flush">
            {#each activities as act}
              <li class="list-group-item">{act}</li>
            {/each}
          </ul>
        </div>
      </SpkBasicCard>
    </Col>
  </Row>
  
  <!-- Livros Recentes -->
  <Row class="mt-4">
    <Col xl={12}>
      <SpkBasicCard cardProps="custom-card" headerTitle="Últimos livros editados" cardBodyProps="">
        <div slot="content">
          <div class="row">
            {#each recentBooks as book}
              <div class="col-md-4 mb-3">
                <div class="border rounded p-3 h-100">
                  <h6 class="fw-semibold mb-1">{book.title}</h6>
                  <p class="text-muted small mb-1">Editado: {book.lastEdited}</p>
                  <p class="text-muted small mb-2">Capítulos: {book.chapters}</p>
                  <SpkButton buttontype="button" size="sm" color="primary" text="Continuar escrevendo" />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </SpkBasicCard>
    </Col>
  </Row>
  