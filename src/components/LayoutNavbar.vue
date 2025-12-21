<script setup lang="ts">
import { navbarData } from '@/constants'
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-white fixed-top shadow-sm" style="z-index: 1000">
    <div class="container">
      <RouterLink class="navbar-brand text-uppercase" to="/">
        <h1>Last Masquerade</h1>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="navbarItem in navbarData" :key="navbarItem.name">
            <RouterLink :to="navbarItem.path" class="nav-link">
              {{ navbarItem.name }}
            </RouterLink>
          </li>
          <li class="nav-item d-none d-lg-block ms-lg-3">
            <RouterLink class="nav-link" to="/cart">
              <i class="fas fa-shopping-cart"></i>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
