<script>
    import SpkTablescomponent from "$lib/@spk/SpkTablescomponent.svelte";
    import SpkBadge from "$lib/@spk/uielements/badge/SpkBadge.svelte";
    import { projetos } from "$lib/data/getdemande/projetosMock.js";
    import { Image } from "@sveltestrap/sveltestrap";
  </script>
  
  <div class="card custom-card">
    <div class="card-header">
      <div class="card-title text-white text-lg font-semibold">
        Projetos disponíveis
      </div>
    </div>
  
    <div class="card-body">
      <SpkTablescomponent
        Responsive={true}
        Bordered={true}
        tableClass="text-nowrap"
        header={[
          { title: "Tarefas" },
          { title: "Dificuldade" },
          { title: "Status" },
          { title: "Ações" },
        ]}
      >
        {#each projetos as idx (idx.nome)}
          <tr>
            <th scope="row">
              <div class="d-flex align-items-center">
                <span class="avatar avatar-xs me-2 online avatar-rounded">
                  <Image src={idx.bandeira} alt="img" />
                </span>
                {idx.nome}
              </div>
            </th>
            <td>
              <SpkBadge CustomClass={"bg-" + idx.dificuldade.toLowerCase()} text={idx.dificuldade} />
            </td>
            <td>{idx.status}</td>
            <td>
              <div class="hstack gap-2 flex-wrap">
                <a href="#!" class="text-info fs-14 lh-1">
                  <i class="ri-edit-line"></i>
                </a>
                <a href="#!" class="text-danger fs-14 lh-1">
                  <i class="ri-delete-bin-5-line"></i>
                </a>
              </div>
            </td>
          </tr>
        {/each}
      </SpkTablescomponent>
    </div>
  </div>
  