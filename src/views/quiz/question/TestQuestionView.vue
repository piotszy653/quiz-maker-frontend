<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>

      <v-form class="form">
        <v-flex sm8 offset-sm2 md10 offset-md1>
        <v-textarea
            :clearable="!this.solve"
            auto-grow
            filled
            label="Question"
            v-model="newQuestion.question"
            :disabled="this.solve"
        ></v-textarea>
        <v-list>
            <v-list-tile v-if="newQuestion.answers.length !== 0">
                <v-flex md4>
                    <v-list-tile-content>
                        <b>Answers</b>
                    </v-list-tile-content>
                </v-flex>
            </v-list-tile>
            <v-list-tile v-for="answer in this.newQuestion.answers" :key="answer.uuid">
                <v-flex md4>
                    <v-list-tile-content>
                        {{answer.answer}}
                    </v-list-tile-content>
                </v-flex>
                <v-spacer/>
                <v-flex md4>
                    <v-list-tile-content>
                        <v-switch
                            :disabled="disabled"
                            color="primary"
                            v-model="answer.correct"
                            :label="answer.correct.toString()"
                        ></v-switch>
                    </v-list-tile-content>
                </v-flex>
                <v-spacer/>
                <v-flex md2 v-if="solve">
                    <v-list-tile-content v-if="userAnswers">
                      <v-text-field
                        :disabled="disabled"
                        :label="userAnswers.includes(answer.uuid) ? 'true' : 'false'"
                        ></v-text-field>
                    </v-list-tile-content>
                </v-flex>
                <v-spacer/>
                <v-flex md2 v-if="solve">
                    <v-list-tile-content v-if="userAnswers">
                      <v-icon
                        v-if="answer.correct && userAnswers.includes(answer.uuid) || !answer.correct && !userAnswers.includes(answer.uuid)"
                       color="green"
                       >done</v-icon>
                       <v-icon
                        v-else
                       color="red"
                       >clear</v-icon>
                    </v-list-tile-content>
                </v-flex>
                <v-flex md4 v-else>
                    <v-list-tile-content>
                        <v-btn
                          small
                          color="red"
                          dark
                          @click="handleRemoveAnswer(answer)"
                        >remove</v-btn>
                    </v-list-tile-content>
                </v-flex>
            </v-list-tile>
            <v-list-tile v-if="!solve">
                <v-flex md4>
                    <v-list-tile-content>
                        <v-text-field
                            filled
                            label="Answer"
                            v-model="newAnswer.answer"
                        ></v-text-field>
                    </v-list-tile-content>
                </v-flex>
                <v-spacer/>
                <v-flex md4>
                    <v-list-tile-content>
                        <v-switch
                            color="primary"
                            v-model="newAnswer.correct"
                            :label="newAnswer.correct.toString()"
                        ></v-switch>
                    </v-list-tile-content>
                </v-flex>
                <v-spacer/>
                <v-flex md4>
                    <v-list-tile-content>
                        <v-btn
                          small
                          color="green"
                          dark
                          @click="handleAddAnswer()"
                        >add</v-btn>
                    </v-list-tile-content>
                </v-flex>
            </v-list-tile>
        </v-list>
        <v-switch
          v-if="!solve"
          color="primary"
          v-model="newQuestion.multipleChoice"
          label="Multiple choice"
        ></v-switch>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-text-field v-if="!solve" label="Tags" hint="separated by ','" v-model="tags"></v-text-field>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3 v-if="!solve">
        <v-btn v-if="this.question" @click="handleUpdateTestQuestion(newQuestion, removedAnswersUuids, tags)" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreateTestQuestion(newQuestion, tags)" block dark color="primary">Create</v-btn>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3 v-if="solve && !disabled">
          <v-btn v-if="!this.lastQuestion" @click="handleSolvedQuestion" block dark color="green">Next Question</v-btn>
          <v-btn v-else @click="handleSolvedQuestion" block dark color="red">Submit</v-btn>
        </v-flex>
      </v-form>

    </v-card>
    </v-flex>
</template>

<script>
import { handleCreateTestQuestion, handleUpdateTestQuestion } from '@/api/Question'
export default {
  name: 'TestQuestion',
  data () {
    return {
      tags: '',
      removedAnswersUuids: [],
      newAnswer: {
        answer: '',
        correct: false
      },
      newQuestion: {
        uuid: '',
        question: '',
        tags: [''],
        answers: [],
        multipleChoice: false
      }
    }
  },
  props: {
    question: null,
    disabled: {
      type: Boolean,
      default: false
    },
    solve: {
      type: Boolean,
      default: false
    },
    lastQuestion: {
      type: Boolean,
      default: false
    },
    userAnswers: null
  },
  components: {
  },
  methods: {
    handleCreateTestQuestion,
    handleUpdateTestQuestion,
    handleRemoveAnswer (answer) {
      this.newQuestion.answers = this.newQuestion.answers.filter(val => val !== answer)
      if (answer.uuid) {
        this.removedAnswersUuids.push(answer.uuid)
      }
    },
    handleAddAnswer () {
      this.newQuestion.answers.push({ answer: this.newAnswer.answer, correct: this.newAnswer.correct })
      this.newAnswer.answer = ''
      this.newAnswer.correct = false
    },
    handleSolvedQuestion () {
      this.$emit('solved', {
        answers: this.newQuestion.answers.filter(answer => answer.correct).map(answer => answer.uuid)
      })
    }
  },
  async created () {
    if (this.question) {
      this.newQuestion = this.question
      if (this.solve && !this.userAnswers) {
        this.newQuestion.answers.forEach((answer) => { answer.correct = false })
      }
      this.tags = this.question.tags.join(',')
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
