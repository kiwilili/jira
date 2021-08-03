import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useState} from "react";
import {useDebounce, useMount} from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  const client = useHttp()
  const {isLoading, error, data: list} = useProjects(debouncedParam)

  useMount(() => {
    client('users').then(setUsers)
  })

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text>: null }
    <List loading={isLoading} users={users} dataSource={list || []}/>
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`