<script setup lang="ts">
import { defineProps } from 'vue'
import './index.less'

const props = defineProps<{
  src: string;
}>()

</script>
<template>
  <img :src="props.src" class="lc-image">
</template>  