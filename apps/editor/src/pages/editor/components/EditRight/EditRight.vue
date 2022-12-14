<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore } from '@/store'
import { getMaterialEditProps, materialMap } from '@/data'
import './EditRight.less'

const projectStore = useProjectStore();

const editProps = computed(() => {
  if (projectStore.currentElement === undefined) {
    return {}
  }
  return getMaterialEditProps(materialMap[projectStore.currentElement?.mId])
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
    <div v-if="projectStore.currentElement === undefined">
      由于组件异步加载，所以未出现任何props
    </div>
    <div v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)">
      loading，模拟异步加载，加载组件中
    </div>
    <div v-else>
      {{ editProps }} 
      <div
        v-for="key in Object.keys(editProps)"
        :key="key"
      >
        <input
          v-if="editProps[key].type === 'string'"
          :value="editProps[key].defaultValue"
          @change="onPropsChange($event, key)"
        >
        <input
          v-if="editProps[key].type === 'number'"
          type="number"
          :value="editProps[key].defaultValue"
          @change="onPropsChange($event ,key)"
        >
        <input
          v-if="editProps[key].type === 'color'"
          :value="editProps[key].defaultValue"
          @change="onPropsChange($event, key)"
        >
      </div> 
    </div>
  </div>
</template>


<style scoped>
</style>