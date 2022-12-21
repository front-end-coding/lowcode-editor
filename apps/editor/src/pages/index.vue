<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRouter()

onMounted(() => {
  route.push('./editor')
})

</script>
<template>
  hello index
</template>