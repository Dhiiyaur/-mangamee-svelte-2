<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiUserLogin } from '../../components/Api';
	import { jwt } from '../../components/Store';

	let userData = {
		username: '',
		password: ''
	};

	const fetchUserData = async () => {
		try {
			const response = await fetch(apiUserLogin, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
			});
			const data = await response.json();
			console.log(data)
			// jwt.set(data.token);
			const timestamp = new Date().getTime(); // current time
			const exp = timestamp + (60 * 60 * 23 * 1000)

			jwt.set({
				"jwt" : data.token,
				"expired" : exp
			});

			goto('/history');
		} catch (error) {
			console.log(error);
		}
	};

	const handleSumbit = () => {
		fetchUserData();
	};
</script>

<div class="min-h-screen bg-gray-800 flex justify-center items-center">
	<div class="pt-52" />
	<div class="bg-white w-4/5 lg:w-3/12 rounded-3xl shadow-lg">
		<div class="p-7 lg:p-10">
			<div class="flex justify-center font-semibold text-gray-600">SIGN IN</div>
			<br />
			<div>
				<form class="space-y-3" on:submit|preventDefault={handleSumbit}>
					<div class="grid">
						<label class="text-sm text-gray-500 " for="username">Username</label>
						<input
							id="username"
							class="border-2 border-gray-300"
							type="text"
							bind:value={userData.username}
						/>
					</div>
					<div class="grid">
						<label class="text-sm text-gray-500" for="pw">Password</label>
						<input
							id="pw"
							class="border-2 border-gray-300"
							type="password"
							bind:value={userData.password}
						/>
					</div>
					<br />
					<div class="bg-red-400 flex justify-center p-3 rounded-2xl text-white font-semibold">
						<button class="text-sm" type="sumbit"> Lets Go </button>
					</div>
				</form>
				<div class="flex justify-center text-sm text-blue-300 pt-5">
					<a href="/user/register">Don't have an account ? register here</a>
				</div>
			</div>
		</div>
	</div>
</div>
