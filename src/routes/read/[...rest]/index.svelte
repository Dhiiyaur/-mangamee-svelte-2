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
	import { goto } from '$app/navigation';
	import { apiImage, apiUserCreateHistory } from '../../../components/Api';
	import { dataChapter, tempDataUserHistory, jwt } from '../../../components/Store';

	let ImageData = [];

	let currentChapter:number;
	let navigatorButton:boolean = true;
	let sel:string;

	// const fetchUserHistory = async (userData, jwt) => {
	// 	try {
	// 		const response = await fetch(apiUserCreateHistory, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: jwt
	// 			},
	// 			body: JSON.stringify(userData)
	// 		});
	// 		const data = await response.json();
	// 		console.log(data)

	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleSaveHistory = async(dataChapter, currentChapter, tempUserHistory, mangaLink, chapter, jwt) => {
		let userHistory = {
			MangaCover : tempUserHistory["cover"],
			MangaLink : mangaLink,
			MangaTitle : tempUserHistory["title"],
			MangaLastRead : chapter,
			MangaLastChapter : dataChapter[0]['ChapterLink'],
		}

		// console.log(userHistory)
		// console.log(jwt)

		try {
			const response = await fetch(apiUserCreateHistory, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: jwt
				},
				body: JSON.stringify(userHistory)
			});
			const data = await response.json();
			// console.log(data)

		} catch (error) {
			console.log(error);
		}
	}


	const findChapter = (chapter:any, chapterLink: string) => {
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
			let prevChap = $dataChapter[currentChapter + 1]['ChapterLink'];
			ImageData = [];
			goto(prevChap);
		}
	};

	const handleNextChapter = () => {
		console.log('next');
		if (currentChapter > 0) {
			let nextChap = $dataChapter[currentChapter - 1]['ChapterLink'];
			ImageData = [];
			goto(nextChap);
		}
	};

	const handleChapterSelected = (chapter:string) => {
		ImageData = [];
		goto(chapter);
	};

	const handleImageError = (e:any) => {
		e.target.onerror = null;
		e.target.style.display = 'none';
		e.target.src = ' ';
	};

	const fetchMangaImage = async (mangaTitle: string, chapter: string) => {
		let res = await fetch(`${apiImage}?mangaTitle=${mangaTitle}&chapter=${chapter}`);
		let mangasData = await res.json();
		ImageData = mangasData['Image'];
		currentChapter = await findChapter($dataChapter, chapter);
		sel = chapter;

		// 
		handleSaveHistory($dataChapter, currentChapter, $tempDataUserHistory, mangaTitle, chapter, $jwt)
	};

	$: fetchMangaImage(mangaTitle, chapter);
</script>

<svelte:head>
	<title>Mangamee Read</title>
</svelte:head>

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
				class={`${navigatorButton ? 'block' : 'hidden'} text-center pr-2 font-semibold`}
				>Prev</button
			>
			<!-- <div class="text-center truncate pr-2 pl-2">{chapter}</div> -->
			<select bind:value={sel} on:change={() => handleChapterSelected(sel)} class="block w-full">
				{#each $dataChapter as chapter}
					<option value={chapter['ChapterLink']}>
						{chapter['ChapterLink']}
					</option>
				{/each}
			</select>
			<button
				on:click={handleNextChapter}
				class={`${navigatorButton ? 'block' : 'hidden'} text-center pl-2 font-semibold`}
				>Next</button
			>
		</div>
	</div>
</div>
