import App from './index.vue';

export default {
  render: App,
  editProps: {
    title: {
      type: 'string',
      defaultValue: 'hello world'
    },
    color: {
      type: 'string',
      defaultValue: '#333'
    },
    fontSize: {
      type: 'number',
      defaultValue: 16
    }
  }
}