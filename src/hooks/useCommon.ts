/**
 * 公共hooks组件
 * 
 * 全局需要使用
 */
import {useCommonStore} from '@/store/module/common';
const useCommmon = () => {
    const commonStore = useCommonStore()
}

export default useCommmon