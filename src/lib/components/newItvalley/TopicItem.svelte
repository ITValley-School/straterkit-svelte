<script>
  // Importing the Button component and the TopicItem component
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import TopicItem from "./TopicItem.svelte";

  // Props passed to the component
  export let chapterIndex = null; // Index of the chapter (if applicable)
  export let topic; // Topic object containing details about the topic
  export let indexPath = []; // Path to the topic in the hierarchy
  export let topicId; // Unique identifier for the topic
  export let handleAddTopic; // Function to handle adding a new topic
  export let handleDeleteTopic; // Function to handle deleting a topic
  export let onSelect; // Function to handle selecting a topic
  export let selectedTopicId; // ID of the currently selected topic

  // Reactive statement to determine if the current topic is selected
  $: isSelected = topic._id === selectedTopicId;

  // Function to handle editing a topic
  const handleEditTopic = async () => {
    onSelect(topicId, indexPath);
  };
</script>

<!-- List item representing a topic -->
<li
  class="list-group-item d-flex justify-content-between align-items-center {isSelected
    ? 'active'
    : ''}"
>
  <div class="d-flex align-items-center">
    <!-- Display chapter or topic index based on the context -->
    {chapterIndex !== null
      ? `Capítulo ${chapterIndex + 1}. `
      : `Tópica ${indexPath.map((path) => path + 1).join(".")}. `}

    <!-- Display the topic title -->
    {topic.title}
  </div>
  <div>
    <!-- Button to add a new topic -->
    <Button
      text="+"
      color="outline-success"
      size="sm"
      customClass="me-1"
      onclickfunc={() => handleAddTopic(topicId, indexPath)}
    />
    <!-- Button to edit the current topic -->
    <Button
      text="✎"
      color="outline-primary"
      size="sm"
      customClass="me-1"
      onclickfunc={handleEditTopic}
    />
    <!-- Button to delete the current topic -->
    <Button
      text="🗑"
      color="outline-danger"
      size="sm"
      onclickfunc={() => handleDeleteTopic(topicId, indexPath)}
    />
  </div>
</li>

<!-- Render child topics if they exist -->
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
