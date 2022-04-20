import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Button, Form, Select, Input } from 'antd';

import ChromeMethods from '@/utils/chrome_methods';
import "./index.less"

const INIT_FORM_DATA = {
  method: "GET",
  url: '',
  resp: '{}'
}

const CreateRequest = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm();

  // form data 缓存
  const handleSaveFormData = (key, val) => {
    ChromeMethods.ChromeGetRequestFormData(initialValues => {
      const formData = { ...initialValues }
      formData[key] = val
      ChromeMethods.ChromeSetLocalStorge('reqFormData', JSON.stringify(formData), () => {
      })
    })

  }

  // 创建请求
  const onFinish = (values) => {
    ChromeMethods.ChromeGetMockRequestList((list) => {
      ChromeMethods.ChromeSetMockRequestList(JSON.stringify([...list, values]), () => {
        ChromeMethods.ChromeSetLocalStorge('page', '/', () => {
          navigate('/')
        })
      })
    })
  };
  // 重置表单
  const resetForm = () => {
    ChromeMethods.ChromeSetLocalStorge('reqFormData', JSON.stringify(INIT_FORM_DATA), () => {
      form.resetFields()
    })
  }
  // 返回主页
  const toBackHome = () => {
    ChromeMethods.ChromeSetLocalStorge('reqFormData', JSON.stringify(INIT_FORM_DATA), () => {
      ChromeMethods.ChromeSetLocalStorge('page', '/', () => {
        navigate('/')
      })
    })
  }

  useEffect(() => {
    ChromeMethods.ChromeGetRequestFormData(initialValues => {
      form.setFieldsValue(initialValues)
    })
  }, []) // eslint-disable-line

  return (
    <div className="page-container create-request-container">
      <div className="create-request-cls">
        <Form
          form={form}
          size="small"
          initialValues={{ method: "GET", resp: '{}' }}
          onFinish={onFinish}
        >
          <Form.Item
            label="类型"
            name="method"
            className="form-item-style"
            rules={[
              {
                required: true,
                message: '请选择Request Method',
              },
            ]}
          >
            <Select style={{ width: '100px' }} onChange={(val) => handleSaveFormData("method", val)}>
              <Select.Option value="GET">GET</Select.Option>
              <Select.Option value="POST">POST</Select.Option>
              <Select.Option value="PUT">PUT</Select.Option>
              <Select.Option value="PATCH">PATCH</Select.Option>
              <Select.Option value="DELETE">DELETE</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            className="form-item-style"
            rules={[
              {
                required: true,
                message: '请输入URL',
              },
            ]}
          >
            <Input placeholder="请输入URL" onChange={(e) => handleSaveFormData("url", e.target.value)} />
          </Form.Item>
          <Form.Item
            label="响应体"
            name="resp"
            className="form-item-style"
            rules={[
              {
                required: true,
                message: '请输入响应体',
              },
            ]}
          >
            <Input.TextArea placeholder="请输入响应体" onChange={(e) => handleSaveFormData("resp", e.target.value)} />
          </Form.Item>
        </Form>

        <footer className="footer">
          <Button size="small" style={{ flex: 1 }} type="primary" onClick={form.submit}>创建请求</Button>
          <Button size="small" onClick={resetForm}>清空表单</Button>
          <Button size="small" onClick={toBackHome}>返回主页</Button>
        </footer>
      </div>
    </div >
  )
}

export default observer(CreateRequest)
