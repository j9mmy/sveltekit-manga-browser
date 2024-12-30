<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
  import { Label } from "$lib/components/ui/label/index.ts";
  import * as Select from "$lib/components/ui/select/index.ts";

  let { data }: { data: PageData } = $props();
  let search = $state("");
  let genre = $state("All");
  let sortBy = $state("Popularity");
</script>

<div class="grid gap-4">
  <h1 class="mb-4">Browse manga</h1>
  <div class="grid gap-5 bg-background rounded">
    <div class="grid gap-3">
      <Label for="search">Title</Label>
      <div class="flex gap-2">
        <Input type="text" placeholder="Title" bind:value={search} />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      {#await data.mangaPromise}
        <div class="grid gap-3">
          <Label>Genre</Label>
          <div class="bg-gray-200 rounded animate-pulse h-10"></div>
        </div>
        <div class="grid gap-3">
          <Label>Sort by</Label>
          <div class="bg-gray-200 rounded animate-pulse h-10"></div>
        </div>
      {:then mangaData}
        <Label for="genre" class="grid gap-3">
          Genre
          <Select.Root type="single" bind:value={genre}>
            <Select.Trigger id="genre">
              {genre}
            </Select.Trigger>
            <Select.Content class="p-2 rounded border">
              <Select.Item value="All" label="All">All</Select.Item>
              {#each mangaData.genres as genre}
                <Select.Item value={genre} label={genre}>{genre}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Label>
        <Label for="sortBy" class="grid gap-3">
          Sort by
          <Select.Root type="single" bind:value={sortBy}>
            <Select.Trigger id="sortBy">
              {sortBy}
            </Select.Trigger>
            <Select.Content class="p-2 rounded border">
              <Select.Item value="Popularity" label="Popularity">
                Popularity
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </Label>
      {/await}
    </div>
    <Button>Search</Button>
  </div>

  <hr />

  {#await data.mangaPromise}
    <div class="grid grid-cols-4 gap-2">
      {#each Array(12) as _}
        <div class="aspect-[2/3] bg-gray-200 rounded animate-pulse"></div>
      {/each}
    </div>
  {:then mangaData}
    <div class="grid grid-cols-4 gap-2">
      {#each mangaData.media as manga}
        <div
          class="flex justify-center relative text-transparent font-bold hover:shadow focus:shadow"
        >
          <img
            src={manga.coverImage.large}
            loading="lazy"
            decoding="async"
            alt={manga.title.romaji}
            class="rounded object-cover"
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
  {/await}
</div>
