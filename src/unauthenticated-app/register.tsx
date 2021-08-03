import { useAuth } from "context/auth-context"
import { Form, Input} from 'antd'
import { LongButton } from "unauthenticated-app"

export const RegisterScreen = ({onError}: {onError:(error:Error) => void}) => {
  const {register} = useAuth()
  // HTMLFormElement extends Element
  const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次密码相同'))
      return false
    }
    try {
      await register(values)
    } catch (error) {
      onError(error)
    }
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{ required: true, message: "请输入用户名" }]}>
      <Input placeholder='用户名' type="text" id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{required: true, message: 'required'}]}>
      <Input placeholder='密码' type="password" id={'password'} />
    </Form.Item>
    <Form.Item name={'cpassword'} rules={[{required: true, message: 'required'}]}>
      <Input placeholder='确认密码' type="password" id={'cpassword'} />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={'submit'} type={'primary'}>注册</LongButton>
    </Form.Item>
  </Form>
}