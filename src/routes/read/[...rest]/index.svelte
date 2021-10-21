<script context="module">

	export async function load({ page }) {
		let url = page.params.rest;
		let rest = url.split('/');
		return {
			props: {
				mangaTitle: rest[0],
				chapter: rest[1]
			}
		};
	}
</script>

<script lang="ts">

	export let mangaTitle: string, chapter: string;
	import { goto } from "$app/navigation";
    import {apiImage} from "../../../components/Api"
	import { dataChapter } from '../../../components/Store'

	let ImageData = [];

	let currentChapter; 
	let navigatorButton = true;
	
	const findChapter = (chapter, chapterLink: string) => {
		let i = chapter.length;
		while (i--) {
			if (chapter[i]['ChapterLink'] === chapterLink) {
				return i;
			}
		}
	};

	const handlePrevChapter = () => {
		console.log('prev');
		if (currentChapter < $dataChapter.length) {
			let prevChap = $dataChapter[currentChapter + 1]['ChapterLink']
			ImageData = []
			goto(prevChap)
		}
		
	};

	const handleNextChapter = () => {
		console.log('next');
		if (currentChapter > 0) {
			let nextChap = $dataChapter[currentChapter - 1]['ChapterLink']
			ImageData = []
			goto(nextChap)
		}
	};

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.style.display = 'none';
		e.target.src = ' ';
	};

	const fetchMangaImage = async (mangaTitle: string, chapter: string) => {
		let res = await fetch(`${apiImage}?mangaTitle=${mangaTitle}&chapter=${chapter}`);
		let mangasData = await res.json();
		ImageData = mangasData['Image'];
		currentChapter = findChapter($dataChapter, chapter)
		console.log("current", currentChapter)
	};

	$: fetchMangaImage(mangaTitle, chapter)

</script>
<div class="flex flex-col h-screen">
	<div class="flex-grow">
		<div class="my-10" />
		<div>
			{#each ImageData as image}
				<img class="mx-auto" src={image['Image']} alt="" on:error={handleImageError} />
			{/each}
		</div>
	</div>
	<div class="bg-gray-300 p-2 fixed bottom-0 inset-x-0 opacity-75 flex justify-center">
		<div class="flex justify-between lg:w-2/6 w-4/5">
			<button
				on:click={handlePrevChapter}
				class={`${navigatorButton ? 'block' : 'hidden'} text-center`}>Prev</button
			>
			<div class="text-center truncate pr-2 pl-2">{chapter}</div>
			<button
				on:click={handleNextChapter}
				class={`${navigatorButton ? 'block' : 'hidden'} text-center`}>Next</button
			>
		</div>
	</div>
</div>
