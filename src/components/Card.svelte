<script lang="ts">
    export let dataManga:any
    export let lastchapterMenu:boolean = true
</script>


<div class="bg-white rounded-lg shadow-lg">
    <a href={`/manga/${dataManga.MangaLink}`}>
        <header>
          <img class="rounded-t-lg lg:h-64 h-48 w-full object-cover" src={dataManga.MangaCover} alt="avatar" />
        </header>
        <div class="py-4 p-2 text-sm">{dataManga.MangaTitle}</div>
        {#if lastchapterMenu}    
            <footer class="text-right text-gray-500 text-xs pr-3 pb-2">Last Update - {dataManga.MangaLastChapter}</footer>
        {/if}
    </a>
</div>