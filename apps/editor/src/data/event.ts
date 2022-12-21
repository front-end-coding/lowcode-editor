import { TinyEmitter } from 'tiny-emitter'
import { reactive } from 'vue';

const globalEmitter = new TinyEmitter();
const win = window as any;
win.globalEmitter = globalEmitter;

globalEmitter.on('common:link', args => {
  // 当前编辑页面不触发任何事件，预览才行
  if (location.hash !== '#/preview') {
    return
  }
  console.log('args', args, typeof args);
  if (Array.isArray(args) && args.length === 1) {
    window.open(args[0], '_blank')
  }
});

const editorEvents = reactive([
  {
    type: 'common',
    events: [
      {
        name: 'link',
        args: [
          {
            type: 'string',
          }
        ]
      }
    ]
  },
  {
    type: 'component',
    events: []
  }
])


export {
  editorEvents,
  globalEmitter
}
