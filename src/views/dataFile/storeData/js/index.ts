import {
    columnsItemInterFace,
} from '@/interface/tableInterFace';

export let columns: Array<columnsItemInterFace> = [
    {
        title: '广告渠道编号',
        dataIndex: 'channelCode',
        key: 'channelCode',
        slots: { customRender: 'channelCode' },
    },
    {
        title: '广告渠道名称',
        dataIndex: 'channelName',
        key: 'channelName',
        slots: { customRender: 'channelName' },
    },
    {
        title: '所属平台',
        dataIndex: 'platformName',
        key: 'platformName',
        slots: { customRender: 'platformName' },
    },
    {
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        slots: { customRender: 'status' },
    },
]