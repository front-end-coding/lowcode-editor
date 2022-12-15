<script setup lang="ts">
import './EditLayout.less'
import EditLeft from '../EditLeft/EditLeft.vue'
import EditRight from '../EditRight/EditRight.vue'
import EditContent from '../EditContent/EditorContent.vue';

</script>
<template>
  <div class="editor-layout">
    <div class="editor-layout-left">
      <EditLeft />
    </div>
    <div class="editor-layout-content">
      <EditContent />
    </div>
    <div class="editor-layout-right">
      <EditRight />
    </div>
  </div>
</template>


<style scoped>
</style>