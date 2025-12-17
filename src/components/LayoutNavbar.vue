<script setup lang="ts">
  import { navbarData } from '@/constants';
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-white fixed-top shadow-sm" style="z-index: 1000;">
    <div class="container">
      <a class="navbar-brand text-uppercase" href="#banner-section">
        <h1>Last Masquerade</h1>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li 
          class="nav-item"
          v-for="navbarItem in navbarData" :key="navbarItem.name">
            <RouterLink 
              :to="navbarItem.path"
              class="nav-link"
            >
              {{ navbarItem.name }}
            </RouterLink>
          </li>
          <li class="nav-item d-none d-lg-block ms-lg-3">
            <a class="nav-link" href="mailto:order@lastmasquerade.com?subject=我想購買">
              <i class="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>