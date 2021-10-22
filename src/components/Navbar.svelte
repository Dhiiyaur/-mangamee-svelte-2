<script lang="ts">
    let isMobile : boolean = false
    const handleToggle = () => {
      isMobile = !isMobile
    }

    

</script>

<div class="bg-gradient-to-br from-pink-500 to-red-300 fixed inset-x-0">
    <div class="flex justify-between p-2 lg:hidden border-b">
      <div>
        <p class="uppercase font-semibold text-white pt-1">Mangamee</p>
      </div>
      <div>
        <button on:click={handleToggle} class="focus:outline-none text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
    <div>
      <div class={`${isMobile ? "block" : "hidden"} lg:flex justify-center flex-col lg:flex-row py-2 lg:py-2`}>
        <a href="/" class="block px-5 py-1 text-white hover:text-gray-200"> Home </a>
        <a href="/browse/1" class="block px-5 py-1 text-white hover:text-gray-200"> Browse </a>
        <a href="/" class="block px-5 py-1 text-white hover:text-gray-200"> History </a>
      </div>
    </div>
</div>
  