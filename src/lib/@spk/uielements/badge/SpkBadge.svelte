<script>
  import { Badge } from "@sveltestrap/sveltestrap";
  export let text = "";
  export let Color = "";
  export let Shadow = "";
  export let Border = "";
  export let Pill = false;
  export let Positioned = false;
  export let Indicator = false;
  export let Href = ""; // Link target
  export let CustomClass = "";
  export let onclickfunc = null; // This should be a function
</script>

<Badge
  color={Color}
  href={Href}
  shadow={Shadow}
  pill={Pill}
  indicator={Indicator}
  positioned={Positioned}
  border={Border}
  class={CustomClass}
  on:click={onclickfunc}
>
  <slot />
  {#if text}
    {@html text}
  {/if}
</Badge>
