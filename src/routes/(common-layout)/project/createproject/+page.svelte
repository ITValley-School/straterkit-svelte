<script>
  import Card from '$lib/@spk/SpkBasicCard.svelte';
  import Button from '$lib/@spk/uielements/Button/SpkButton.svelte';
  import { Input, Label } from '@sveltestrap/sveltestrap';
  import { gerarEntregaveis } from '$lib/data/project/createprojectdemand.js';
  import Tabela from '$lib/@spk/SpkTablescomponent.svelte'


  let nomeProjeto = '';
  let descricaoProjeto = '';
  let carregando = false;
  let entregaveisJson = null;

  async function gerar() {
    carregando = true;

    const prompt = `
      Projeto: ${nomeProjeto}
      ${descricaoProjeto}
    `.trim();

    try {
      entregaveisJson = await gerarEntregaveis(prompt);
    } catch (erro) {
      console.error('Erro ao gerar entregáveis:', erro);
    }

    carregando = false;
  }
</script>

<div class="row">
  <div class="col-md-8">
    <Card headerTitle="Cadastrar Novo Projeto">
      <span slot="content">
        <div class="row g-3">
          <div class="col-md-12">
            <Label for="nomeProjeto">Nome do Projeto</Label>
            <Input id="nomeProjeto" type="text" bind:value={nomeProjeto} />
          </div>
          <div class="col-12">
            <Label for="descricaoProjeto">Descrição do Sistema Desejado</Label>
            <Input
              id="descricaoProjeto"
              type="textarea"
              rows="6"
              bind:value={descricaoProjeto}
              placeholder="Ex: Quero um sistema que gerencie tarefas dos meus alunos, com upload de código, painel de progresso, e controle de acesso por perfil..."
              maxlength="2000"
            />
          </div>
        </div>
      </span>
    </Card>

    <div class="d-flex justify-content-end mt-4">
      <Button
        text={carregando ? "Gerando Entregáveis..." : "Gerar Entregáveis"}
        color="success"
        onclickfunc={gerar}
        disabled={carregando}
      />
    </div>

{#if entregaveisJson}
  <Card headerTitle="Entregáveis Gerados" class="mt-4">
    <span slot="content">
      <Tabela
        header={[
          { title: "Entregável", headerClassname: "text-start" },
          { title: "Tarefa", headerClassname: "text-start" },
          { title: "Tempo (h)", headerClassname: "text-center" },
          { title: "Descrição", headerClassname: "text-start" },
          { title: "Critérios", headerClassname: "text-start" }
        ]}
        striped={true}
        bordered={true}
        hover={true}
        Responsive={true}
        tableClass="table align-middle"
        headerClass="table-light"
      >
        {#each entregaveisJson.entregaveis as entregavel}
          {#each entregavel.tarefas as tarefa}
            <tr>
              <td>{entregavel.nome}</td>
              <td>{tarefa.nome}</td>
              <td class="text-center">{tarefa.tempo_estimado}</td>
              <td>{tarefa.descricao}</td>
              <td>
                <ul class="mb-0 ps-3">
                  {#each tarefa.criterios_de_aceitacao as criterio}
                    <li>{criterio}</li>
                  {/each}
                </ul>
              </td>
            </tr>
          {/each}
        {/each}
      </Tabela>
    </span>
  </Card>
{/if}
  </div>
</div>
