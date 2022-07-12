<script setup lang="ts">
import { useProjectStore } from '@/store'
import { materialMap } from '@/data'
import VueDragResize from 'vue-drag-resize-next';
import 'vue-drag-resize-next/lib/style.css';
import './EditContent.less'

const projectStore = useProjectStore();

//封装的drag暴露的e只有height，width，x，y
const onDragEnd = (e: any) => {
  console.log('draging', e)
  let {x, y, ...rest} = e;
  x = Math.max(0, x);
  x = Math.min(x, 490-rest.width);
  y = Math.max(0, y);
  y = Math.min(y, 630-rest.height);

  projectStore.changeElementStyle({
    left: x,
    top: y,
    width: rest.width,
    height: rest.height
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
        :active="projectStore.currentElement?.id=== item.id"
        :x="item.style.left || 0"
        :y="item.style.top || 0"
        :width="item.style.width"
        :height="item.style.height"
        :rotatable="false"
        :immediate="true"
        @click="projectStore.setCurrentElementId(item.id)"
        @dragging="onDragEnd"
        @resizing="onDragEnd"
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