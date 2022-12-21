<script setup lang="ts">
import { defineProps } from 'vue'
import './index.less'

const props = defineProps<{
  src: string;
  events?: Record<string, any[]>
}>()

function onClick() {
  const win = window as any;
  console.log('元素内部先触发')
  win.globalEmitter.emit('common:link', props.events?.['common:link'] ?? '')
}

</script>
<template>
  <img
    :src="props.src"
    class="lc-image"
    @click="onClick"
  >
</template>  