<script setup lang="ts">
import './MaterialBlock.less'

interface IProps {
  title: string
}

const props = defineProps<IProps>()

</script>

<template>
  <div class="material-block">{{ props.title }}</div>
</template>