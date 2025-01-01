<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button/index.ts";
</script>

<h1>{page.error?.message}</h1>
<p>
  Still want to browse? Click
  <Button href="/manga" variant="link" class="p-0 text-base font-bold">
    here
  </Button>.
</p>
