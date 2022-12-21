import App from './index.vue'

export default {
  render: App,
  editProps: {
    src: {
      name: '图片链接：',
      type: 'string',
      placeholder: '请输入图片链接',
      defaultValue: 'https://m.hellobike.com/resource/helloyun/12395/o0dUjdcqZE.jpg?x-oss-process=image/quality,q_80',
    },

  },
}