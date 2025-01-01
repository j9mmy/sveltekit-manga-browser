<script lang="ts">
  import { replaceState } from "$app/navigation";
  import { page } from "$app/state";
  import { searchMangaAndGenres } from "$lib/api/services/manga";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
  import { Label } from "$lib/components/ui/label/index.ts";
  import * as Select from "$lib/components/ui/select/index.ts";
  import type { PageData } from "./$types";

  let { data: pageData }: { data: PageData } = $props();
  let promise = $state(pageData.promise);
  let search = $state(pageData.filters.search);
  let genre = $state(pageData.filters.genre);
  let sortBy = $state(pageData.filters.sortBy);
  let loading = $state(false);

  async function handleSearch() {
    loading = true;

    promise = searchMangaAndGenres({ search, genre, sortBy });

    page.url.searchParams.set("title", search);
    page.url.searchParams.set("genre", genre);
    page.url.searchParams.set("sortBy", sortBy);

    replaceState(page.url, page.state);

    loading = false;
  }

  function resetFilters() {
    search = "";
    genre = "All";
    sortBy = "Popularity";

    handleSearch();
  }
</script>

<svelte:head>
  <title>Browse Manga</title>
</svelte:head>

<div class="grid gap-4">
  <h1 class="mb-4 mt-4 leading-none">Browse manga</h1>
  {#await promise}
    <!-- prettier-ignore -->
    <div class="grid gap-5 bg-background">
      <Label for="search" class="grid gap-3">
        Title
        <Input placeholder="Title" disabled value={search}>{search}</Input>
      </Label>
      <div class="grid grid-cols-2 gap-2">
        <Label for="genre" class="grid gap-3">
          Genre
          <Select.Root type="single" disabled><Select.Trigger>{genre}</Select.Trigger></Select.Root>
        </Label>
        <Label for="sortBy" class="grid gap-3">
          Sort by
          <Select.Root type="single" disabled><Select.Trigger>{sortBy}</Select.Trigger></Select.Root>
        </Label>
      </div>
      <Button disabled>Search</Button>
    </div>

    <hr />

    <div class="grid grid-cols-5 gap-2">
      <!-- prettier-ignore -->
      {#each Array(20)}
        <div class="animate-pulse bg-primary bg-opacity-25 rounded aspect-[2/3]"></div>
      {/each}
    </div>
  {:then initialData}
    {@const genres = initialData.GenreCollection}
    {@const manga = initialData.Page.media}
    <form
      class="grid gap-5"
      onsubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div class="grid gap-3">
        <Label for="search" class="flex items-start justify-between">
          Title
          <Button
            disabled={loading}
            type="button"
            variant="link"
            class="h-fit p-0 rounded-none"
            onclick={resetFilters}
          >
            Reset filters
          </Button>
        </Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          bind:value={search}
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Label for="genre" class="grid gap-3">
          Genre
          <Select.Root
            type="single"
            name="genre"
            bind:value={genre}
            allowDeselect={false}
          >
            <Select.Trigger>
              {genre}
            </Select.Trigger>
            <Select.Content class="p-2 rounded border">
              <Select.Item value="All" label="All">All</Select.Item>
              {#each genres as g}
                <Select.Item value={g} label={g}>{g}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Label>
        <Label for="sortBy" class="grid gap-3">
          Sort by
          <Select.Root
            type="single"
            name="sortBy"
            bind:value={sortBy}
            allowDeselect={false}
          >
            <Select.Trigger>
              {sortBy}
            </Select.Trigger>
            <Select.Content class="p-2 rounded border">
              <Select.Item value="Popularity" label="Popularity">
                Popularity
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </Label>
      </div>
      <Button disabled={loading} type="submit">Search</Button>
    </form>

    <hr />

    {#if !manga.length}
      <div class="flex justify-center text-muted-foreground text-sm">
        <p>No results found</p>
      </div>
    {:else}
      <div class="grid grid-cols-5 gap-2">
        {#if loading}
          {#each Array(20)}
            <div
              class="animate-pulse bg-primary bg-opacity-25 rounded aspect-[2/3]"
            ></div>
          {/each}
        {/if}
        {#each manga as manga}
          <div
            class="flex justify-center relative text-transparent font-bold hover:shadow focus:shadow"
          >
            <img
              src={manga.coverImage.large}
              decoding="async"
              alt={manga.title.romaji}
              class="rounded object-cover aspect-[2/3] {loading
                ? 'hidden'
                : ''}"
            />
            <a
              href={`/manga/${manga.id}`}
              class="absolute inset-0 flex p-4 items-center justify-center rounded select-none text-center text-opacity-0 bg-black bg-opacity-0 hover:bg-opacity-10 hover:backdrop-blur hover:text-neutral-50 focus:backdrop-blur focus:text-neutral-50 transition-all"
            >
              {manga.title.romaji}
            </a>
          </div>
        {/each}
      </div>
    {/if}
  {/await}
</div>
