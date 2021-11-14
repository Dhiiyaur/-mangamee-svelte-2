<script lang="ts">
	import { apiUserDeleteHistory } from './Api';
	import { jwt } from '../components/Store';
	export let cardData: any, historyMode: boolean;
	let mangaData = cardData['MangaData'];
	let mangaSource = cardData['MangaSource'];

	if (historyMode) {
		mangaData = cardData['UserMangaData'];
	}

	const fetchDeleteUserHistory = async (jwt, mangaID) => {
		let userHistory = {
			mangaID: mangaID
		};
		try {
			const response = await fetch(apiUserDeleteHistory, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: jwt['jwt']
				},
				body: JSON.stringify(userHistory)
			})
				.then((res) => {
					console.log(res.status);
				})
				.catch((res) => console.log('error', res));
		} catch (error) {
			console.log('err', error);
		}
	};

	const handleDeleteUserManga = async (jwt, mangaID) => {
		await fetchDeleteUserHistory(jwt, mangaID);
		window.location.href = '/history';
	};
</script>

{#each mangaData as manga}
	<div class="bg-gray-600 sm:w-56 w-28 rounded-md shadow-lg flex flex-col justify-between gap-x-2">
		{#if historyMode}
			<div>
				<a href={`/manga/${manga['MangaSource']}/${manga['MangaLink']}`}>
					<div>
						<img
							src={manga['MangaCover']}
							alt=""
							class="w-full h-44 sm:h-64 object-cover rounded-t-md"
						/>
					</div>
					<div>
						<div class="py-4 p-2 text-sm text-white">{manga['MangaTitle']}</div>
					</div>
				</a>
			</div>
			<div class="text-right text-white text-xs pr-3 pb-2">
				Last Read - {manga['MangaLastRead']}
			</div>
			<div class="text-right text-white text-xs pr-3 pb-2">
				Last Update - {manga['MangaLastChapter']}
			</div>
			<div class="flex justify-center pt-5 pb-2">
				<button class="p-1 text-white shadow rounded bg-red-500" on:click={() => handleDeleteUserManga($jwt, manga['MangaLink'])}> Delete </button>
			</div>
		{:else}
			<div>
				<a href={`/manga/${mangaSource}/${manga['MangaLink']}`}>
					<div>
						<img
							src={manga['MangaCover']}
							alt=""
							class="w-full h-44 sm:h-64 object-cover rounded-t-md"
						/>
					</div>
					<div>
						<div class="py-4 p-2 text-sm text-white">{manga['MangaTitle']}</div>
					</div>
				</a>
			</div>
		{/if}
	</div>
{/each}
