<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiUserRegister } from '../../components/Api';
	
	let userData = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	let errCpw;
	let errID;

	const handleSumbit = async () => {
		if (userData.password == userData.confirmPassword) {
			let dataSend = {
				username: userData.username,
				email: userData.email,
				password: userData.password
			};

			try {
				const response = await fetch(apiUserRegister, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataSend)
				}).then(async (res) => {
					if (res.status != 201) {
						errID = await res.json();
					} else {
						goto('/user/login');
					}
				});
			} catch (error) {
				console.log('err', error);
			}
		} else {
			errCpw = "password didn't match";
		}
	};
</script>

<div class="min-h-screen bg-gray-300 flex justify-center items-center">
	<div class="pt-52" />
	<div class="bg-white w-4/5 lg:w-3/12 rounded-3xl shadow-lg">
		<div class="p-7 lg:p-10">
			<div class="flex justify-center font-semibold text-gray-600">SIGN UP</div>
			<br />
			<div>
				<form class="space-y-3" on:submit|preventDefault={handleSumbit}>
					<div class="grid">
						<label class="text-sm text-gray-500 " for="username">Username</label>
						<input
							id="username"
							class="border-2 border-gray-300 text-sm p-1"
							minlength="3"
							type="text"
							required
							bind:value={userData.username}
						/>
					</div>
					{#if errID !== undefined}
						<div class="grid">
							<div class="text-sm text-red-600">
								{errID}
							</div>
						</div>
					{/if}
					<div class="grid">
						<label class="text-sm text-gray-500" for="email">Email</label>
						<input
							id="email"
							class="border-2 border-gray-300 text-sm p-1"
							type="email"
							required
							bind:value={userData.email}
						/>
					</div>
					<div class="grid">
						<label class="text-sm text-gray-500" for="pw">Password</label>
						<input
							id="pw"
							class="border-2 border-gray-300 text-sm p-1"
							minlength="6"
							required
							type="password"
							bind:value={userData.password}
						/>
					</div>
					<div class="grid">
						<label class="text-sm text-gray-500" for="cpw">Confirm Password</label>
						<input
							id="cpw"
							class="border-2 border-gray-300 text-sm p-1"
							minlength="6"
							required
							type="password"
							bind:value={userData.confirmPassword}
						/>
					</div>
					{#if errCpw !== undefined}
						<div class="grid">
							<div class="text-sm text-red-600">
								{errCpw}
							</div>
						</div>
					{/if}
					<br />
					<div class="bg-red-400 flex justify-center p-3 rounded-2xl text-white font-semibold">
						<button class="text-sm" type="sumbit"> Get Started </button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
