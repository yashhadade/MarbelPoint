import axios from 'axios';

export const server=axios.create({
  baseURL:"http://localhost:8080/api/v1",  
responseType:'json',
headers:{

}
  
})
