<template>
    <div class="carousel d-block w-100">
      <img 
        :src="images[currentImage]" 
        :alt="'Carousel image ' + (currentImage + 1)" 
        class="carousel-image "
        @error="handleImageError"
        v-if="!imageError"
      />
      <p v-else>Error loading image</p>

      <!-- Side Buttons for Carousel Navigation -->
      <button class="carousel-control-prev" type="button" @click="prevImage">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" @click="nextImage">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      <!-- <div class="carousel-nav-button left" >&#9664;</div> -->
      <!-- <div class="carousel-nav-button right" >&#9654;</div> -->

      <!-- Dot Indicators -->
      <div class="dot-indicators">
        <span 
          v-for="(image, index) in images" 
          :key="index" 
          :class="{ active: index === currentImage }" 
          class="dot" 
          @click="goToImage(index)"
        ></span>
      </div>
    </div>
  <div class="container mt-5 mb-5">
    <!-- <h1>Home Page</h1>
    <p>Welcome to the Home page!</p>
    <p>In This Project I'm Trying Vue Router</p> -->
    <!-- <h2>Image Carousel</h2> -->

    <!-- Other content (counter, color box, etc.) -->
    <div class="row justify-content-center text-center">
      <div class="col-6">
        <div class="card" data-aos="slide-up" data-aos-duration="1000" data-aos-ease="ease" data-aos-delay="400">
          <div class="card-body">
            <h3 class="mt-3">Try The Button Clicker</h3>
            <h5 class="mt-3">Clicked {{ count }} times</h5>
            <button id="btn-counter" class="btn me-2 mt-2" @click="decrementCounter">Try me for decrement</button>
            <button id="btn-counter" class="btn mt-2" @click="incrementCounter">Try me for increment</button>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card" data-aos="slide-up" data-aos-duration="1000" data-aos-ease="ease" data-aos-delay="400">
          <div class="card-body">
            <h3>Color Box</h3>
            <div :style="{ backgroundColor: boxColor }" class="color-box" aria-label="Color Box"></div>
            <div class="color-picker-container">
              <input type="color" v-model="boxColor" class="color-picker" aria-label="Pick Color" />
              <button id="btn-counter" class="btn mt-2" @click="changeColor" aria-label="Change Color">Change Color</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

export default {
  setup() {
    const count = ref(0);
    const boxColor = ref('#ffffff'); // Default color for the color box
    const images = ref([
      'https://plus.unsplash.com/premium_photo-1671117822973-0c2fc8431588?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1671117823451-745567810b4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1671209795288-cdbcf73bb53e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]); // Array of image URLs
    const currentImage = ref(0); // Index of the current image
    const imageError = ref(false); // To handle image errors
    let autoplayInterval = null;

    const incrementCounter = () => {
      count.value++;
    };

    const decrementCounter = () => {
      if (count.value > 0) {
        count.value--;
      }
    };

    const changeColor = () => {
      console.log(`Color changed to: ${boxColor.value}`);
    };

    const nextImage = () => {
      currentImage.value = (currentImage.value + 1) % images.value.length;
      imageError.value = false; // Reset error state when changing image
    };

    const prevImage = () => {
      currentImage.value = (currentImage.value - 1 + images.value.length) % images.value.length;
      imageError.value = false; // Reset error state when changing image
    };

    const handleImageError = () => {
      imageError.value = true;
    };

    const goToImage = (index) => {
      currentImage.value = index;
      imageError.value = false;
    };

    // Autoplay functionality
    const startAutoplay = () => {
      autoplayInterval = setInterval(nextImage, 3000); // Change every 3 seconds
    };

    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };

    onMounted(() => {
      AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1s
      startAutoplay(); // Start autoplay
    });

    onBeforeUnmount(() => {
      stopAutoplay(); // Stop autoplay when component is destroyed
    });

    return {
      count,
      incrementCounter,
      decrementCounter,
      boxColor,
      changeColor,
      images,
      currentImage,
      nextImage,
      prevImage,
      imageError,
      handleImageError,
      goToImage,
    };
  },
  name: 'HomePage'
};
</script>

<style>
.card {
  box-shadow: 0 4px 4px 0 #697565;
}

.card-body {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#btn-counter {
  background-color: #3C3D37;
  color: #ECDFCC;
}

#btn-counter:hover {
  box-shadow: 0 4px 10px 0 #697565;
}

.color-box {
  width: 100%;
  height: 150px;
  border: 1px solid #ddd;
  margin-top: 15px;
}

.color-picker-container {
  margin-top: 15px;
}

.color-picker {
  margin-right: 10px;
}


.carousel-image {
  width: 100%;
  height: auto;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.arrow-button {
  background-color: #3C3D37;
  color: #ECDFCC;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

.arrow-button:hover {
  background-color: #697565;
}

.carousel p {
  color: red;
  text-align: center;
  margin-top: 10px;
}

/* Carousel Navigation Buttons */
.carousel-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  color: #ECDFCC;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  cursor: pointer;
  user-select: none;
}

.carousel-nav-button.left {
  left: 0;
}

.carousel-nav-button.right {
  right: 0;
}

.carousel-nav-button:hover {
  background-color: #697565;
}

/* Dot Indicators */
.dot-indicators {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  height: 15px;
  width: 15px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.dot.active {
  background-color: #3C3D37;
}
</style>
