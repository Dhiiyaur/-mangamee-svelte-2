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
	import { apiBrowse } from '../../components/Api';
	import MangaCard from '../../components/Card.svelte';
	import { goto } from '$app/navigation';

	export let id: string;

	let pageNumber = parseInt(id);
	let mangasData;

	const handleNext = () => {
		mangasData = undefined;
		pageNumber += 1;
		goto(`${pageNumber}`);
	};

	const handlePrev = () => {
		mangasData = undefined;
		pageNumber -= 1;
		goto(`${pageNumber}`);
	};

	const fecthBrowseManga = async (number: number) => {
		const res = await fetch(`${apiBrowse}?pageNumber=${number}`);
		mangasData = await res.json();
	};

	$: fecthBrowseManga(pageNumber);
</script>

<svelte:head>
	<title>Mangamee Browse</title>
</svelte:head>

<div>
	<div class="bg-gray-800 min-h-screen justify-center items-center">
		<div class="flex justify-center">
			<div class="grid grid-cols-3 sm:grid-cols-6 sm:gap-y-4 sm:gap-x-1 gap-4 py-20">
				<!-- {#each mangasData as mangaData}
					<MangaCard dataManga={mangaData} lastchapterMenu={true} jwtUser={null} />
				{/each} -->
				{#if mangasData !== undefined && mangasData.length != 0}
					<MangaCard data={mangasData} />
				{/if}
			</div>
		</div>
	</div>
	<div class="bg-gray-500 p-2 fixed bottom-0 inset-x-0 opacity-75">
		<div class="text-center flex justify-center gap-10">
			<button class="font-semibold" on:click={handlePrev}>Prev</button>
			<button class="font-semibold" on:click={handleNext}>Next</button>
		</div>
	</div>
</div>
