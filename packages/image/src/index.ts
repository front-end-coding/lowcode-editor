import App from './index.vue'

export default {
  render: App,
  editProps: {
    src: {
      type: 'string',
      defaultValue: 'https://m.hellobike.com/resource/helloyun/12395/46KvV_order-failed.png?x-oss-process=image/quality,q_80',
    },
  }
}