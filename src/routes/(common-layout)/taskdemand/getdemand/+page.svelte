
<script> 

import SpkTablescomponent from "$lib/@spk/SpkTablescomponent.svelte";
import SpkBadge from "$lib/@spk/uielements/badge/SpkBadge.svelte";
import { Data1 } from "$lib/data/getdemande/getdemand.js";
import { Image } from "@sveltestrap/sveltestrap";

</script>

<SpkTablescomponent Responsive={true} tableClass="text-nowrap" header={[ { title: "Name" }, { title: "Created On" }, { title: "Number" }, { title: "Status" },]} >
{#each Data1 as idx}
  <tr>
    <th scope="row">{idx.text1}</th>
    <td>{idx.text2}</td>
    <td>{idx.text3}</td>
    <td><SpkBadge CustomClass="bg-outline-{idx.color}"  text={idx.text4} /></td>
  </tr>
{/each}
</SpkTablescomponent>