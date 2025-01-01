<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.ts";
  import { Moon, Sun } from "lucide-svelte";
  import "../app.css";
  import { ModeWatcher, toggleMode } from "mode-watcher";
  let { children } = $props();
</script>

<nav
  class="flex w-fit mx-auto items-center backdrop-blur rounded bg-background bg-opacity-50 text-primary font-extrabold shadow sticky top-2 z-50"
>
  <Button href="/" size="sm" variant="link">Home</Button>
  <Button href="/manga" size="sm" variant="link">Browse</Button>
  <Button href="/profile" size="sm" variant="link">Profile</Button>
  <Button onclick={toggleMode} variant="ghost" size="sm_icon">
    <Sun class="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</nav>

<ModeWatcher />

<div class="mx-auto min-h-screen p-4 max-w-3xl">
  {@render children()}
</div>
