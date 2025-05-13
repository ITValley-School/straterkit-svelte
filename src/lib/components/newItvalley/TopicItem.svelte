<script>
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import TopicItem from "./TopicItem.svelte";

  export let topic;
  export let indexPath = [];
  export let topicId;
  export let handleAddTopic;
  export let handleDeleteTopic;
  export let onSelect;
  export let selectedTopicId;

  $: isSelected = topic._id === selectedTopicId;

  const handleEditTopic = async () => {
    onSelect(topicId, indexPath);
  };
</script>

<li
  class="list-group-item d-flex justify-content-between align-items-center {isSelected
    ? 'active'
    : ''}"
>
  <div class="d-flex align-items-center">
    {topic.title}
  </div>
  <div>
    <Button
      text="+"
      color="outline-success"
      size="sm"
      customClass="me-1"
      onclickfunc={() => handleAddTopic(topicId, indexPath)}
    />
    <Button
      text="✎"
      color="outline-primary"
      size="sm"
      customClass="me-1"
      onclickfunc={handleEditTopic}
    />
    <Button
      text="🗑"
      color="outline-danger"
      size="sm"
      onclickfunc={() => handleDeleteTopic(topicId, indexPath)}
    />
  </div>
</li>

{#if topic.children && topic.children.length > 0}
  <ul class="list-group ms-4 mt-1">
    {#each topic.children as child, i}
      <TopicItem
        topic={child}
        {topicId}
        indexPath={[...indexPath, i]}
        {handleAddTopic}
        {handleDeleteTopic}
        {onSelect}
        {selectedTopicId}
      />
    {/each}
  </ul>
{/if}
