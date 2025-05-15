<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getItem } from "$lib/utility/localStorageController";

  let isAuthenticated = getItem("refreshToken");
  onMount(() => {
    if (isAuthenticated) {
      goto(`/dashboards/crm`);
    } else {
      goto(`/login `);
    }
  });
</script>
