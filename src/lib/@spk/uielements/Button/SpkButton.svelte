<script>
  import { Button } from "@sveltestrap/sveltestrap";

  export let text = '';
  export let color = '';
  export let size = '';
  export let id = '';
  export let href = ''; // Link target
  export let disabled = false;
  export let active = false;
  export let outline = false;
  export let customClass = '';
  export let buttontype = 'button';
  export let onclickfunc= null // This should be a function
  export let as = 'button'; // Default to button
  export let value = ''; // Value for input
  
</script>

{#if as === 'input'}
  <input 
    type={buttontype} 
    class= {customClass} 
    role="button" 
    value={value} 
    on:click={onclickfunc}
  />
{:else if href}
  <a 
    class={`btn btn-${color} ${size}  ${customClass}`} 
    href={href} id={id}
    on:click={onclickfunc} 
    aria-disabled={disabled} 
  >
    {#if text}
      {@html text}
    {/if}
    <slot />
  </a>
{:else}
  <Button id={id}
    outline={outline}
    active={active} 
    color={color} 
    size={size} 
    type={buttontype} 
    class={customClass} 
    on:click={onclickfunc} 
    disabled={disabled}
  > 
  
    {#if text}
      {@html text}
    {/if}
    <slot />
  </Button>
{/if}
