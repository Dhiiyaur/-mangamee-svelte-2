<script context="module">
	export const load = ({ page }) => {
		const id = page.params.id;
		return {
			props: {
				id
			}
		};
	};
</script>

<script lang="ts">
	// import { onMount } from 'svelte';
    import {apiBrowse} from "../../components/Api"
	import MangaCard from '../../components/Card.svelte';
	import { goto } from '$app/navigation';

	export let id: string;

	let pageNumber = parseInt(id);
	let mangasData = [];

	const handleNext = () => {
		pageNumber += 1;
		goto(`${pageNumber}`);
	};

	const handlePrev = () => {
		pageNumber -= 1;
		goto(`${pageNumber}`);
	};

    const fecthBrowseManga = async(number:number) => {
		const res = await fetch(`${apiBrowse}?pageNumber=${number}`);
		mangasData = await res.json();
    }

    $: fecthBrowseManga(pageNumber)

    // interface MangasData {}
	// let mangasData2: any[];

	// onMount(async () => {
	// 	const res = await fetch(`http://localhost:49566/browse?pageNumber=${id}`);
	// 	mangasData = await res.json();
	// 	console.log(mangasData);

    //     console.log(id)
	// 	await axios.get<MangasData[]>(browseApi, { params: { pageNumber: id } }).then((res) => {
	// 		console.log(res.data);
	// 		mangasData2 = res.data;
	// 	});
	// });

    // onMount(() =>{
    //     fecthBrowseManga()
    // })
</script>

<div>
	<div class="bg-gray-100 min-h-screen justify-center items-center">
		<div class="grid grid-cols-3 sm:grid-cols-7 gap-4 p-3 py-20">
			{#each mangasData as mangaData}
				<MangaCard dataManga={mangaData} />
			{/each}
		</div>
	</div>
	<div class="bg-gray-300 p-2 fixed bottom-0 inset-x-0 opacity-75">
		<div class="text-center flex justify-center gap-10">
			<button class="font-semibold" on:click={handlePrev}>Prev</button>
			<button class="font-semibold" on:click={handleNext}>Next</button>
		</div>
	</div>
</div>
