<script>
    import Button from '$lib/@spk/uielements/Button/SpkButton.svelte';
    import TopicItem from './TopicItem.svelte';
  
    export let topic;
  </script>
  
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <i class="bi bi-grip-vertical me-2 text-muted cursor-move"></i>
      {topic.title}
    </div>
    <div>
      <Button text="+" color="outline-success" size="sm" customClass="me-1" />
      <Button text="✎" color="outline-primary" size="sm" customClass="me-1" />
      <Button text="🗑" color="outline-danger" size="sm" />
    </div>
  </li>
  
  {#if topic.children && topic.children.length > 0}
    <ul class="list-group ms-4 mt-1">
      {#each topic.children as child}
        <TopicItem topic={child} />
      {/each}
    </ul>
  {/if}
  