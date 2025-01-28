<template>
      <div class="question-container">
        <p class="question">{{ question.question }}</p>
        
        <!-- Render options based on the question type -->
        <div v-if="question.type === 'single-selection'" class="answers-container">
          <div v-for="(option, index) in question.options" :key="index" class="answer">
            <label>{{ option }}</label>
            <input type="radio" :name="question.id" :value="option" v-model="answers[question.id]">
          </div>
        </div>
        <div v-if="question.type === 'multi-selection'" class="answers-container">
          <div v-for="(option, index) in question.options" :key="index" class="answer">
            <label>{{ option }}</label>
            <input type="checkbox" :value="option" v-model="answers[question.id]">
          </div>
        </div>
        <div v-if="question.type === 'open-text'" class="text-answer" >
          <textarea v-model="answers[question.id]" ></textarea>
        </div>
        <div v-else-if="question.type === 'yes-no'" class="answers-container">
          <div class="answer">
            <label :for="`yes-${question.id}`">
              {{ isHebrew ? 'כן' : 'Yes' }}
            </label>
            <input
              type="radio" 
              :id="`yes-${question.id}`" 
              :name="`question-${question.id}`" 
              value="Yes"
              v-model="answers[question.id]" 
              :required="question.required"
            />
          </div>
          <div class="answer">
            <label :for="`no-${question.id}`">
              {{ isHebrew ? 'לא' : 'No' }}
            </label>
            <input 
              type="radio" 
              :id="`no-${question.id}`" 
              :name="`question-${question.id}`" 
              value="No"
              v-model="answers[question.id]" 
              :required="question.required"
            />
          </div> 
        </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      question: Object,
      answers: Object, // Receive the answers object as a prop
      isHebrew: Boolean,
    },
    setup(props) {
      return {
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
  