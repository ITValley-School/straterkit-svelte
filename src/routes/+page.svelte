<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getItem } from "$lib/utility/localStorageController";

  let isAuthenticated = getItem("refreshToken");
  onMount(() => {
    goto(`/dashboards/crm`);
    if (isAuthenticated) {
    } else {
      goto(`/login `);
    }
  });
</script>
