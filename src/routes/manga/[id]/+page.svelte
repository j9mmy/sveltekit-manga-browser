<script lang="ts">
  import type { PageData } from "./$types";
  import { Render } from "svelte-purify";
  import { Badge } from "$lib/components/ui/badge/index.ts";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { enhance } from "$app/forms";
  import type {
    StatusButtonProps,
    MangaListEntry,
  } from "$lib/types/manga_list_entry";
  import { LoaderCircle } from "lucide-svelte";

  let { data }: { data: PageData } = $props();
  let listEntry: MangaListEntry = $state({
    mangaId: data.id,
    status: data.userManga.status ?? null,
    score: data.userManga.score ?? null,
  });
  let loading = $state(false);

  const statusButtonProps: StatusButtonProps[] = [
    {
      status: "planning",
      text: "Set as planning",
      alt_text: "Planning...",
      variant: "secondary",
    },
    {
      status: "reading",
      text: "Set as reading",
      alt_text: "Reading...",
      variant: "default",
    },
    {
      status: "completed",
      text: "Set as completed",
      alt_text: "Completed!",
      variant: "success",
    },
    {
      status: "dropped",
      text: "Set as dropped",
      alt_text: "Dropped",
      variant: "destructive",
    },
  ];
</script>

<svelte:head>
  <title>Viewing A Manga</title>
</svelte:head>

{#await data.promise}
  <div class="grid gap-4">
    <div
      class="bg-primary bg-opacity-25 animate-pulse rounded-lg w-full h-52"
    ></div>
    <LoaderCircle
      class="text-muted-foreground place-self-center animate-spin"
    />
  </div>
{:then manga}
  {#snippet statusButton(props: StatusButtonProps)}
    <Button
      disabled={loading ||
        (manga.chapters == null && props.status == "completed")}
      type="submit"
      class="w-full"
      variant={listEntry.status == props.status ? props.variant : "outline"}
      size="sm"
      onclick={() => {
        listEntry.status == props.status
          ? (listEntry.status = null)
          : (listEntry.status = props.status);
      }}
    >
      {listEntry.status != props.status ? props.text : props.alt_text}
    </Button>
  {/snippet}

  <div class="flex relative rounded-lg max-h-52">
    {#if manga.bannerImage}
      <img
        src={manga.bannerImage}
        alt={manga.title.romaji}
        class="rounded-lg w-full object-cover"
      />
    {:else}
      <div class="bg-primary rounded-lg w-full h-52"></div>
    {/if}
    <div class="absolute right-0 p-2 h-full">
      <img
        src={manga.coverImage.large}
        alt={manga.title.romaji}
        class="rounded-lg h-full"
      />
    </div>
  </div>
  <div class="grid gap-4 mt-4 font-light text-sm">
    <div class="grid gap-4">
      <div class="flex justify-between gap-4">
        <div class="flex flex-col gap-2">
          <h3>
            {manga.title.romaji}
            {#if manga.title.romaji != manga.title.native}
              ({manga.title.native})
            {/if}
          </h3>
          <div class="flex gap-2">
            {#each manga.genres as genre}
              <Badge variant="outline">
                {genre}
              </Badge>
            {/each}
          </div>
        </div>
        <div class="flex flex-col text-end text-nowrap">
          <span>Favorites: <strong>{manga.favourites}</strong></span>
          <span>Average score: <strong>{manga.averageScore}%</strong></span>
          <span>
            Chapters:
            <strong>
              {manga.chapters ? manga.chapters : "Ongoing"}
            </strong>
          </span>
        </div>
      </div>

      <Render html={manga.description} config={{ FORBID_TAGS: ["a"] }} />

      <form
        method="POST"
        use:enhance={() => {
          loading = true;
          return async () => {
            loading = false;
          };
        }}
        class="grid gap-2"
      >
        <input type="hidden" name="mangaId" value={data.id} />
        <input type="hidden" name="title" value={manga.title.romaji} />
        <input type="hidden" name="status" value={listEntry.status} />
        <input type="hidden" name="score" value={listEntry.score} />

        <div class="flex gap-2 mt-2">
          {#each statusButtonProps as props}
            {@render statusButton(props)}
          {/each}
        </div>

        <div class="flex gap-2">
          {#each { length: 10 }, rating}
            <Button
              disabled={loading}
              type="submit"
              class="w-full"
              variant={rating + 1 == listEntry.score ? "secondary" : "outline"}
              size="sm"
              onclick={() => {
                listEntry.score == rating + 1
                  ? (listEntry.score = null)
                  : (listEntry.score = rating + 1);
              }}
            >
              {rating + 1}
            </Button>
          {/each}
        </div>
      </form>
    </div>

    {#if manga.characters.nodes.length}
      <hr />

      <div class="grid gap-2">
        <h3>Characters</h3>
        <div class="flex gap-2 pb-2 overflow-x-scroll">
          {#each manga.characters.nodes as character}
            <div class="flex flex-shrink-0 relative">
              <img
                src={character.image.medium}
                alt={character.name.full}
                class="rounded"
                width="80"
              />
              <span
                class="absolute flex justify-center items-center text-center select-none p-2 w-full h-full rounded font-bold text-transparent bg-black bg-opacity-0 hover:text-neutral-50 hover:backdrop-blur hover:bg-opacity-10 transition"
              >
                {character.name.full}
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/await}
