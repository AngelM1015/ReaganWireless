<script lang="ts">
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
// Doesn't work with SSR^  Supposedly the .meta.url file is not supported
</script>