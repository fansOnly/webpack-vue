<template>
  <div>
    <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="pagination" @change="handleChange" :rowSelection="rowSelection" >
        <a slot="titlex" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="statex" slot-scope="state"><a-badge :status="getStatus(state)" :text="state" /></span>
        <span slot="actionx" slot-scope="action, record, index">
            <router-link :to="{name:'listEditPage', params: {classid: record.classid, id: record.id}}">{{action[0]}}</router-link>
            <a-divider type="vertical" />
            <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                <a href="javascript:;">{{action[1]}}</a>
            </a-popconfirm>
        </span>
    </a-table>
  </div>
</template>
<script>

export default {
    name: 'TableComponent',
    props: {
        dataSource: {
            type: Array,
            required: true,
            default: function () {
                return [];
            }
        },
        columns: {
            type: Array,
            required: true,
            default: function () {
                return [];
            }
        },
        pagination: {
            type: Object,
            default: function () {
                return {};
            }
        },
        selectedRowKeys: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data () {
        return {
            loading: true,
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
            }, 0);
    },
    mounted () {
    },
    methods: {
        handleChange (pagination, filters, sorter) {
            if (!this.dataSource.length) return;
            this.loading = true;
            console.log('===============================params-start==================================================');
            console.log(pagination);
            // console.log(filters);
            console.log(sorter);
            console.log('===============================params-end====================================================');

            // const conditionArr = new Map();
            // for (let i in filters) {
            //     if (filters[i].slice() && filters[i].slice().length) {
            //         conditionArr.set(i, filters[i].slice());
            //     }
            // }
            // this.$store.dispatch('filterStore/set', conditionArr);
            // console.log('conditionArr', conditionArr);
            // const params = {
            //     page: pagination.current,
            //     pageSize: pagination.pageSize,
            //     sortField: sorter.field || '',
            //     sortOrder: sorter.order || '',
            //     ...this.filter,
            // }
            // console.log('===============================params-start==================================================');
            // console.log(params);
            // console.log('===============================params-end====================================================');
            // todo
            setTimeout(() => {
                this.loading = false;
            }, 0);
        },
        onSelectChange (selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.$emit('checkItems', selectedRowKeys);
        },
        delItem (index) {
            // console.log(`删除第 ${index} 项`);
            this.$emit('delItem', index);
        },
        getStatus (state) {
            const index = ['已下架', '待审核', '已审核', '已置顶'].indexOf(state);
            return ['default', 'processing', 'success', 'error'][index]
        },
    }
}
</script>
<style scoped>
</style>
