<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { jwt } from '../../components/Store';
	import { apiUserGetHistory } from '../../components/Api';
	import MangaCard from '../../components/Card.svelte';

	let userData;

	const checkUserTokenAndFetch = async (jwt) => {
		try {
			const response = await fetch(apiUserGetHistory, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: jwt['jwt']
				}
			});

			if (response.status !== 200) {
				localStorage.removeItem('jwt');
				window.location.href = '/user/login';
			} else {
				userData = await response.json();
			}
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
			checkUserTokenAndFetch($jwt);
		}
	});
</script>

<svelte:head>
	<title>Mangamee history</title>
</svelte:head>

<div>
	<div class="bg-gray-800 min-h-screen justify-center items-center">
		{#if userData !== undefined && userData.length != 0}
			<div class="w-full justify-center flex">
				<div class="flex justify-between w-4/5 pt-5">
					<div>
						<div class="text-3xl font-semibold text-white">Hi, {userData.username}</div>
					</div>
					<button
						class="text-white font-bold p-1 bg-red-500 rounded-md text-xs"
						on:click={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>

			<div class="flex justify-center">
				<div class="grid grid-cols-3 sm:grid-cols-6 sm:gap-y-4 sm:gap-x-1 gap-4 py-20">
					<MangaCard cardData={userData} historyMode={true} />
				</div>
			</div>
		{/if}
	</div>
</div>
