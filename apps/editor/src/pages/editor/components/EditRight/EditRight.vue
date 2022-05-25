<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore } from '@/store'
import { getMaterialEditProps, materialMap } from '@/data'
import './EditRight.less'

const projectStore = useProjectStore();

const editProps = computed(() => {
  if (projectStore.currentElement === undefined) {
    return undefined
  }
  return getMaterialEditProps(materialMap[projectStore.currentElement?.mId])
})

const elementProps = computed(() => {
  if (projectStore.currentElement === undefined) {
    return undefined
  }
  return projectStore.currentElement.props
})


const onPropsChange = (e: Event) => {
  projectStore.changeElementProps({
    src: (e.target as HTMLInputElement).value
  })
  console.log(projectStore.currentElement)
};


const isShow = computed(() => editProps.value !== undefined)
</script>
<template>
  <div class="editor-right">
    <input v-if="isShow" type="text" :value="elementProps.src" @change="onPropsChange($event)">
  </div>
</template>


<style scoped>
</style>