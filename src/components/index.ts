/**
 * Vue3组件的全局注册
 */
import { App } from '@vue/runtime-core';
import ComHeader from './common/com-header/index.vue';
import ComFooter from './common/com-footer/index.vue';
import ComButton from './common/com-button/index.vue';
import ComTable from './common/com-table/index.vue';
import ComSearch from './common/com-search/index.vue';
import ComFoldPopUp from './common/com-foldPopUp/index.vue'; // 左右折叠面板组件
import ComSwiper from './common/com-swiper/index.vue';
import ComSelect from './common/com-dropDownSelect/index.vue';
import ComCascadeSelect from './common/com-cascadeSelect/index.vue'; // 级联组件
import ComRangePicker from './common/com-rangePicker/index.vue'; // 日期选择器
import ComModal from './common/com-modal/index.vue'; // 弹出窗

export default function install(app:App) {
    app.component('ComHeader',ComHeader)
    app.component('ComFooter',ComFooter)
    app.component('ComButton',ComButton)
    app.component('ComTable',ComTable)
    app.component('ComSearch',ComSearch)
    app.component('ComFoldPopUp',ComFoldPopUp)
    app.component('ComSwiper',ComSwiper)
    app.component('ComSelect',ComSelect)
    app.component('ComCascadeSelect',ComCascadeSelect)
    app.component('ComRangePicker',ComRangePicker)
    app.component('ComModal',ComModal)
}