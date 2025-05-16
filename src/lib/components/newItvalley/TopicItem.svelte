<script>
  // Importing the Button component and the TopicItem component
  import Button from "$lib/@spk/uielements/Button/SpkButton.svelte";
  import { flip } from "svelte/animate";
  import { dragHandleZone, dragHandle } from "svelte-dnd-action";

  const flipDurationMs = 300;

  export let nodes;
  export let node;
  export let onFinalize;
  export let handleAddTopic; // Function to handle adding a new topic
  export let handleDeleteTopic; // Function to handle deleting a topic
  export let handleSelectTopic; // Function to handle selecting a topic
  export let selectedTopicId; // ID of the currently selected topic

  // Reactive statement to determine if the current topic is selected
  $: isSelected = node?.id === selectedTopicId;

  const handleDndConsider = (e) => {
    node.children = e.detail.items;
  };

  const handleDndFinalize = (e) => {
    const destinationIndex = node.children.findIndex(
      (child) => child.id == e.detail.info.id
    );

    if (destinationIndex != -1) {
      const sourcePath = nodes[e.detail.info.id].indexPath;
      const destinationPath = node.indexPath;
      if (
        JSON.stringify(sourcePath) !==
        JSON.stringify([...destinationPath, destinationIndex])
      )
        onFinalize(
          nodes[e.detail.info.id].indexPath,
          node.indexPath,
          destinationIndex
        );
    }
  };
</script>

<!-- List item representing a topic -->
<div class="node-container">
  {#if node && node.indexPath?.length}
    <li
      class="list-group-item d-flex justify-content-between align-items-center {isSelected
        ? 'active'
        : ''}"
      on:click={(e) => {
        e.stopPropagation();
        handleSelectTopic(node.indexPath);
      }}
    >
      {#if node.indexPath.length > 1}
        {#if !selectedTopicId}
          <div use:dragHandle class="bi bi-grip-vertical me-2 text-muted"></div>
        {:else}
          <div class="bi bi-grip-vertical me-2 text-muted"></div>
        {/if}
      {/if}

      {node.indexPath.length == 1
        ? `Capítulo ${node.indexPath[0] + 1}. `
        : `Tópica ${node.indexPath
            .slice(1)
            .map((path) => path + 1)
            .join(".")}. `}

      <!-- Display the topic title -->
      {node.title}

      <div class="ms-auto">
        <!-- Button to add a new topic -->
        <Button
          text="+"
          color="outline-success"
          size="sm"
          customClass="me-1"
          onclickfunc={(e) => {
            e.stopPropagation();
            handleAddTopic(node.indexPath);
          }}
          disabled={!!selectedTopicId}
        />
        <!-- Button to delete the current topic -->
        <Button
          text="🗑"
          color="outline-danger"
          size="sm"
          onclickfunc={(e) => {
            e.stopPropagation();
            handleDeleteTopic(node.indexPath);
          }}
          disabled={!!selectedTopicId}
        />
      </div>
    </li>
  {/if}

  {#if node?.children}
    {#if node.indexPath.length > 0}
      <section
        use:dragHandleZone={{
          items: node.children,
          flipDurationMs,
          morphDisabled: true,
          centreDraggedOnCursor: true,
        }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each node.children as child, i (child.id)}
          <div animate:flip={{ duration: flipDurationMs }} class="item visible">
            <svelte:self
              bind:nodes
              node={nodes[child.id]}
              {onFinalize}
              {handleAddTopic}
              {handleDeleteTopic}
              {handleSelectTopic}
              {selectedTopicId}
            />
          </div>
        {/each}
      </section>
    {:else}
      <div>
        {#each node.children as child (child.id)}
          <svelte:self
            bind:nodes
            node={nodes[child.id]}
            {onFinalize}
            {handleAddTopic}
            {handleDeleteTopic}
            {handleSelectTopic}
            {selectedTopicId}
          />
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .node-container {
    margin-left: 1em;
    padding: 0.5em 0 0.5em 0.5em;
    border-left: 1px solid #eee;
  }

  section {
    width: auto;
    border: 0px solid black;
    padding: 0.4em 0 0.4em 0.4em;
    overflow-y: auto;
    min-height: 30px;
    background-color: rgba(100, 100, 100, 0.1);
  }

  .item {
    background-color: rgba(0, 100, 100, 0.1);
  }
</style>
