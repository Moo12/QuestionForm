<template>
    <div class="question-page" :style="backgroundStyle">
      <div class="question-container">
        <QuestionContent 
        :question="question" 
        :answers="answers"
        :isHebrew="isHebrew"
        />
        <!-- Back and Forward buttons -->
        <div class="back-forward-container">
          <button @click="goBack" v-if="currentIndex > 0">
            <ArrowRight />
          </button>
          <button @click="goForward"  v-if="currentIndex < totalQuestions - 1">
            <ArrowLeft />

          </button>
        <!-- Submit button appears only on the last question -->
      </div>
      <div v-for="childQuestion in question.children" :key="childQuestion.id">
        <QuestionContent 
        :question="childQuestion" 
        :answers="answers"
        :isHebrew="isHebrew"
        />
      </div>
      <button @click="submitForm" class="submit" v-if="currentIndex === totalQuestions - 1">שלח</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import QuestionContent from '@/components/QuestionContent.vue';
  import { ArrowRight, ArrowLeft  } from 'lucide-vue-next';

  export default {
    props: {
      question: Object,
      answers: Object, // Receive the answers object as a prop
      currentIndex: Number,
      totalQuestions: Number,
      isHebrew: Boolean,
    },
    components: {
      QuestionContent,
      ArrowRight,
      ArrowLeft,
    },
    setup(props, { emit }) {
      const backgroundStyle = computed(() => ({
        backgroundImage: 'url("https://your-background-image-url.com")',
        backgroundSize: 'cover',
        backgroundPosition: ''
      }));

      console.log("is hebrew:", props.isHebrew)
  
      const goBack = () => {
        console.log('back')
        emit('navigate', 'back');
      };
  
      const goForward = () => {
        console.log('forward')
        emit('navigate', 'forward');
      };
  
      const submitForm = () => {
        console.log('submit')
        emit('submit');
      };
  
      return {
        backgroundStyle,
        goBack,
        goForward,
        submitForm,
      };
    }
  };
  </script>
    
<style scoped>
  .question-page {
    display: flex;
    justify-content: center;
    height: 100vh;
    color: white;
    padding: 20px;
  }
  
  .question-container {
    background: rgba(0, 0, 0, 0);

    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
  }
  
  .question {
    color: black;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .answers-container {
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto auto; /* Checkbox and label in two columns */
  gap: 1px; /* Adjust spacing between items */
  align-items: center; /* Align items vertically */
}

.answer {
  display: contents; /* Grid items inherit grid behavior */
}

.answer input {
  justify-content: left;
}

.text-answer {
  width: 100%;
  height: 80px;
  resize: vertical;
  margin-top: 10px;
}

.back-forward-container {
  margin-left: 20px;
  display: flex; /* Use flex for better alignment control */
  gap: 1rem; /* Adjust spacing between buttons */
  justify-content:space-around /* Align buttons to the left, can also use center or space-between */
}

button {
  display: inline-block; /* Ensure buttons shrink-wrap their content */
  font: inherit; /* Match the button's font with inherited text */
  text-align: center;
}

button span {
  display: inline; /* Ensure the text inside the button defines its size */
}
</style>
  