<script context="module">
	import { apiManga } from '../../../components/Api';

	const fecthMangaData = async (src, id) => {
		const res = await fetch(
			`${apiManga}?` +
				new URLSearchParams({
					src: src,
					mangaTitle: id
				})
		);

		let json = await res.json();
		return json;
	};

	export async function load({ page }) {
		let url = page.params.id;
		let rest = url.split('/');
		let mangaData = await fecthMangaData(rest[0], rest[1]);

		return {
			props: {
				mangaData: mangaData,
				srcApi: rest[0],
				mangaTitle: rest[1]
			}
		};
	}
</script>

<script lang="ts">
	export let mangaData: any, srcApi: string, mangaTitle: string;

	let data = mangaData['MangaData'];
	let openChapterOrSummary: boolean = false;

	const handleToggleMenu = () => {
		openChapterOrSummary = !openChapterOrSummary;
	};
</script>

<svelte:head>
	<title>{data['MangaTitle']}</title>
	<meta property="og:image" content={data['MangaCover']} />
	<meta property="twitter:image" content={data['MangaCover']} />
</svelte:head>

<div class="bg-gray-800 min-h-screen flex justify-center items-center">
	{#if data != undefined}
		<div class="py-20 w-4/5 sm:w-2/5">
			<div class="flex justify-center">
				<img src={data['MangaCover']} alt="" />
			</div>
			<div class="flex justify-center py-5">
				<p class="font-semibold text-white">{data['MangaTitle']}</p>
			</div>
			<div class="flex gap-3">
				<button class="bg-white p-2 rounded-sm shadow-lg text-sm" on:click={handleToggleMenu}
					>Chapter List</button
				>
				<button class="bg-white p-2 rounded-sm shadow-lg text-sm" on:click={handleToggleMenu}
					>Summary</button
				>
			</div>
			<div class={`${openChapterOrSummary ? 'hidden' : 'block'} py-5 text-white`}>
				<p class="text-center text-sm">
					{data['MangaSummary']}
				</p>
			</div>
			<div class={`${openChapterOrSummary ? 'block' : 'hidden'} py-5 grid grid-cols-1 gap-3`}>
				<div>
					<input type="text" class="w-full p-3 shadow-lg text-sm" placeholder="Find chapter" />
				</div>
				{#each data['Chapter'] as Chapter}
					<div class="p-3 bg-white text-center shadow-lg text-sm">
						<a href={`/read/${srcApi}/${mangaTitle}/${Chapter['ChapterLink']}`}>
							{Chapter['ChapterName']}
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<!-- <script context="module">
	export async function load({ page }) {
		let url = page.params.id;
		let rest = url.split('/');
		return {
			props: {
				srcApi: rest[0],
				mangaTitle: rest[1]
			}
		};
	}
</script>

<script lang="ts">
	export let srcApi: string;
	export let mangaTitle: any;
	import { apiManga } from '../../../components/Api';

	let mangasData = [];
	let mangasChapter: [];

	let openChapterOrSummary: boolean = false;

	const handleToggleMenu = () => {
		openChapterOrSummary = !openChapterOrSummary;
	};

	const fecthMangaData = async (src: string, id: string) => {
		const res = await fetch(
			`${apiManga}?` +
				new URLSearchParams({
					src: src,
					mangaTitle: id
				})
		);

		let json = await res.json()
		mangasData = await json["MangaData"]
		mangasChapter = await mangasData['Chapter'];
	};

	$: fecthMangaData(srcApi, mangaTitle);

</script>

<svelte:head>
	<title>Mangamee Read</title>
</svelte:head>

<div class="bg-gray-800 min-h-screen flex justify-center items-center">
	{#if mangasChapter != undefined}
		<div class="py-20 w-4/5 sm:w-2/5">
			<div class="flex justify-center"><img src={mangasData['MangaCover']} alt="" /></div>
			<div class="flex justify-center py-5">
				<p class="font-semibold text-white">{mangasData['MangaTitle']}</p>
			</div>
			<div class="flex gap-3">
				<button class="bg-white p-2 rounded-sm shadow-lg text-sm" on:click={handleToggleMenu}
					>Chapter List</button
				>
				<button class="bg-white p-2 rounded-sm shadow-lg text-sm" on:click={handleToggleMenu}
					>Summary</button
				>
			</div>
			<div class={`${openChapterOrSummary ? 'hidden' : 'block'} py-5 text-white`}>
				<p class="text-center text-sm">
					{mangasData['MangaSummary']}
				</p>
			</div>
			<div class={`${openChapterOrSummary ? 'block' : 'hidden'} py-5 grid grid-cols-1 gap-3`}>
				<div>
					<input type="text" class="w-full p-3 shadow-lg text-sm" placeholder="Find chapter" />
				</div>
				{#each mangasChapter as Chapter}
					<div class="p-3 bg-white text-center shadow-lg text-sm">
						<a href={`/read/${srcApi}/${mangaTitle}/${Chapter['ChapterLink']}`}> {Chapter['ChapterName']} </a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div> -->
