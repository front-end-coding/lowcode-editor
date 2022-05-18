<script setup lang="ts">
import './EditLeft.less'
import MaterialBlockVue from '../MaterialBlock/MaterialBlock.vue';
import { materialList } from '@/data'
import { IMaterial } from '@lc2048/shared'

const onClick = (e: Event, m: IMaterial) => {
  console.log('click', m)
}

</script>
<template>
  <div class="editor-left">
    <div v-for="item in materialList" :key="item.id" class="material"
      @click="onClick($event, item)">
      <MaterialBlockVue :title="item.title" />
    </div>
  </div>
</template>
<style scoped>
</style>