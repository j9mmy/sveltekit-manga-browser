<script lang="ts">
  import type { PageData } from "./$types";
  import { Render } from "svelte-purify";
  import { Badge } from "$lib/components/ui/badge/index.ts";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { enhance } from "$app/forms";

  type UserDataProps = {
    status: "planning" | "reading" | "completed" | "dropped" | null;
    score: number | null;
  };

  let { data }: { data: PageData } = $props();
  let userData: UserDataProps = $state({
    mangaId: data.id,
    status: data.userManga.status,
    score: data.userManga.score,
  });
</script>

{#await data.mangaPromise}
  <h1>Loading...</h1>
{:then manga}
  <div class="flex relative rounded-lg max-h-52">
    <img
      src={manga.bannerImage}
      alt={manga.title.romaji}
      class="rounded-lg w-full object-cover"
    />
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

      <form method="POST" use:enhance class="grid gap-2">
        <input type="hidden" name="mangaId" value={data.id} />
        <input type="hidden" name="status" value={userData.status} />
        <input type="hidden" name="score" value={userData.score} />

        <div class="flex gap-2 mt-2">
          <Button
            type="submit"
            class="w-full"
            variant={userData.status == "planning" ? "secondary" : "outline"}
            size="sm"
            onclick={() => {
              userData.status == "planning"
                ? (userData.status = null)
                : (userData.status = "planning");
            }}
          >
            {userData.status != "planning" ? "Set as planning" : "Planned..."}
          </Button>
          <Button
            type="submit"
            class="w-full"
            variant={userData.status == "reading" ? "default" : "outline"}
            size="sm"
            onclick={() => {
              userData.status == "reading"
                ? (userData.status = null)
                : (userData.status = "reading");
            }}
          >
            {userData.status != "reading" ? "Set as reading" : "Reading..."}
          </Button>
          <Button
            type="submit"
            class="w-full"
            variant={userData.status == "completed" ? "success" : "outline"}
            size="sm"
            disabled={manga.chapters == null}
            onclick={() => {
              userData.status == "completed"
                ? (userData.status = null)
                : (userData.status = "completed");
            }}
          >
            {userData.status != "completed" ? "Set as completed" : "Completed!"}
          </Button>
          <Button
            type="submit"
            class="w-full"
            variant={userData.status == "dropped" ? "destructive" : "outline"}
            size="sm"
            onclick={() => {
              userData.status == "dropped"
                ? (userData.status = null)
                : (userData.status = "dropped");
            }}
          >
            {userData.status != "dropped" ? "Set as dropped" : "Dropped"}
          </Button>
        </div>

        <div class="flex gap-2">
          {#each { length: 10 }, rating}
            <Button
              type="submit"
              class="w-full"
              variant={rating + 1 == userData.score ? "secondary" : "outline"}
              size="sm"
              onclick={() => {
                userData.score == rating + 1
                  ? (userData.score = null)
                  : (userData.score = rating + 1);
              }}
            >
              {rating + 1}
            </Button>
          {/each}
        </div>
      </form>
    </div>

    <hr />

    <div class="grid gap-2">
      <h3>Characters</h3>
      <div class="flex flex-nowrap gap-2 pb-2 h-40 overflow-x-scroll">
        {#each manga.characters.nodes as character}
          <div class="flex flex-shrink-0 relative">
            <img
              src={character.image.medium}
              alt={character.name.full}
              class="rounded aspect-auto"
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
  </div>
{:catch error}
  <h1>Error</h1>
  <p>{error.message}</p>
{/await}
