<script lang="ts">
	import MangaCard from '../components/Card.svelte';
	import { apiSearch, apiEditorPick } from '../components/Api';
	import { onMount } from 'svelte';

	let searchValue = '';
	let mangasData = [];
	let mangasEditorPickData = [];

	const fetchEditorManga = async () => {
		mangasEditorPickData = [];
		const res = await fetch(`${apiEditorPick}`);
		mangasEditorPickData = await res.json();
	};

	const fetchSearchManga = async (searchValue:string) => {
		mangasData = [];
		const res = await fetch(`${apiSearch}?mangaTitle=${searchValue}`);
		mangasData = await res.json();
	};

	const onKeyPress = (e:KeyboardEvent) => {
		if (e.key === "Enter") getMangaData();
	};

	const getMangaData = () => {
		fetchSearchManga(searchValue);
	};

	onMount(() => {
		fetchEditorManga();
	});
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
			{#if searchValue !== ''}
				{#each mangasData as mangaData}
					<MangaCard dataManga={mangaData} lastchapterMenu ={true} jwtUser = {null} />
				{/each}
			{:else}
				{#each mangasEditorPickData as mangaData}
					<MangaCard dataManga={mangaData} lastchapterMenu ={false} jwtUser = {null}/>
				{/each}
			{/if}
		</div>
	{/if}
</div>
