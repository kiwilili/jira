import { useAuth } from "context/auth-context"
import { Form, Input} from 'antd'
import { LongButton } from "unauthenticated-app"
import { useAsync } from "utils/use-async"

export const LoginScreen = ({onError}: {onError: (error:Error) => void}) => {
  const {login} = useAuth()
  const {run, isLoading} = useAsync()
  // HTMLFormElement extends Element
  const handleSubmit = async (values: {username: string, password: string}) => {
    try {
      await login(values)
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
    <Form.Item>
      <LongButton htmlType={'submit'} type={'primary'}>登录</LongButton>
    </Form.Item>
  </Form>
}