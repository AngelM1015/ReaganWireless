<template>
  <div>
    <img src="~/assets/images/company_people.jpg" alt="reagan-group-photo" class="w-full" />
    <div class="p-5 container py-10 mx-auto grid md:grid-cols-2 gap-10">
      <!-- <div class="p-5 container mx-auto flex flex-wrap gap-10"> -->
      <div class="flex flex-col gap-5 max-w-3xl">
        <h1 class="text-2xl md:text-3xl font-semibold">Reagan Wireless Corp.</h1>
        <div class="text-sm md:text-base">
          <p>
            For over 28 years, our company has maintained a strong presence in the cellular phone distribution industry, building an impressive track record of corporate
            accomplishments in Florida and beyond.
          </p>
          <p>
            Reagan Wireless is based in Deerfield Beach, Florida and owns and operates a 78,000 square-foot warehouse with 32 feet from floor to ceiling space. We are
            <span class="font-medium">R2: 2013</span>, <span class="font-medium">ISO 14001:2015</span>, <span class="font-medium">ISO 45001:2018</span> certified. Our
            company recycles more than 95 percent of its disposable material which includes OEM batteries, LCD displays, circuit boards, plastics, and other items.
          </p>
          <p>
            We also maintain compliance with the Deerfield Beach Environmental Agency, the Waste Electrical and Electronic Equipment Directive, Restriction of Hazardous
            Substances Compliance, and the Environmental Protection Agency.
          </p>
        </div>
      </div>
      <div class="self-center">
        <img loading="lazy" src="~assets/images/reagan_people.svg" alt="reagan-group-photo" width="600px" height="200px" />
      </div>
    </div>
    <div class="p-5 py-20 flex flex-col gap-5 container mx-auto">
      <h2 class="text-3xl md:text-4xl m-auto font-semibold">Management Team</h2>
      <TeamCarousel />
    </div>
    <div class="flex flex-col px-5">
      <h2 class="text-center text-3xl md:text-4xl font-semibold mb-4">Eco-Conscious</h2>
      <p class="text-center text-sm md:text-base font-medium md:font-normal">
        We are an environmental buyer, seller, and refurbisher of mobile phones, tablets, and other small electronics. <br />
        Reagan Wireless is dedicated to the protection of non-renewable resources.
      </p>
    </div>
    <div class="p-2 container py-10 mx-auto grid md:grid-cols-3 gap-1">
      <div class="flex flex-col gap-5 p-6">
        <img loading="lazy" width="120" height="120" src="~assets/images/R22013_mark.svg" alt="certified-logos"  class="m-auto" />

        <h3 class="text-center text-base lg:text-lg font-bold md:font-semibold">R2:2013 - Sustainable Electronics Recycling International</h3>
        <p class="black-700 text-center text-sm md:text-base">R2 is rigorously and independently audited, emphasizing quality, safety, and transparency.</p>
        <button class="flex items-center text-sm md:text-base m-auto text-gray-400 font-semibold md:font-normal">Read more -></button>
      </div>
      <div class="flex flex-col gap-5 p-6">
        <img loading="lazy" width="120" height="120" src="~assets/images/ISO15001.svg" alt="certified-logos" class="m-auto" />

        <h3 class="text-center text-base lg:text-lg font-bold md:font-semibold">ISO 45001:2018</h3>
        <p class="black-700 text-center text-sm md:text-base">
          ISO 45001:2018 specifies requirements for an occupational health and safety (OH&S) management system, and gives guidance...
        </p>
        <button class="flex items-center text-sm md:text-base m-auto text-gray-400 font-semibold md:font-normal">Read more -></button>
      </div>
      <div class="flex flex-col gap-5 p-6">
        <img loading="lazy" width="120" height="120" src="~assets/images/ISO14001.svg" alt="certified-logos" class="m-auto" />

        <h3 class="text-center text-base lg:text-lg font-bold md:font-semibold">ISO 14001:2015 - Requirements for an Environmental Management Systems</h3>
        <p class="black-700 text-center text-sm md:text-base">Environmental management system that an organization can use to enhance...</p>
        <button class="flex items-center text-sm md:text-base m-auto text-gray-400 font-semibold md:font-normal">Read more -></button>
      </div>
    </div>
    <Subscribe />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Company',
  meta: [
    {
      name: 'description',
      content:
        'Reagan Wireless is a leading distributor of cellular phones and accessories in the United States. Reagan Wireless is based in Deerfield Beach, Florida and owns and operates a 78,000 square-foot warehouse with 32 feet from floor to ceiling space.',
    },
  ],
})
</script>
