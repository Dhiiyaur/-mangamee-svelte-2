<script lang="ts">
import { goto } from '$app/navigation';

    export let dataManga:any
    export let lastchapterMenu:boolean = false
    export let userHistoryExt:boolean = false
    export let jwtUser:string
    import { apiUserDeleteHistory } from './Api'
    
    
	const fetchDeleteUserHistory = async (jwtUser, mangaID) => {

        let userHistory = {
            "mangaID" : mangaID
		}
		try {
			const response = await fetch(apiUserDeleteHistory, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: jwtUser
				},
                body: JSON.stringify(userHistory)
			}).then((res) => {
                console.log(res.status)

            }).catch(res => console.log("ereer", res))
			// let res = await response.json();
            // console.log("res", res)
		} catch (error) {
			console.log("err", error);
		}
	};
    
    const handleDeleteUserManga = async(jwtUser, mangaID) => {
        await fetchDeleteUserHistory(jwtUser, mangaID)
        window.location.href='/history'
        // goto('/history')
    }
</script>


<div class="bg-white rounded-lg shadow-lg">
    <a href={`/manga/${dataManga.MangaLink}`}>
        <header>
          <img class="rounded-t-lg lg:h-64 h-48 w-full object-cover" src={dataManga.MangaCover} alt="avatar" />
        </header>
        <div class="py-4 p-2 text-sm">{dataManga.MangaTitle}</div>

    </a>
        {#if lastchapterMenu}    
            <footer class="text-right text-gray-500 text-xs pr-3 pb-2">Last Update - {dataManga.MangaLastChapter}</footer>
        {/if}

        {#if userHistoryExt}
            <!-- <footer class="text-right text-gray-500 text-xs pr-3 pb-2">Last Update - {dataManga.MangaLastChapter}</footer> -->
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
        {/if}
    
</div>