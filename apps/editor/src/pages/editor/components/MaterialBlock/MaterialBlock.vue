<script setup lang="ts">
import './MaterialBlock.less'

interface IProps {
  title: string
  thumbnail: string
}

const props = defineProps<IProps>()

</script>

<template>
  <div class="material-block">
    <div class="img">
      <img
        :src="props.thumbnail"
      >
    </div>
  
    <div class="desc">
      {{ props.title }}
    </div>  
  </div>
</template>