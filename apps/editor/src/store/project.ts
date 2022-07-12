import { defineStore } from 'pinia'
import { Project, IProject, PageElement } from '@lc2048/shared'
import { ref, computed } from 'vue'


// {}可以理解为对象，function或者实例都不可被proxy代理
const p = Project.create();

export const useProjectStore = defineStore('project', () => {
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

  function setCurrentElementId(id: string) {
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
    console.log(999, style)
    project.value = p.getJson();
  }

  function addElement(ele: PageElement) {
    currentElementId.value = ele.id;
    p.getPageByIndex(currentPageIndex.value).addElement(ele);
    // 更新数据
    project.value = p.getJson();
  }

  return {
    project,
    currentPage,
    currentPageElements,
    currentElement,
    currentElementId,

    addElement,
    changeElementProps,
    changeElementStyle,
    setCurrentElementId
  }
})