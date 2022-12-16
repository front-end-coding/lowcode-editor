import { defineStore } from 'pinia'
import { Project, IProject, PageElement, Page } from '@lc2048/shared'
import { ref, computed } from 'vue'
import { IMaterial } from '../../../../packages/shared/src/material/index';
import { loadMaterial } from '../utils';
import { getMaterialRenderFun } from '@/data'
import app from '../app'
import { getMaterialEditDefaultProps } from '../data/materials';


// {}可以理解为对象，function或者实例都不可被proxy代理
export const p = Project.create();

export const useProjectStore = defineStore('project', () => {
  const materials = ref<Record<string, IMaterial>>({})
  const project = ref<IProject>(p.getJson());
  const currentPageIndex = ref(0);
  const currentPage = computed(
    () => project.value.pages[currentPageIndex.value]
  );

  const currentPageElements = computed(
    () => currentPage.value.elements
  )

  const currElementIndex = ref(0)
  const currentElementId = ref();

  const currentElement = computed(() => {
    if (currentElementId.value) {
      return p
        .getPageByIndex(currentPageIndex.value)
        .getElementById(currentElementId.value)
    }
    // 默认返回第一个
    return currentPageElements.value[currElementIndex.value]
  });

  function setCurrentElement(id: string) {
    currentElementId.value = id
  }

  function changeElementProps(props: Record<string, any>) {
    const element = p.getPageByIndex(currentPageIndex.value).getElementById(currentElement.value.id);
    element.props = {
      ...element.props,
      ...props
    }
    project.value = p.getJson();
  }

  function changeElementStyle(style: Record<string, any>) {
    const element = p
      .getPageByIndex(currentPageIndex.value)
      .getElementById(currentElement.value.id);
    element.style = {
      ...element.style,
      ...style,
    };
    project.value = p.getJson();
  }

  function addElement(ele: PageElement) {
    currentElementId.value = ele.id;
    p.getPageByIndex(currentPageIndex.value).addElement(ele);
    // 更新数据
    project.value = p.getJson();
  }

  function isLoaded(mid) {
    return materials.value[mid]
  }

  async function load(material) {
    if (isLoaded(material.id)) {
      return;
    }
    await loadMaterial(material);
    const renderFun = getMaterialRenderFun(material);
    app.component(material.name, renderFun);
    // update material
    materials.value = {
      ...materials.value,
      [material.id]: material
    }
    changeElementProps(getMaterialEditDefaultProps(material))
  }

  function saveProject() {
    localStorage.setItem('__project', JSON.stringify(p.getJson()))
  }

  function setCurrentPageIndex(index: number) {
    currentPageIndex.value = index;
  }

  function addPage() {
    const page = Page.create();
    p.addPage(page);
    project.value = p.getJson();
  }

  function changePageName(name: string) {
    const page = p.getPageByIndex(currentPageIndex.value);
    page.name = name;
    project.value = p.getJson();
  }

  return {
    project,
    currentPage,
    currentPageElements,
    currentElement,
    currentElementId,
    currentPageIndex,


    changePageName,
    addPage,
    setCurrentPageIndex,
    addElement,
    changeElementProps,
    changeElementStyle,
    setCurrentElement,
    load,
    isLoaded,
    saveProject,
  }
})