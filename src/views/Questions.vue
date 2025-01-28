<template>
  <div>
    <QuestionPage 
      :question="filteredQuestions[currentIndex]" 
      :currentIndex="currentIndex" 
      :totalQuestions="filteredQuestions.length"
      :answers="answers"
      :isHebrew="false"
      @navigate="handleNavigation"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue';
import questions from "@/questions/questions-hebrew.json";
import QuestionPage from '@/components/QuestionPage.vue';

export default {
  name: "QuestionsMain",
  components: {
    QuestionPage,
  },
  setup() {
    const questionsData = ref(questions);

    const currentIndex = ref(0);

    document.body.classList.add('rtl');

    const answers = reactive(
      questions.reduce((acc, question) => {
      acc[question.id] = question.type === 'multi-selection' ? [] : '';
      return acc;
      }, {})
    );

    const filteredQuestions = computed(() => {

      console.log
      const result = [];
      questionsData.value.forEach((question) => {
        // Always add the parent question
        
        const parentQuestion = { ...question, children: [] };
        
        if (!question.dependsOn){
          result.push(parentQuestion);
        }


        // Check if it has dependent questions
        const dependentQuestions = questionsData.value.filter((q) => q.dependsOn?.questionId === question.id);

        dependentQuestions.forEach((depQuestion) => {
          const parentAnswer = answers[depQuestion.dependsOn.questionId];

          if (parentAnswer === depQuestion.dependsOn.value)
          {
            if (depQuestion.display?.value === "child"){
              // Add child questions to the parent's children array
              parentQuestion.children.push(depQuestion);
            }
            else{
              console.log("dep question" , depQuestion)
              result.push(depQuestion);              
            }
          }
        });
      });

      return result;
    });

    const handleSubmit = () => {
      console.log("Form submitted with answers:", answers);
      alert("Form submitted! Check the console for your answers.");
    };

    const handleNavigation = (direction) => {
      console.log(`navigation crrent index ${currentIndex.value}`)
      if (direction === 'back' && currentIndex.value > 0) {
        console.log(`parent back`)
        currentIndex.value--;
      } else if (direction === 'forward' && currentIndex.value < questions.length - 1) {
        console.log(`parent forward`)
        currentIndex.value++;
      }
    };

    return {
      questions: questionsData,
      answers,
      filteredQuestions,
      handleSubmit,
      handleNavigation,
      currentIndex,
    };
  },
};
</script>

<style>
.question {
  margin-bottom: 20px;
}

.question-label {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.answers-container {
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto 1fr; /* Checkbox and label in two columns */
  gap: 1px; /* Adjust spacing between items */
  align-items: center; /* Align items vertically */
}

.answer {
  display: contents; /* Grid items inherit grid behavior */
}

.answer input {
  justify-content: left;
  margin-left: -5px; /* Space between checkbox and label */
}

.dependent-question {
  margin-left: 40px;
}

.text-answer {
  width: 100%;
  height: 80px;
  resize: vertical;
  margin-top: 10px;
}

body.rtl {
  direction: rtl;
  text-align: right;
}
</style>