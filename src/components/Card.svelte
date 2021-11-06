<script lang="ts">
	export let cardData: any
	let mangaData = cardData["MangaData"];
	let mangaSource = cardData["MangaSource"];
</script>

{#each mangaData as manga}
	<div class="bg-gray-600 sm:w-56 w-28 rounded-md shadow-lg flex flex-col justify-between gap-x-2">
		<div>
			<a href={`/manga/${mangaSource}/${manga["MangaLink"]}`}>
				<div>
					<img src={manga["MangaCover"]} alt="" class="w-full h-44 sm:h-64 object-cover rounded-t-md" />
				</div>
				<div>
					<div class="py-4 p-2 text-sm text-white">{manga["MangaTitle"]}</div>
				</div>
			</a>
		</div>
	</div>
{/each}


<!-- <div class="grid grid-cols-3 sm:grid-cols-6 sm:gap-y-4 sm:gap-x-1 gap-4 py-28">
	{#each mangaData as manga}
		<div
			class="bg-gray-600 sm:w-56 w-28 rounded-md shadow-lg flex flex-col justify-between gap-x-2"
		>
			<div>
				<a href={`/manga/${mangaSource}/${manga.MangaLink}`}>
					<div>
						<img
							src={manga.MangaCover}
							alt=""
							class="w-full h-44 sm:h-64 object-cover rounded-t-md"
						/>
					</div>
					<div>
						<div class="py-4 p-2 text-sm text-white">{manga.MangaTitle}</div>
					</div>
				</a>
			</div>
			<div> -->
				<!-- {#if lastchapterMenu}
			<div class="text-right text-white text-xs pr-3 pb-2">
				Last Update - {dataManga.MangaLastChapter}
			</div>
		{/if}
		{#if userHistoryExt}
			<div class="text-right text-white text-xs truncate pr-2 pl-4">
				Last Update - {dataManga.MangaLastChapter}
			</div>
			<div class="text-right text-white text-xs truncate pr-2 pl-4">
				Last Read - {dataManga.MangaLastRead}
			</div>
		{/if} -->
			<!-- </div>
			<div> -->
				<!-- {#if userHistoryExt}
			<div class="justify-center flex pb-2 pt-2">
				<button
					class="p-1 text-red-500 text-sm shadow rounded bg-white"
					on:click={(e) => {
						handleDeleteUserManga(jwtUser, dataManga.MangaLink);
					}}
				>
					Delete
				</button>
			</div>
		{/if} -->

		
			<!-- </div>
		</div>
	{/each}
</div> -->

<!-- <script lang="ts">
	export let data: any;
	export let lastchapterMenu: boolean = false;
	export let userHistoryExt: boolean = false;
	export let jwtUser: string;
	import { apiUserDeleteHistory } from './Api';


	console.log("data", data)
	let dataManga = data.mangaData
	let dataMangaSource  = data.MangaSource

	if (dataMangaSource == undefined) {
		dataMangaSource = 'en'
	}

	const fetchDeleteUserHistory = async (jwtUser, mangaID) => {
		let userHistory = {
			mangaID: mangaID
		};
		try {
			const response = await fetch(apiUserDeleteHistory, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: jwtUser
				},
				body: JSON.stringify(userHistory)
			})
				.then((res) => {
					console.log(res.status);
				})
				.catch((res) => console.log('ereer', res));
		} catch (error) {
			console.log('err', error);
		}
	};

	const handleDeleteUserManga = async (jwtUser, mangaID) => {
		await fetchDeleteUserHistory(jwtUser, mangaID);
		window.location.href = '/history';
	};
</script>

<div class="bg-gray-600 sm:w-56 w-28 rounded-md shadow-lg flex flex-col justify-between gap-x-2">
	<div>
		<a href={`/manga/${dataManga.MangaSource}/${dataManga.MangaLink}`}>
			<div>
				<img src={dataManga.MangaCover} alt="" class="w-full h-44 sm:h-64 object-cover rounded-t-md" />
			</div>
			<div>
				<div class="py-4 p-2 text-sm text-white">{dataManga.MangaTitle}</div>
			</div>
		</a>
	</div>
	<div>
		{#if lastchapterMenu}
			<div class="text-right text-white text-xs pr-3 pb-2">
				Last Update - {dataManga.MangaLastChapter}
			</div>
		{/if}
		{#if userHistoryExt}
			<div class="text-right text-white text-xs truncate pr-2 pl-4">
				Last Update - {dataManga.MangaLastChapter}
			</div>
			<div class="text-right text-white text-xs truncate pr-2 pl-4">
				Last Read - {dataManga.MangaLastRead}
			</div>
		{/if}
	</div>
	<div>
		{#if userHistoryExt}
			<div class="justify-center flex pb-2 pt-2">
				<button
					class="p-1 text-red-500 text-sm shadow rounded bg-white"
					on:click={(e) => {
						handleDeleteUserManga(jwtUser, dataManga.MangaLink);
					}}
				>
					Delete
				</button>
			</div>
		{/if}
	</div>
</div> -->

<!-- <div class="bg-white rounded-lg shadow-lg">
	<a href={`/manga/${dataManga.MangaLink}`}>
		<div>
			<img
				class="rounded-t-lg lg:h-64 h-48 w-full object-cover"
				src={dataManga.MangaCover}
				alt="avatar"
			/>
		</div>
		<div class="py-4 p-2 text-sm">{dataManga.MangaTitle}</div>
	</a>
	{#if lastchapterMenu}
		<div class="text-right text-gray-500 text-xs pr-3 pb-2">
			Last Update - {dataManga.MangaLastChapter}
		</div>
	{/if}

	{#if userHistoryExt}
		<footer class="text-right text-gray-500 text-xs pr-3 pb-2">Last Update - {dataManga.MangaLastChapter}</footer>
		<footer>
                <div>
                    <div class="text-right text-gray-500 text-xs pr-3 pb-2">
                        Last Update - {dataManga.MangaLastChapter}
                    </div>
                    <div class="text-right text-gray-500 text-xs pr-3 pb-2">
                        Last Read - {dataManga.MangaLastRead}
                    </div>
                </div>
                <div class="flex justify-center pt-1">
                    <button class="p-1 text-red-500 shadow rounded bg-white" on:click={(e) => {handleDeleteUserManga(jwtUser, dataManga.MangaLink)}}>
                        Delete
                    </button>
                </div>
            </footer>

        <div class="bg-red-500">
            <div>
                <div class="text-right text-gray-500 text-xs">
                    Last Update - {dataManga.MangaLastChapter}
                </div>
                <div class="text-right text-gray-500 text-xs">
                    Last Read - {dataManga.MangaLastRead}
                </div>
            </div>
            <div>
                <button
                    class="p-1 text-red-500 shadow rounded bg-white"
                    on:click={(e) => {
                        handleDeleteUserManga(jwtUser, dataManga.MangaLink);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
	{/if}
</div> -->
