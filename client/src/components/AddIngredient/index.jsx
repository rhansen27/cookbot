import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const onFinish = (values) => {
  console.log('Received values of form:', values);
};
const AddIngredient = () => (
  <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Input placeholder="Recipe Name" />
    Add Ingredients
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'first']}
                rules={[
                  {
                    required: true,
                    message: 'Missing Ingredient',
                  },
                ]}
              >
                <Input placeholder="Ingredient" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'last']}
                rules={[
                  {
                    required: true,
                    message: 'Missing Amount',
                  },
                ]}
              >
                <Input placeholder="Amount" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Another Ingredient
            </Button>
          </Form.Item>
          <Form.Item>
            <TextArea  rows={4}/>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Form>
);

export default AddIngredient;