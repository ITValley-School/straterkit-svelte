<script>
  import { onMount } from "svelte";

  import Sidebar from "$lib/components/layout-components/sidebar/Sidebar.svelte";
  import Footer from "$lib/components/layout-components/footer/Footer.svelte";
  import Header from "$lib/components/layout-components/header/Header.svelte";
  import BackToTop from "$lib/components/layout-components/backToTop/BackToTop.svelte";
  import { themeStore } from "../../lib/components/layout-components/switcher/switcher.js";
  
  let themeLoaded = false;

  onMount(() => {
    themeStore.retrieveUserLocalStorage(); 
    themeLoaded = true; 
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
