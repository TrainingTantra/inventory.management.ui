import axios from "axios";

const client = axios.create({baseURL:"https://jsonplaceholder.typicode.com"});

export const request = ({...options})=>{
  client.defaults.headers.common.Authorization = `Bearer ${options?.token}`
  const onSuccess =(response)=> response
  const onError =(error)=>{
    return error?.message
  }

  return client(options).then(onSuccess).catch(onError)
}


