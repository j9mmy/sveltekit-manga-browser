<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="grid gap-3 text-sm">
  <div
    class="grid gap-2 bg-destructive text-neutral-50 p-4 mt-2 mb-4 rounded-lg"
  >
    <strong>WARNING</strong>
    <p>
      The API is currently in a degraded state and is limited to 30 requests per
      minute. This is a temporary measure until the API is fully restored. This
      is not currently reflected in the headers. You will notice rate limiting
      at an X-RateLimit-Remaining value of 60 once you have exceeded the
      available 30 requests per minute. For more information click
      <a
        href="https://docs.anilist.co/guide/rate-limiting"
        class="font-bold underline"
      >
        here
      </a>.
    </p>
  </div>
  <p>
    This is a simple SvelteKit project that uses the AniList API to display and
    keep track of your favorite manga. You can browse manga, view details, and
    add them to your list in various states.
  </p>
  <p>
    Due to time constraints, this project is not as polished as I would like it
    to be.
  </p>
  <p>
    As this heavily relies on the AniList API, you may experience rate limiting
    if you make too many requests in a short period of time. The normal rate
    limit is 90 requests per minute. I have developed this website using lazy
    loading, and combined with SvelteKit's prefetching, there should be quite a
    high chance of hitting the rate limit. For example, if you were to
    mindlessly hover over the manga covers, you would hit the rate limit in no
    time as each hover triggers a request to fetch the manga details. This is
    not a bug, but intended behavior to simulate a real-world example of a
    performant website. So please be mindful of this.
  </p>
  <p>
    With the given scope, I have not implemented user authentication. Instead,
    if you have seeded the database correctly, you will be logged in by default
    as a user with the ID of 1. Any manga you add to your list will be
    associated with this user and will persist until the database is reset.
  </p>
  <strong>
    In short: seed the database, and try browsing slowly to avoid rate limiting.
  </strong>
</div>
