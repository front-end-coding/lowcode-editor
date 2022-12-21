import { defineStore } from 'pinia'
import { Project, IProject, PageElement, Page, IElement } from '@lc2048/shared'
import { ref, computed } from 'vue'
import { IMaterial } from '../../../../packages/shared/src/material/index';
import { loadMaterial } from '../utils';
import { getMaterialRenderFun } from '@/data'
import app from '../app'
import { getMaterialEditDefaultProps } from '../data/materials';
import { cloneDeep } from 'lodash-es'
import { uuid } from '@lc2048/shared';

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

  // 对外暴露的双向绑定的数据
  const currElementIndex = ref(0);
  const currentElementId = ref();
  const currentElementName = ref('New Element');
  const currentElementPropsData = ref({});


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

  function setCurrentElementPropsData(props) {
    currentElementPropsData.value = props
  }

  function changeElementProps(props: Record<string, any>) {
    const element = p.getPageByIndex(currentPageIndex.value).getElementById(currentElement.value.id);
    element.props = {
      ...element?.props,
      ...props
    }
    setCurrentElementPropsData(element.props)
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

  function changeElementName(name: string) {
    const element = p
      .getPageByIndex(currentPageIndex.value)
      .getElementById(currentElement.value.id);

    element.name = name;
    project.value = p.getJson();
  }

  function setCurrentElementName() {
    const element = p
      .getPageByIndex(currentPageIndex.value)
      .getElementById(currentElement.value.id);
    currentElementName.value = element.name
  }

  function setCurrentElementData(id) {
    setCurrentElement(id);
    setCurrentElementName();
    setCurrentElementPropsData(currentElement.value.props)
  }

  function deleteElement() {
    const page = p.getPageByIndex(currentPageIndex.value)
    page.removeElementById(currentElement.value.id)
    project.value = p.getJson();
  }

  function copyElement() {
    const element = cloneDeep(currentElement.value)
    element.id = uuid()
    const page = p.getPageByIndex(currentPageIndex.value);
    page.addElement(element);
    project.value = p.getJson();
  }

  return {
    project,
    currentPage,
    currentPageElements,
    currentElement,
    currentElementId,
    currentPageIndex,
    currentElementPropsData,
    currentElementName,


    changePageName,
    changeElementName,
    addPage,
    setCurrentPageIndex,
    addElement,
    changeElementProps,
    changeElementStyle,
    setCurrentElement,
    load,
    isLoaded,
    saveProject,
    setCurrentElementData,
    deleteElement,
    copyElement
  }
})