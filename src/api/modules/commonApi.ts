import httpRequest from '../httpRequest'

export default{
    // 获取当前用户权限
    getAllRoute:(params?:any) => {
        return httpRequest.getAction({
            url:'/ads-cloud/basic/auth/get-all-route',params
        })
    },  
}