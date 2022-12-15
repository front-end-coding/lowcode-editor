import { IMaterial } from '@lc2048/shared'

export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const sc = document.createElement('script');
    function onLoad() {
      resolve(src);
      sc.onload = sc.onerror = null;
    }
    sc.onload = onLoad;
    sc.onerror = reject;
    sc.src = src;
    sc.crossOrigin = 'anonymous';
    document.head.append(sc);
    //暂用替换所有
    loadCss(src.replace(/.*/, '/style.css'));
  })
}

export function loadCss(src: string) {
  return new Promise((resolve, reject) => {
    const sc = document.createElement('link');
    function onLoad() {
      resolve(src);
      sc.onload = sc.onerror = null;
    }
    sc.rel = 'stylesheet';
    sc.onload = onLoad;
    sc.onerror = reject;
    sc.href = src;
    sc.crossOrigin = 'anonymous';
    document.head.append(sc);
  })
}


function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export async function loadMaterial(materials: IMaterial) {
  // 模拟异步请求组件
  await delay(Math.random() * 1000);
  return loadScript(materials.source)
}

export function loadMaterials(materials: IMaterial[]) {
  return Promise.all(materials.map((m) => loadMaterial(m)))
}

