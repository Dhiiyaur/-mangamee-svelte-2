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
					Authorization: jwt
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
			fetchUserHistory($jwt);
		}
	});
</script>

<svelte:head>
	<title>Mangamee history</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen">
	{#if userData !== undefined}
		<div class="pt-28" />
		<div class="w-full justify-center flex">
			<div class="flex justify-between w-4/5">
				<div>
					<div class="text-3xl font-semibold text-gray-600">Hi, {userData.username}</div>
				</div>
				<button class="text-red-500 font-bold" on:click={handleLogout}> Logout </button>
			</div>
		</div>
		<div class="justify-center items-center">
			<div class="grid grid-cols-3 sm:grid-cols-7 gap-4 p-3 py-20">
				{#each userData.UserMangaData as mangaData}
					<MangaCard dataManga={mangaData} userHistoryExt={true} jwtUser={$jwt} />
				{/each}
			</div>
		</div>
	{/if}
</div>
