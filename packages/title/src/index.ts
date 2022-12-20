import App from './index.vue';

export default {
  render: App,
  editProps: {
    title: {
      type: 'string',
      name: '标题名称：',
      placeholder: '请输入标题名称',
      defaultValue: 'hello world'
    },
    color: {
      type: 'color',
      name: '标题颜色：',
      placeholder: '请输入标题颜色',
      defaultValue: '#333'
    },
    size: {
      type: 'number',
      name: '标题大小：',
      placeholder: '请输入标题大小',
      defaultValue: 16
    }
  }
}