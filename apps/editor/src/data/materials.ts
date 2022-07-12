import { IMaterial } from '@lc2048/shared'
// 这里是左侧物料列表
export const materialList: IMaterial[] = [{
  id: 1,
  name: 'lcImage',
  title: '图片1',
  type: 'component',
  categoty: {
    name: '基础组件'
  },
  version: '0.0.1',
  source: '/lc-image.0.0.1.umd.js',
  thumbnail: '',
  data: [
    {
      version: '0.0.1',
      source: '/lc-image.0.0.1.umd.js'
    }
  ]
},
{
  id: 2,
  name: 'lcTitle',
  title: '标题1',
  type: 'component',
  categoty: {
    name: '基础组件'
  },
  version: '0.0.1',
  source: '/lc-title.0.0.1.umd.js',
  thumbnail: '',
  data: [
    {
      version: '0.0.1',
      source: '/lc-title.0.0.1.umd.js'
    }
  ]
}]

export const materialMap: { [key: string]: IMaterial } = materialList.reduce(
  (prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {})


export function getMaterialEditProps(material: IMaterial) {
  return (window as any)[material.name].editProps
}

export function getMaterialEditRenderFun(material: IMaterial) {
  return (window as any)[material.name].render
}

export function getMaterialEditDefaultProps(material: IMaterial) {
  const props = getMaterialEditProps(material);
  return Object.keys(props).reduce((prev, key) => {
    prev[key] = props[key].defaultValue
    return prev;
  }, {})
}