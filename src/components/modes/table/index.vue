<template>
  <div>
    <Table :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="pagination" @change="handleChange" :rowSelection="rowSelection" >
        <a slot="titlex" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="statex" slot-scope="state"><Badge :status="['default', 'processing', 'success', 'error'][state]" :text="['已下架', '待审核', '已审核', '已置顶'][state]" /></span>
        <span slot="actionx" slot-scope="action, record, index">
            <router-link :to="{name:'edit', params: {mode: 'list', classid: record.classid, id: record.id}}">{{action[0]}}</router-link>
            <Divider type="vertical" />
            <Popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                <a href="javascript:;">{{action[1]}}</a>
            </Popconfirm>
        </span>
    </Table>
  </div>
</template>
<script>
import { Table, Divider, Badge, Popconfirm } from 'ant-design-vue';

// import Tools from '@/utils/tools';

// const columns = [
//     {
//         title: '序号',
//         dataIndex: 'key',
//         sorter: (a, b) => a.key - b.key,
//         width: '80px',
//     },
//     {
//         title: '标题',
//         dataIndex: 'title',
//         scopedSlots: { customRender: 'titlex' },
//         filters: [{
//             text: '01',
//             value: '01',
//         },{
//             text: '02',
//             value: '02',
//         }],
//         onFilter: (value, record) => record.title.indexOf(value) != -1,
//     },
//     {
//         title: '发布时间',
//         dataIndex: 'createTime',
//         width: '200px',
//         sorter: (a, b) => Tools.date2Timestamp(a.createTime) - Tools.date2Timestamp(b.createTime),
//     },
//     {
//         title: '状态',
//         dataIndex: 'state',
//         scopedSlots: { customRender: 'statex' },
//         width: '100px',
//         filters: [{
//             text: '已下架',
//             value: '0',
//         }, {
//             text: '待审核',
//             value: '1',
//         }, {
//             text: '已审核',
//             value: '2',
//         }, {
//             text: '已置顶',
//             value: '3',
//         },],
//         onFilter: (value, record) => record.state == value
//     },
//         {
//         title: '操作',
//         dataIndex: 'action',
//         scopedSlots: { customRender: 'actionx' },
//         width: '120px',
//     }
// ];

// let datas = [];
// // const statusArr = ['已下架', '待审核', '已审核', '已置顶'];
// const TOTAL = 255;
// for (let i = 0; i < TOTAL; i++) {
//     datas.push({
//         key: (i + 1) * 10,
//         title: `title-0${i}`,
//         createTime: Tools.formatDate((parseInt(new Date().getTime()/1000) + Tools.rand(10, 1000)) * 1000, '-', ':'),
//         // status: statusArr[Tools.rand(0, 3)],
//         state: Tools.rand(0, 3),
//         action: ['编辑', '删除']
//     })
// }

export default {
    name: 'TableComponent',
    components: {
        Table,
        Divider,
        Badge,
        Popconfirm,
    },
    props: ['dataSource', 'columns', 'pagination', 'selectedRowKeys'],
    data () {
        return {
            // datas,
            // columns,
            // selectedRowKeys: [],
            // pagination: {
            //     total: TOTAL,
            //     pageSize: 10,
            //     showTotal: total => `共 ${total} 条信息`,
            //     showSizeChanger: true,
            //     showQuickJumper: true,
            //     change: (page, pageSize) => console.log(`当前第${page}页, 每页${pageSize}条`),
            //     showSizeChange: (current, size) => console.log(`当前第${current}页, 每页${size}条`),
            // },
            loading: true
        }
    },
    computed: {
        rowSelection () {
            let { selectedRowKeys } = this;
            return {
                selectedRowKeys,
                onChange: this.onSelectChange,
            }
        }
    },
    created () {
        setTimeout(() => {
                this.loading = false;
            }, 500);
    },
    mounted () {
    },
    methods: {
        handleChange (pagination, filters, sorter) {
            this.loading = true;
            console.log('handleChange...', pagination, filters, sorter);
            const params = {
                page: pagination.current,
                pageSize: pagination.pageSize,
                sortField: sorter.field || '',
                sortOrder: sorter.order || '',
                ...filters,
            }
            console.log('params', params);
            // todo
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        onSelectChange (selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.$emit('checkItems', selectedRowKeys);
        },
        delItem (index) {
            console.log(`删除第 ${index} 项`);
            this.$emit('delItem', index);
        },
    }
}
</script>
<style scoped>
</style>
