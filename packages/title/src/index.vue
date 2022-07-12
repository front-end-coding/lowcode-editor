<script lang='ts' setup>
import './index.less'
const props = defineProps<{
  title: string;
  color: string;
  size: number;
}>()
</script>

<template>
  <div
    class="lc-title"
    :style="{
      color: props.color,
      fontSize: props.size
    }"
  >
    {{ props.title }}
  </div>  
</template>
<style scoped>
</style>