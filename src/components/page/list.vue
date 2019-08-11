<template>
    <div class="body-wrap">
        <BreadCrumbComponent />
        <div class="container">
            <FilterBarComponent />
            <TableComponent :dataSource="dataSource" :columns="columns" :pagination="pagination" :selectedRowKeys="selectedRowKeys" @checkItems="checkItems" @delItem="delItem" />
        </div>
    </div>
</template>
<script>
import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
import TableComponent from '@/components/modes/table/index.vue';
import FilterBarComponent from '@/components/modes/filterBar/index.vue';

import Tools from '@/utils/tools';

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
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

let dataSource = [];
// const statusArr = ['已下架', '待审核', '已审核', '已置顶'];
const TOTAL = 255;
for (let i = 0; i < TOTAL; i++) {
    dataSource.push({
        key: (i + 1) * 10,
        title: `title-0${i}`,
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
    },
    methods: {
        checkItems (selectedRowKeys) {
            console.log('selectedRowKeys', selectedRowKeys),
            this.selectedRowKeys = selectedRowKeys;
        },
        delItem (index) {
            this.dataSource.splice(index, 1);
        }
    }
}
</script>
<style scoped>
</style>

