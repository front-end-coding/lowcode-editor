<script lang="ts" setup>
import { ref } from 'vue'
import './ContextMenu.less'

const menu = [{
  name: '复制',
  type: 'copy'
}, {
  name: '删除',
  type: 'delete'
}]
const selectItemIdx = ref();
const emits = defineEmits(['select'])

const props = withDefaults(
  defineProps<{
    left?: number
    top?: number
  }>(),
  {
    left: 9999,
    top: 9999,
  }
)


function onMouseMove(index) {
  selectItemIdx.value = index
}
</script>

<template>
  <div
    class="context-menu-wrapper"
    :style="{
      position: 'absolute',
      left: props.left + 'px',
      top: props.top + 'px',
    }"
  >
    <div
      v-for="(item, index) in menu"
      :key="item.type"
      :class="['item', selectItemIdx === index ? 'active' : '']"
      @mousemove="onMouseMove(index)"
      @click="emits('select', item.type)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
