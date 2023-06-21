import httpRequest from '../httpRequest'


export default {
    // 登录
    loginApi: (data: any) => {
        return httpRequest.postAction({
            url: '/authentication/password-grant', data
        })
    },

    // 验证码
    getCaptcha: (data: any) => {
        return httpRequest.postAction({
            url: '/ads-cloud/basic/qianchuan-advertiser/page', data
        })
    },

    // 用户信息
    getUserInfo: (data: any) => {
        return httpRequest.postAction({
            url: '/auth/userinfo', data
        })
    },

}