<script lang="ts">
	let menu = false;
</script>

<div>
	<div class="p-3 bg-gray-900">
		<div class="justify-center space-x-7 hidden lg:flex">
			<a href="/" class="text-white hover:text-blue-300 font-semibold"> Home </a>
			<a href="/browse/1" class="text-white hover:text-blue-300 font-semibold"> Browse </a>
			<a href="/history" class="text-white hover:text-blue-300 font-semibold"> History </a>
		</div>
		<div class="flex justify-end">
			<button class="focus:outline-none text-white lg:hidden" on:click={() => (menu = !menu)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					/>
				</svg>
			</button>
		</div>
	</div>

	<div
		class={`${
			menu ? '' : '-translate-x-full'
		} w-64 bg-gray-900 min-h-screen absolute inset-y-0 left-0`}
	>
		<nav class="flex flex-col pt-10">
			<div class="font-bold text-white text-center text-3xl">MangaMee</div>
			<div class="flex-col flex space-y-3 pt-10">
				<div class="justify-center flex hover:bg-blue-300">
					<a
						href="/"
						class="font-bold text-white text-center p-2 text-xl"
						on:click={() => {
							if (menu) {
								menu = false;
							}
						}}
						><i class="fas fa-home pr-4" /> Home
					</a>
				</div>
				<div class="justify-center flex hover:bg-blue-300">
					<a
						href="/browse/1"
						class="font-bold text-white text-center text-xl p-2"
						on:click={() => {
							if (menu) {
								menu = false;
							}
						}}
						><i class="fas fa-search pr-4" /> Browse
					</a>
				</div>
				<div class="justify-center flex hover:bg-blue-300">
					<!-- <a href="/history" class="font-bold text-white text-center  text-xl p-2" on:click={() => { -->
					<a
						href="/"
						class="font-bold text-white text-center  text-xl p-2"
						on:click={() => {
							if (menu) {
								menu = false;
							}
						}}
						><i class="fas fa-book-open pr-4" /> History
					</a>
				</div>
			</div>
		</nav>
	</div>
</div>
