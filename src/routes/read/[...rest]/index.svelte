<script context="module">
	export async function load({ page }) {
		const lang = 'EN';
		const url = page.params.rest;
		const rest = url.split('/');

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
    import {apiImage} from "../../../components/Api"

	let mangasData = [];
	let ImageData = [];

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.style.display = 'none';
		e.target.src = ' ';
	};

    const fetchMangaImage = async(mangaTitle :string, chapter : string) => {
        const res = await fetch(
			`${apiImage}?mangaTitle=${mangaTitle}&chapter=${chapter}`
		);
		mangasData = await res.json();
		ImageData = mangasData['Image'];
		console.log(ImageData)
    }

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
	<div class="bg-gray-300 p-2 fixed bottom-0 inset-x-0 opacity-75">
		<div class="text-center">{chapter}</div>
	</div>
</div>
