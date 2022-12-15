import { IProject } from '@lc2048/shared'
import { materialMap, getMaterialRenderFun } from '@/data';
import { loadMaterial, } from '@/utils';
import { onMounted, ref } from 'vue';
import app from '@/app'

export function useMaterial() {
  const project: IProject = JSON.parse(localStorage.getItem('__project') || '{}');

  const materials = project.pages[0].elements.map(item => materialMap[item.mId]);

  const loading = ref(false);

  onMounted(() => {
    loading.value = true;
    Promise.all(materials.map(loadMaterial)).then(() => {
      loading.value = false;
      materials.forEach(m => {
        app.component(m.name, getMaterialRenderFun(m));
      });
    })
  })

  return {
    loading,
    pages: project.pages
  }
}