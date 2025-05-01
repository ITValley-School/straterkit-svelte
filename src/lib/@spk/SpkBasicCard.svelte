<script>
    export let cardProps = '';
    export let headerTitle = '';
    export let headerTitleProps = '';
    export let cardBodyProps = '';
    export let cardFooterProps = '';
    export let Headerprops ="";
    export let cardBodyId =null;
    export let CardId =null;
  </script>
   
  <div class="card custom-card {cardProps}" id={CardId}>
    {#if $$slots.customheader}
    <div class="card-header {Headerprops}"> 
        {#if headerTitle}
          <div class="card-title {headerTitleProps}">
            {headerTitle}
          </div>
        {/if}
      <slot name="customheader" />
      <slot/>
    </div>
    {/if}
    {#if $$slots.content}
      <div class="card-body {cardBodyProps}" id={cardBodyId}>
        <slot name="content" />
      </div>
    {/if} 
    {#if $$slots.footer}
      <div class="card-footer {cardFooterProps}">
        <slot name="footer" />
      </div>
    {/if}
  </div>