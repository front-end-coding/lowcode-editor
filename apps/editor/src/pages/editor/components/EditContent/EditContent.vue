<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProjectStore } from '@/store'
import { materialMap } from '@/data'
import VueDragResize from 'vue-drag-resize-next';
import 'vue-drag-resize-next/lib/style.css';
import './EditContent.less'

const projectStore = useProjectStore();
let pageWidth = 0;
let pageHeight = 0;
const pageRef = ref<HTMLElement>();

onMounted(() => {
  if (pageRef.value) {
    pageWidth = pageRef.value.offsetWidth;
    pageHeight = pageRef.value.offsetHeight;
  }
})

//封装的drag暴露的e只有height，width，x，y
const onDragEnd = (e: any) => {
  let {x, y, ...rest} = e;
  x = Math.min(Math.max(x, 0), pageWidth - rest.width);
  y = Math.min(Math.max(0, y), pageHeight - rest.height);

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
      ref="pageRef"
      class="editor-body-page"
    >
      <div
        v-for="item in projectStore.currentPageElements"
        :key="item.id"
      >
        <VueDragResize
          :active="projectStore.currentElement?.id === item.id"
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
            v-if="projectStore.isLoaded(item.mId)"
            v-bind="item.props"
          />
          <div v-else>
            loading
          </div> 
        </VueDragResize>
      </div>
    </div>
  </div>  
</template>


<style scoped>
</style>