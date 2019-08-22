<template src="./index.html"></template>
<script>
	import moment from 'moment';
	import Tools from '@/utils/Tools';
    import { visitEchartOption, payEchartOption, searchTotalEchartOption, searchPerEchartOption, salesEchartOption } from './config';
    
    visitEchartOption.dataset.source = [
        ['2019-08-01', 12],
        ['2019-08-02', 13],
        ['2019-08-03', 10],
        ['2019-08-04', 14],
        ['2019-08-05', 9],
        ['2019-08-06', 18],
        ['2019-08-07', 12],
    ];

    payEchartOption.dataset.source = [
        ['2019-08-01', 12],
        ['2019-08-02', 13],
        ['2019-08-03', 10],
        ['2019-08-04', 14],
        ['2019-08-05', 9],
        ['2019-08-06', 18],
        ['2019-08-07', 12],
    ];

    searchTotalEchartOption.dataset.source = [
        ['2019-08-01', 12],
        ['2019-08-02', 13],
        ['2019-08-03', 10],
        ['2019-08-04', 14],
        ['2019-08-05', 9],
        ['2019-08-06', 18],
        ['2019-08-07', 12],
    ];

    searchPerEchartOption.dataset.source = [
        ['2019-08-01', 18],
        ['2019-08-02', 13],
        ['2019-08-03', 10],
        ['2019-08-04', 14],
        ['2019-08-05', 9],
        ['2019-08-06', 3],
        ['2019-08-07', 8],
    ];

	const salesDataSource = {
		allData: [
			['家用电器', '4544', '28.79%', '#1890ff'],
			['食用酒水', '3321', '21.04%', '#13c2c2'],
			['个护健康', '3113', '19.73%', '#2fc25b'],
			['服饰箱包', '2341', '14.83%', '#facc14'],
			['母婴产品', '1231', '7.80%', '#f04864'],
			['其他', '1231', '7.80%', '#8543e0']
		],
		onlineData: [
			['家用电器', '244', '21.24%', '#1890ff'],
			['食用酒水', '321', '27.94%', '#13c2c2'],
			['个护健康', '311', '27.07%', '#2fc25b'],
			['服饰箱包', '41', '3.57%', '#facc14'],
			['母婴产品', '121', '10.53%', '#f04864'],
			['其他', '111', '9.66%', '#8543e0']
		],
		offlineData: [
			['家用电器', '99', '10.41%', '#1890ff'],
			['食用酒水', '188', '19.77%', '#13c2c2'],
			['个护健康', '344', '36.17%', '#2fc25b'],
			['服饰箱包', '255', '26.81%', '#facc14'],
			['其他', '65', '6.83%', '#f04864']
		]
	};

    let salesEchart = null;
    
    const columns = [
        {
            title: '排名',
            dataIndex: 'id',
        }, {
            title: '搜索关键词',
            dataIndex: 'name',
            scopedSlots: { customRender: 'title-link' },
        }, {
            title: '用户数',
            dataIndex: 'number',
            sorter: (a, b) => a.number - b.number,
        }, {
            title: '周增幅',
            dataIndex: 'increase',
            sorter: (a, b) => a.increase - b.increase,
            scopedSlots: { customRender: 'increase-status' },
        },
    ];

    let datax = [];
    for (let i = 1; i <= 100; i++) {
        datax.push({
            id: i,
            name: '搜索热词-' + i,
            number: parseInt(Math.random() * 1000) + 1,
            increase:  (Math.random() * 90).toFixed(2),
            status: ['caret-down', 'caret-up'][parseInt(Math.random() * 2)]
        })
    }

	export default {
		name: 'Welcomex',
		data() {
			return {
				percent: 78,
				comments: [
					{
						id: 22234234,
						actions: ['回复'],
						author: 'Han Solo',
						avatar:
							'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						content:
							'We supply a series of design principles, practical patterns and .',
						datetime: moment().subtract(1, 'days')
					},
					{
						id: 2223423422222,
						actions: ['回复'],
						author: 'Han Solo',
						avatar:
							'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						content:
							'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
						datetime: moment().subtract(2, 'days')
					}
				],
				moment,
				news: [
					{ title: 'Ant Design Title 1' },
					{ title: 'Ant Design Title 2' },
					{ title: 'Ant Design Title 3' },
					{ title: 'Ant Design Title 4' },
					{ title: 'Ant Design Title 5' }
				],
				salesCurrentDataSource: [],
                totalSales: 0,
                columns,
                datax,
                pagination: {
                    total: 100,
                    pageSize: 4
                }
			};
		},
		mounted() {
            // console.log(this.$echarts)
            // 渲染访问量统计
			const visitEchartEle = document.getElementById('visitEchart');
			let visitEchart = this.$echarts.init(visitEchartEle);
            visitEchart.setOption(visitEchartOption);
            // 渲染订单金额统计
			const payEchartEle = document.getElementById('payEchart');
			let payEchart = this.$echarts.init(payEchartEle);
            payEchart.setOption(payEchartOption);
            // 渲染搜索总量统计
            const searchTotalEchartEle = document.getElementById('searchTotalEchart');
			let searchTotalEchart = this.$echarts.init(searchTotalEchartEle);
            searchTotalEchart.setOption(searchTotalEchartOption);
            // 渲染个人搜索统计
            const searchPerEchartEle = document.getElementById('searchPerEchart');
			let searchPerEchart = this.$echarts.init(searchPerEchartEle);
            searchPerEchart.setOption(searchPerEchartOption);
            // 渲染销售金额统计
			const salesEchartEle = document.getElementById('salesEchart');
			salesEchart = this.$echarts.init(salesEchartEle);
			salesEchartOption.dataset.source = salesDataSource.allData;
			salesEchart.setOption(salesEchartOption);

			let salesCurrentDataSourceInit = salesDataSource.allData;
			this.totalSales = this.calcSaleTotal(salesCurrentDataSourceInit);
			this.salesCurrentDataSource = salesCurrentDataSourceInit;
		},
		methods: {
			switchSalesType(e) {
				// console.log('value', e.target.value+'Data');
				let salesCurrentDataSourceInit = salesDataSource[e.target.value + 'Data'];

				salesEchartOption.dataset.source = salesCurrentDataSourceInit;
				salesEchart.setOption(salesEchartOption);
				this.totalSales = this.calcSaleTotal(salesCurrentDataSourceInit);
				this.salesCurrentDataSource = salesCurrentDataSourceInit;
			},
			calcSaleTotal(data) {
				return Tools.formatNumber(Number(data.reduce((sum, salesPerData) => sum + Number(salesPerData[1]),0)));
            },
		}
	};
</script>
<style scoped>
	@import './index.css';
</style>