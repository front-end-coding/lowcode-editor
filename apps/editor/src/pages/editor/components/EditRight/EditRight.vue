<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore, useEventStore } from '@/store'
import { getMaterialEditProps, materialMap } from '@/data'
import './EditRight.less'

const projectStore = useProjectStore();
const eventStore = useEventStore();

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

const onPageNameChange = (e: Event)  => {
  const name = (e.target as HTMLInputElement).value;
  projectStore.changePageName(name)
}

const onEventSave = () => {
  eventStore.saveEvent(projectStore.currentPageIndex, projectStore.currentElementId)
}

function onEventArgsChange(e: Event, index: number) {
  const ev = e.target as HTMLInputElement;
  eventStore.saveArgs(ev.value, index);
}

</script>
<template>
  <div class="editor-right">
    <div v-if="projectStore.currentElement === undefined">
      <input
        :value="projectStore.currentPage.name"
        @input="onPageNameChange($event)"
      >
    </div>
    <div v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)">
      loading，模拟异步加载，加载组件中
    </div>
    <div v-else>
      <!-- {{ editProps }}  -->
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
        <div>
          <select
            :value="eventStore.currentType"
            @change="(e) => eventStore.onTypeChange((e.target as HTMLSelectElement).value)"
          >
            <option
              v-for="item in eventStore.editorEvents"
              :key="item.type"
            >
              {{ item.type }}
            </option>
          </select>
          <select>
            <option
              v-for="item in eventStore.currentEvents"
              :key="item.name"
            >
              {{ item.name }}
            </option>
          </select>
          <div v-if="eventStore.currentEventArgs">
            <div
              v-for="(item, index) in eventStore.currentEventArgs"
              :key="index"
            >
              <input @input="onEventArgsChange($event, index)"> 
            </div>
          </div>
          <button @click="onEventSave">
            save
          </button>
        </div>
      </div> 
    </div>
  </div>
</template>


<style scoped>
</style>