import App from './index.vue';

export default {
  render: App,
  editProps: {
    title: {
      type: 'string',
      defaultValue: 'hello world'
    },
    color: {
      type: 'color',
      defaultValue: '#333'
    },
    size: {
      type: 'number',
      defaultValue: 16
    }
  }
}