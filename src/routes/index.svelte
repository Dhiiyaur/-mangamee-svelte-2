<script lang="ts">
	import MangaCard from '../components/Card.svelte';
	import { apiSearch } from '../components/Api';

	let searchValue = '';
	let mangasData = [];

	const fetchSearchManga = async (searchValue) => {

        mangasData = []

		const res = await fetch(`${apiSearch}?mangaTitle=${searchValue}`);
		mangasData = await res.json();
		console.log(mangasData);
	};

	const onKeyPress = (e) => {
		if (e.charCode === 13) getMangaData();
	};

	const getMangaData = () => {
		fetchSearchManga(searchValue);
	};
</script>

<svelte:head>
	<title>Mangamee</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen">
	<div class="pt-52">
		<div class="flex justify-center">
			<input
				class="w-4/5 sm:w-3/5 rounded p-3 shadow-lg"
				type="text"
				placeholder="Try 'naruto' "
				bind:value={searchValue}
				on:keypress={onKeyPress}
			/>
			<button class="bg-red-400 hover:bg-red-300 rounded text-white p-2" on:click={getMangaData}>
				<p class="font-semibold text-xs">Search</p>
			</button>
		</div>
	</div>
	{#if mangasData != undefined}
		<div class="grid grid-cols-3 sm:grid-cols-7 gap-4 p-3 py-20">
			{#each mangasData as mangaData}
				<MangaCard dataManga={mangaData} />
			{/each}
		</div>
	{/if}
</div>
