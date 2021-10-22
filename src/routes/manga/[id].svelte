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
	export let id: string;
	import { apiManga } from '../../components/Api';
	import { dataChapter } from '../../components/Store';

	let mangasData = [];
	let mangasChapter: [];

	let openChapterOrSummary: boolean = false;

	const handleToggleMenu = () => {
		openChapterOrSummary = !openChapterOrSummary;
	};

	const fecthMangaData = async (id: string) => {
		const res = await fetch(`${apiManga}?mangaTitle=${id}`);
		mangasData = await res.json();
		mangasChapter = await mangasData['Chapter'];
		dataChapter.set(mangasChapter);
	};

	$: fecthMangaData(id);
</script>

<svelte:head>
	<title>Mangamee</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen flex justify-center items-center">
	{#if mangasChapter != undefined}
		<div class="py-20 w-4/5 sm:w-2/5">
			<div class="flex justify-center"><img src={mangasData['MangaCover']} alt="" /></div>
			<div class="flex justify-center py-5">
				<p class="font-semibold">{mangasData['MangaTitle']}</p>
			</div>
			<div class="flex gap-3">
				<button class="bg-white p-2 rounded-sm shadow-lg text-sm" on:click={handleToggleMenu}
					>Chapter List</button
				>
				<button class="bg-white p-2 rounded-sm shadow-lg text-sm" on:click={handleToggleMenu}
					>Summary</button
				>
			</div>
			<div class={`${openChapterOrSummary ? 'hidden' : 'block'} py-5`}>
				<p class="text-center text-sm">
					{mangasData['MangaSummary']}
				</p>
			</div>
			<div class={`${openChapterOrSummary ? 'block' : 'hidden'} py-5 grid grid-cols-1 gap-3`}>
				<div>
					<input
						type="text"
						class="w-full p-3 shadow-lg text-sm"
						placeholder="Find chapter"
					/>
				</div>
				{#each mangasChapter as Chapter}
					<div class="p-3 bg-white text-center shadow-lg text-sm">
						<a href={`/read/${id}/${Chapter['ChapterLink']}`}> {Chapter['ChapterName']} </a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
