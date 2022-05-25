<script setup lang="ts">
import { useProjectStore } from '@/store'
import { materialMap } from '@/data'
import VueDragResize from 'vue-drag-resize-next';
import 'vue-drag-resize-next/lib/style.css';
import './EditContent.less'

const projectStore = useProjectStore();


//封装的drag暴露的e只有height，width，x，y
const onDragEnd = (e: any, id: string) => {
  console.log('drag e', e, 123123123123, 'asdadasd', 'asdsadassdasdsadadsadadas', 'sdasdlalsdasd')
  projectStore.changeElementStyle({
    left: e.x,
    top: e.y,

  })
}

</script>
 

<template>
  <div class="editor-content">
    <div
      v-for="item in projectStore.currentPageElements"
      :key="item.id"
    >
      <VueDragResize
        :active="true"
        :x="item.style.left || 0"
        :y="item.style.top || 0"
        :width="item.style.width"
        :height="item.style.height"
        @drag-end="(e) => onDragEnd(e, item.id)"
      >
        <component
          :is="materialMap[item.mId].name"
          v-bind="item.props"
        />
      </VueDragResize>
    </div>
  </div>
</template>


<style scoped>
</style>