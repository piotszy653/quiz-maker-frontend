<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <TitleContainer v-if="this.assessmentUuid" title="Update Assessment" url="/assessments"/>
      <TitleContainer v-else title="Create Assessment" url="/assessments"/>

      <v-form v-if="this.assessment" class="form">
        <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-text-field autofocus label="Name" v-model="assessment.name"></v-text-field>
        </v-flex>
        <v-flex xs8 offset-xs2 sm4 offset-sm4 md2 offset-md5>
        <v-text-field label="Correct rate" v-model="assessment.correctRate"></v-text-field>
        <v-text-field label="Incorrect rate" v-model="assessment.incorrectRate"></v-text-field>
        <v-text-field label="Min points" placeholder="optional" v-model="assessment.minPoints"></v-text-field>
        <v-text-field label="Max pionts" placeholder="optional" v-model="assessment.maxPoints"></v-text-field>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-btn v-if="this.assessmentUuid" @click="handleUpdate(assessment, assessmentUuid)" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreate(assessment)" block dark color="primary">Create</v-btn>
        </v-flex>
      </v-form>

    </v-card>
    </v-flex>
</template>

<script>
import TitleContainer from '@/components/TitleContainer'
import { fetchAssessment, handleUpdate, handleCreate } from '@/api/Assessments'
export default {
  name: 'Assessment',
  data () {
    return {
      assessment: {
        name: '',
        correctRate: '',
        incorrectRate: '',
        minPoints: '',
        maxPoints: ''
      }
    }
  },
  props: {
    assessmentUuid: String
  },
  components: {
    TitleContainer
  },
  methods: {
    fetchAssessment,
    handleUpdate,
    handleCreate
  },
  async created () {
    try {
      if (this.assessmentUuid) {
        const response = await fetchAssessment(this.assessmentUuid)
        this.assessment.name = response.name
        this.assessment.correctRate = response.correctRate
        this.assessment.incorrectRate = response.incorrectRate
        this.assessment.minPoints = response.minPoints
        this.assessment.maxPoints = response.maxPoints
      }
    } catch (error) {
      this.$emit('tokenExpired')
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
