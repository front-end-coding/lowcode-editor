<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  src: string;
}>()

</script>
<template>
  <img :src="props.src">
</template>  