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
    return {}
  }
  return projectStore.currentElement.props
})


const onPropsChange = (e: Event, key: string) => {
  projectStore.changeElementProps({
    [key]: (e.target as HTMLInputElement).value
  })
  console.log(projectStore.currentElement)
};


const isShow = computed(() => editProps.value !== undefined)
</script>
<template>
  <div class="editor-right">
    {{ elementProps }}
    <div
      v-for="key in Object.keys(elementProps)"
      :key="key"
    >
      <input
        v-if="elementProps[key].type === 'string'"
        :value="elementProps[key].defaultValue"
        @change="onPropsChange($event, key)"
      >
      <input
        v-if="elementProps[key].type === 'number'"
        type="number"
        :value="elementProps[key].defaultValue"
        @change="onPropsChange($event ,key)"
      >
      <input
        v-if="elementProps[key].type === 'color'"
        :value="elementProps[key].defaultValue"
        @change="onPropsChange($event, key)"
      >
    </div>  
  </div>
</template>


<style scoped>
</style>