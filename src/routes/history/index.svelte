<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { jwt } from '../../components/Store';
	import { apiUserGetHistory } from '../../components/Api';
	import MangaCard from '../../components/Card.svelte';

	let userData;

	const fetchUserHistory = async (jwt) => {
		try {
			const response = await fetch(apiUserGetHistory, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: jwt["jwt"]
				}
			});
			userData = await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('jwt');
		window.location.href = '/';
	};

	onMount(() => {
		if ($jwt == 'null' || $jwt == undefined) {
			goto('/user/login');
		} else {
			const timestamp = new Date().getTime();
			if (timestamp > $jwt["expired"]) {
				localStorage.removeItem('jwt');
				window.location.href = '/user/login'
			} else {
				fetchUserHistory($jwt);
			}
		}
	});
</script>

<svelte:head>
	<title>Mangamee history</title>
</svelte:head>

<div class="bg-gray-800 min-h-screen">
	{#if userData !== undefined}
		<div class="sm:pt-28 pt-20" />
		<div class="w-full justify-center flex">
			<div class="flex justify-between w-4/5">
				<div>
					<div class="text-3xl font-semibold text-white">Hi, {userData.username}</div>
				</div>
				<button class="text-red-500 font-bold p-1 bg-white rounded-md" on:click={handleLogout}> Logout </button>
			</div>
		</div>
		<!-- <div class="justify-center items-center">
			<div class="grid grid-cols-3 sm:grid-cols-6 sm:gap-y-4 sm:gap-x-1 sm:py-20 sm:p-2"> -->
		<div class="flex justify-center">
			<div class="grid grid-cols-3 sm:grid-cols-6 sm:gap-y-4 sm:gap-x-1 gap-4 sm:pt-20 pt-10">
				{#each userData.UserMangaData as mangaData}
					<MangaCard dataManga={mangaData} userHistoryExt={true} jwtUser={$jwt} />
				{/each}
			</div>
		</div>
	{/if}
</div>
