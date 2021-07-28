const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {
  // HTMLFormElement extends Element
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({username, password})
  }
  const login = (param: {username: string, password: string}) => {
    fetch(`${apiUrl}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(async(response: Response) => {
      if (response.ok) {
        // setList(await response.json())
      }
    })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor="password">密码</label>
      <input type="text" id={'password'} />
    </div>
    <div>
      <button type={'submit'}>登录</button>
    </div>
  </form>
}