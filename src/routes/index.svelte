<script lang="ts">
	import MangaCard from '../components/Card.svelte';
	import { apiSearch, apiEditorPick } from '../components/Api';
	import { onMount } from 'svelte';

	let searchValue = '';
	let mangasData;
	let mangasEditorPickData;

	let mangaSource = [
		{ name: 'ID', value: 'id' },
		{ name: 'ENG', value: 'en' },
		{ name: 'ENG2', value: 'en2' }
	];
	
	let currentSource = 'en';

	const fetchEditorManga = async () => {
		mangasEditorPickData = undefined;
		const res = await fetch(`${apiEditorPick}`);
		mangasEditorPickData = await res.json();
	};

	const fetchSearchManga = async (searchValue: string) => {
		mangasData = undefined;
		const res = await fetch(
			`${apiSearch}?` +
				new URLSearchParams({
					src: currentSource,
					mangaTitle: searchValue
				})
		);

		mangasData = await res.json();
	};

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') getMangaData();
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

<div class="bg-gray-800 min-h-screen">
	<div class="sm:pt-36 pt-28">
		<div class="flex justify-center">
			<input
				class="w-4/5 sm:w-3/5 p-3 shadow-lg"
				type="text"
				placeholder="Try 'naruto' "
				bind:value={searchValue}
				on:keypress={onKeyPress}
			/>
			<button class="bg-red-400 hover:bg-red-300 text-white p-2" on:click={getMangaData}>
				<p class="font-semibold text-xs">Search</p>
			</button>
		</div>
		<div class="flex flex-wrap justify-center pt-2 space-x-3">
			{#each mangaSource as source}
				<button class={`${currentSource == source.value ? 'bg-red-400' : 'bg-white'} p-2 px-3 text-xs hover:bg-red-200`} on:click={() => (currentSource = source.value)}>
					{source.name}
				</button>
			{/each}
		</div>
	</div>
	<div class="flex justify-center">
		<div class="grid grid-cols-3 sm:grid-cols-6 sm:gap-y-4 sm:gap-x-1 gap-4 py-28">
			{#if searchValue !== ''}
				{#if mangasData !== undefined && mangasData.length != 0}
					<MangaCard cardData={mangasData} historyMode={false}/>
				{/if}
			{:else}
				{#if mangasEditorPickData !== undefined && mangasEditorPickData.length != 0}
					<MangaCard cardData={mangasEditorPickData} historyMode={false}/>
				{/if}
			{/if}
		</div>
	</div>
</div>
