<script setup lang="ts">
import './EditLeft.less'
import MaterialBlockVue from '../MaterialBlock/MaterialBlock.vue';
import { materialList, getMaterialEditDefaultProps } from '@/data'
import { IMaterial, PageElement } from '@lc2048/shared'
import { useProjectStore } from '@/store'

const projectStore = useProjectStore();

const onClick = (e: Event, m: IMaterial) => {
  console.log('click', m);
  // 元素，page，project全部通过class来进行创建,每次点击都会存到store
  const ele = PageElement.create();
  ele.mId = m.id;
  ele.mVersion = m.version;
  ele.props = getMaterialEditDefaultProps(m);
  projectStore.addElement(ele);
}

</script>
<template>
  <div class="editor-left">
    <div
      v-for="item in materialList"
      :key="item.id"
      class="material"
      @click="onClick($event, item)"
    >
      <MaterialBlockVue :title="item.title" />
    </div>
  </div>
</template>
<style scoped>
</style>