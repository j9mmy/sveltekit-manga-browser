<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.ts";
  import { LoaderCircle } from "lucide-svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="grid gap-4 text-sm">
  {#await data.promise}
    <div class="flex justify-between items-end gap-4 mt-4 mb-2">
      <h1 class="leading-none">Profile</h1>
    </div>

    <hr />

    <h3>Your list</h3>
    <div class="grid gap-2">
      <LoaderCircle class="place-self-center animate-spin" />
    </div>
  {:then initialData}
    {@const user = initialData.user}
    {@const listEntries = initialData.listEntries}

    <div class="flex justify-between items-end gap-4 mt-4 mb-2">
      <h1 class="leading-none">Profile</h1>
      <div class="flex gap-4 text-end">
        <strong>{user.name}</strong>
        —
        <p>Age: <strong>{user.age}</strong></p>
      </div>
    </div>

    <hr />

    <h3>Your list</h3>
    <div class="grid gap-2">
      {#if listEntries.length}
        <div
          class="grid grid-cols-8 items-center gap-x-4 gap-y-1 text-muted-foreground"
        >
          <p class="mb-2 text-center">Manga ID</p>
          <p class="mb-2 col-span-4">Title</p>
          <p class="mb-2 col-span-2">Status</p>
          <p class="mb-2">Score</p>
          {#each listEntries as entry}
            <Button
              href="/manga/{entry.mangaId}"
              variant="outline"
              size="sm"
              class="p-0 grid grid-cols-8 col-span-8 gap-x-4 text-primary"
              data-sveltekit-preload-data="tap"
            >
              <p class="text-center">{entry.mangaId}</p>
              <strong class="col-span-4">{entry.title}</strong>
              <p class="col-span-2 capitalize">{entry.status ?? "None"}</p>
              <p>{entry.score ?? "None"}</p>
            </Button>
          {/each}
        </div>
      {:else}
        <p class="text-muted-foreground">No entries found</p>
      {/if}
    </div>
  {/await}
</div>
