<script context="module">
	export async function load({ page }) {
		let url = page.params.rest;
		let rest = url.split('/');
		return {
			props: {
				srcApi: rest[0],
				mangaTitle: rest[1],
				chapter: rest[2]
			}
		};
	}
</script>

<script lang="ts">
	export let srcApi: string, mangaTitle: string, chapter: string;
	import { apiImage, apiUserCreateHistory, apiChapterCheck } from '../../../components/Api';
	import { goto } from '$app/navigation';

	const handleImageError = (e: any) => {
		e.target.onerror = null;
		e.target.style.display = 'none';
		e.target.src = ' ';
	};

	let imageData = [];
	let mangaChapter;
	let currentChapter: number;

	const handlePrevChapter = () => {
		console.log('prev');
		if (currentChapter < mangaChapter.length) {
			let prevChap = mangaChapter[currentChapter + 1]['ChapterLink'];
			imageData = [];
			goto(prevChap);
		}
	};

	const handleNextChapter = () => {
		console.log('next');
		if (currentChapter > 0) {
			let nextChap = mangaChapter[currentChapter - 1]['ChapterLink'];
			imageData = [];
			goto(nextChap);
		}
	};

	const handleChapterSelected = (chapter: string) => {
		imageData = [];
		goto(chapter);
	};

	const findChapter = (chapter: any, chapterLink: string) => {
		let i = chapter.length;
		while (i--) {
			if (chapter[i]['ChapterLink'] === chapterLink) {
				return i;
			}
		}
	};

	const fetchMangaImage = async (src: string, mangaTitle: string, chapter: string) => {
		fetchChapterCheck(src, mangaTitle);

		let res = await fetch(
			`${apiImage}?` +
				new URLSearchParams({
					src: src,
					mangaTitle: mangaTitle,
					chapter: chapter
				})
		);

		let json = await res.json();
		let mangasData = json['MangaData'];
		imageData = mangasData['Image'];
	};

	const fetchChapterCheck = async (src: string, mangaTitle: string) => {
		let res = await fetch(
			`${apiChapterCheck}?` +
				new URLSearchParams({
					src: src,
					mangaTitle: mangaTitle
				})
		);

		let json = await res.json();
		let mangasData = json['MangaData'];
		mangaChapter = mangasData['Chapter'];
		currentChapter = findChapter(mangaChapter, chapter);
	};

	$: fetchMangaImage(srcApi, mangaTitle, chapter);
</script>

<svelte:head>
	<title>Mangamee Read</title>
</svelte:head>

<div class="flex flex-col h-screen">
	<div class="flex-grow">
		<div class="my-10" />
		<div>
			{#each imageData as image}
				<img class="mx-auto" src={image['Image']} alt="" on:error={handleImageError} />
			{/each}
		</div>
	</div>

	{#if mangaChapter !== undefined && mangaChapter.length !== 0}
		<div class="bg-gray-300 p-2 fixed bottom-0 inset-x-0 opacity-75 flex justify-center">
			<div class="flex justify-between lg:w-2/6 w-4/5">
				<button on:click={handlePrevChapter} class="block text-center pr-2 font-semibold"
					>Prev</button
				>
				<select
					bind:value={chapter}
					on:change={() => handleChapterSelected(chapter)}
					class="block w-full text-center"
				>
					{#each mangaChapter as chapter}
						<option value={chapter['ChapterLink']}>
							{chapter['ChapterLink']}
						</option>
					{/each}
				</select>
				<button on:click={handleNextChapter} class="block text-center pr-2 font-semibold"
					>Next</button
				>
			</div>
		</div>
	{/if}
</div>