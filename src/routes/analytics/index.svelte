<script>
	import { apiUserAnalytics } from '../../components/Api';
	import {
		Chart,
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	} from 'chart.js';

	Chart.register(
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	);
	import { onMount } from 'svelte';
	let chartData;

	let chartValues = [];
	let chartLabels = [];
	let ctx;
	let chartCanvas;

	Chart.defaults.color = '#ffffff';

	const prepareData = async (data) => {
		let labels = [];
		let values = [];

		for (let i in data) {
			labels.push(data[i]['api_source']);
			values.push(data[i]['count_api_source']);
		}
		return { labels, values };
	};

	const checkUserAnalytics = async () => {
		try {
			const response = await fetch(apiUserAnalytics, {
				method: 'GET'
			});

			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	onMount(async (promise) => {
		let res = await checkUserAnalytics();
		let temp = await prepareData(res);

		chartValues = temp['values'];
		chartLabels = temp['labels'];

		ctx = chartCanvas.getContext('2d');
		var chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Revenue',
						backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#d3ffce'],
						borderColor: '#ffffff',
						data: chartValues
					}
				]
			}
		});
	});
</script>

<div>
	<div class="bg-gray-800 min-h-screen">
		<div class="flex justify-center pt-7">
			<div class="w-[300px] h-[250px] sm:w-[500px]">
				<canvas bind:this={chartCanvas} id="myChart" />
			</div>
		</div>
	</div>
</div>
