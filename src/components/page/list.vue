<template>
    <div class="body-wrap">
        <BreadCrumbComponent />
        <div class="container">
            <FilterBarComponent />
            <div class="option-bar">
                <Button style="margin-right:10px;" type='primary'><router-link to="/edit/">新增</router-link></Button>
                <template v-if="selectedRowKeys.length">
                    <Button style="margin-right:10px;" type="default" @click="delMultiItems">批量删除</Button>
                    <div>当前共选择 <strong style="color:#1890ff;">{{selectedRowKeys.length}}</strong> 条信息</div>
                </template>
            </div>
            <TableComponent :dataSource="dataSource" :columns="columns" :pagination="pagination" :selectedRowKeys="selectedRowKeys" @checkItems="checkItems" @delItem="delItem" />
        </div>
    </div>
</template>
<script>
import { Button, Modal } from 'ant-design-vue';
import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
import TableComponent from '@/components/modes/table/index.vue';
import FilterBarComponent from '@/components/modes/filterBar/index.vue';

import Tools from '@/utils/tools';

const columns = [
    {
        title: '序号',
        dataIndex: 'sortnum',
        sorter: (a, b) => a.key - b.key,
        width: '80px',
    },
    {
        title: '标题',
        dataIndex: 'title',
        scopedSlots: { customRender: 'titlex' },
        filters: [{
            text: '01',
            value: '01',
        },{
            text: '02',
            value: '02',
        }],
        // filters: () => {
        //     const arr = [];
        //     titles.map(item => {
        //         arr.push({text: item, value: item})
        //     })
        //     return arr;
        // },
        onFilter: (value, record) => record.title.indexOf(value) != -1,
    },
    {
        title: '发布时间',
        dataIndex: 'createTime',
        width: '200px',
        sorter: (a, b) => Tools.date2Timestamp(a.createTime) - Tools.date2Timestamp(b.createTime),
    },
    {
        title: '状态',
        dataIndex: 'state',
        scopedSlots: { customRender: 'statex' },
        width: '100px',
        filters: [{
            text: '已下架',
            value: '0',
        }, {
            text: '待审核',
            value: '1',
        }, {
            text: '已审核',
            value: '2',
        }, {
            text: '已置顶',
            value: '3',
        },],
        onFilter: (value, record) => record.state == value
    },
        {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'actionx' },
        width: '120px',
    }
];


            console.log('columns', columns)

let dataSource = [];
// const statusArr = ['已下架', '待审核', '已审核', '已置顶'];
const titles = ['title', 'desktop', 'news', 'somthing'];
const TOTAL = 255;
for (let i = 0; i < TOTAL; i++) {
    dataSource.push({
        key: i,
        id: i + 1,
        sortnum: (i + 1) * 10,
        classid: 1,
        title: `${titles[Tools.rand(0,3)]}-0${i}`,
        createTime: Tools.formatDate((parseInt(new Date().getTime()/1000) + Tools.rand(10, 1000)) * 1000, '-', ':'),
        // status: statusArr[Tools.rand(0, 3)],
        state: Tools.rand(0, 3),
        action: ['编辑', '删除']
    })
}

export default {
    name: 'Listx',
    components: {
        BreadCrumbComponent,
        TableComponent,
        FilterBarComponent,
        Button,
    },
    data () {
        return {
            dataSource,
            columns,
            pagination: {
                total: TOTAL,
                pageSize: 10,
                showTotal: total => `共 ${total} 条信息`,
                showSizeChanger: true,
                showQuickJumper: true,
                change: (page, pageSize) => console.log(`当前第 ${page} 页, 每页 ${pageSize} 条`),
                showSizeChange: (current, size) => console.log(`当前第 ${current} 页, 每页 ${size} 条`),
            },
            selectedRowKeys: [],
        }
    },
    mounted () {
        // console.log('router info:', this.$route);
        // this.classid = this.$route.params.classid;
    },
    methods: {
        checkItems (selectedRowKeys) {
            console.log('selectedRowKeys', selectedRowKeys),
            this.selectedRowKeys = selectedRowKeys;
        },
        delItem (index) {
            this.dataSource.splice(index, 1);
        },
        delMultiItems () {
            const that = this;
            Modal.confirm({
                title: '删除提醒',
                content: '确认删除当前选中的信息吗？',
                okType: 'danger',
                onOk() {
                    that.dataSource = that.dataSource.filter(item => !that.selectedRowKeys.includes(item.key));
                    that.selectedRowKeys = [];
                },
                onCancel() {
                    console.log('Cancel');
                },
            })
        },
    }
}
</script>
<style scoped>
.option-bar {
    padding-bottom: 15px;
    display: flex;
    align-items: center;
}
</style>

