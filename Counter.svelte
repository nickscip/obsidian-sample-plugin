<script lang="ts">
  interface Props {
    startCount: number;
  }

  let {
    startCount
  }: Props = $props();

  let count = $state(startCount);

  export function increment() {
    count += 1;
  }
</script>

<div class="number">
  <span>Mi numero es {count}!</span>
</div>

<style>
  .number {
    color: red;
  }
</style>
