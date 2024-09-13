<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg text-center fixed-top"
      :class="{ 'scrolled': isScrolled }"
    >
      <div class="container-fluid justify-content-center text-center">
        <a class="navbar-brand" href="#">Experience Website</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/">Home</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/about">About</router-link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'App',
  setup() {
    const isScrolled = ref(false);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        isScrolled.value = true;
      } else {
        isScrolled.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
    };
  },
};
</script>

<style>
/* Initial transparent navbar style */
.navbar {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

/* Background color when scrolled */
.navbar.scrolled {
  background-color: #697565;
}

/* Navbar link styles */
.navbar-nav .nav-item {
  color: #ECDFCC;
  text-decoration: none;
}

.navbar-nav .nav-item:hover  {
  background-color: #3C3D37;
  border-radius: 25px;
  transition: background-color 0.3s ease, transform 0.5s ease;
}

.navbar-nav .nav-item {
  margin: 6px;
}

.navbar-nav .nav-item:hover {
  transform: scale(1.2);
}
nav a{
  color: #ECDFCC;
  text-decoration: none;
}
nav li {
  text-decoration: none;
  transition: transform 0.5s ease;
}

nav li:hover {
  transform: scale(1.2);
}
</style>
