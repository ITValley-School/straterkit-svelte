<script>
  import { onMount } from "svelte";

  import Sidebar from "$lib/components/layout-components/sidebar/Sidebar.svelte";
  import Footer from "$lib/components/layout-components/footer/Footer.svelte";
  import Header from "$lib/components/layout-components/header/Header.svelte";
  import BackToTop from "$lib/components/layout-components/backToTop/BackToTop.svelte";
  import { themeStore } from "../../lib/components/layout-components/switcher/switcher.js";
  import { userData } from "$lib/store/userStore.js";

  export let data;

  let themeLoaded = false;

  onMount(async () => {
    themeStore.retrieveUserLocalStorage();
    themeLoaded = true;

    if (data?.user) userData.set(data.user);
  });
</script>

{#if themeLoaded}
  <div class="page">
    <Header />
    <Sidebar />
    <div class="main-content app-content">
      <div class="container-fluid py-4 px-3">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
  <BackToTop />
{/if}

<!--
export const prerender = true;
export const ssr = true;-->
