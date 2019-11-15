const exampleSchema = {
  $id: 'form_example',
  type: 'object',
  properties: {
    exact: {
      type: 'string',
      exactDecimal: 2,
      messages: {
        exactDecimal: 'Invalid float number',
        required: 'Required field',
      },
    },
  },
  required: ['exact'],
};

module.exports = [exampleSchema];
