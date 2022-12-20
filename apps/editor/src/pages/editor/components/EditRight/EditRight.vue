<script setup lang="ts">
import { computed } from 'vue';
import { useProjectStore, useEventStore } from '@/store'
import { getMaterialEditProps, materialMap, } from '@/data'
import './EditRight.less'
import {ElInput, ElSelect, ElButton, ElOption} from 'element-plus'

const projectStore = useProjectStore()
const eventStore = useEventStore()
 
const editProps = computed(() => {
  if (projectStore.currentElement === undefined) {
    return {}
  }
  return getMaterialEditProps(materialMap[projectStore.currentElement?.mId])
})


const onPropsChange = (val: string, key: string) => {
  projectStore.changeElementProps({
    [key]: val
  })
}

const onPageNameChange = (pageName: string) => {
  const name = pageName;
  projectStore.changePageName(name)
}

const onEventSave = () => {
  eventStore.saveEvent(projectStore.currentPageIndex, projectStore.currentElementId)
}

function onEventArgsChange(val: string, index: number) {
  eventStore.saveArgs(val, index)
}

 function onElementNamechange(val: string) {
  projectStore.changeElementName(val)
 }

</script>
<template>
  <div class="editor-right">
    <div
      v-if="projectStore.currentElement === undefined"
      class="page-name"
    >
      <span>页面名称：</span>
      <el-input
        v-model="projectStore.currentPage.name"
        type="text"
        size="small"
        placeholder="请输入页面名称"
        @input="onPageNameChange"
      />
    </div>
    <div v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)">
      loading，模拟异步加载，加载组件中
    </div>
    <div
      v-else
      class="editor-right-props"
    >
      <div class="element-props">
        <div class="element-props-title">
          当前元素属性如下：
        </div> 
        <div class="element-props-content">
          <div class="item">
            <span class="item-name">元素名称</span>
            <div class="item-content">
              <el-input
                v-model="projectStore.currentElementName"
                size="small"
                placeholder="请输入元素名称"
                @input="onElementNamechange"
              />
            </div>
          </div>
          <div
            v-for="key in Object.keys(editProps)"
            :key="key"
          >
            <div class="item">
              <span class="item-name">{{ editProps[key].name }}</span>
              <div class="item-content">
                <el-input
                  v-model="projectStore.currentElementPropsData[key]"
                  size="small"
                  :placeholder="editProps[key].placeholder"
                  @input="onPropsChange($event, key)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div class="event-props">
        <div class="event-props-title">
          事件属性如下：
        </div> 
        <div class="item">
          <span class="item-name">事件类型：</span>
          <div class="item-content">
            <el-select
              v-model="eventStore.currentType"
              size="small"
              @change="eventStore.onTypeChange"
            > 
              <el-option
                v-for="(item, index) in eventStore.editorEvents"
                :key="index"
                :label="item.type"
                :value="item.type"
              />
            </el-select>  
          </div>
        </div>
        <div class="item">
          <span class="item-name">事件类型：</span>
          <div class="item-content">
            <el-select
              v-model="eventStore.currentEventType"
              size="small"
              placeholder="请选择事件类型"
            > 
              <el-option
                v-for="(item, index) in eventStore.currentEvents"
                :key="index"
                :label="item.name"
                :value="item.name"
              />
            </el-select>  
          </div>
        </div>
        <div v-if="eventStore.currentEventArgs">
          <div
            v-for="(item, index) in eventStore.currentEventArgs"
            :key="index"
            class="item"
          >
            <span class="item-name">事件参数：</span>
            <div class="item-content">
              <el-input
                v-model="eventStore.currentEventArgValues[index]"
                size="small"
                placeholder="请输入事件参数"
                @input="onEventArgsChange($event, index)"
              />
            </div>
          </div>
        </div>
        <el-button
          class="item"
          @click="onEventSave"
        >
          保存事件
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
