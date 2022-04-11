<template>
  <div class="container">
    <h2>SURVEY PROTOTYPE</h2>

    <div className="card">
      <form @submit="sendSurvey" method="post">
        <div className="card-header">
          <span className="label-default">Question 1. {{ Question1 }}</span>
        </div>

        <div class="btn-group btn-group-toggle">
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ1"
                id="option1-Q1"
                value="(A) Not Effective"
                v-model="Q1"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option1-Q1"
                >Not Effective</label
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ1"
                id="option2-Q1"
                value="(B) Neither Ineffective or Effective"
                v-model="Q1"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option2-Q1"
                >Neither Ineffective or Effective</label
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ1"
                id="option3-Q1"
                value="(C) Effective"
                v-model="Q1"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option3-Q1"
                >Effective</label
              >
            </div>
          </div>
        </div>

        <!--END OF Q1 -->

        <div className="card-header">
          <span className="label-default">Question 2. {{ Question2 }}</span>
        </div>

        <div class="btn-group btn-group-toggle">
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ2"
                id="option1-Q2"
                value="(A) Not Effective"
                v-model="Q2"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option1-Q2"
                >Not Effective</label
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ2"
                id="option2-Q2"
                value="(B) Neither Ineffective or Effective"
                v-model="Q2"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option2-Q2"
                >Neither Ineffective or Effective</label
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ2"
                id="option3-Q2"
                value="(C) Effective"
                v-model="Q2"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option3-Q2"
                >Effective</label
              >
            </div>
          </div>
        </div>

        <!--END OF Q2 -->

        <div className="card-header">
          <span className="label-default">Question 3. {{ Question3 }}</span>
        </div>

        <div class="btn-group btn-group-toggle">
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ3"
                id="option1-Q3"
                value="(A) Not Effective"
                v-model="Q3"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option1-Q3"
                >Not Effective</label
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ3"
                id="option2-Q3"
                value="(B) Neither Ineffective or Effective"
                v-model="Q3"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option2-Q3"
                >Neither Ineffective or Effective</label
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input
                type="radio"
                class="btn-check"
                name="optionsQ3"
                id="option3-Q3"
                value="(C) Effective"
                v-model="Q3"
                autocomplete="off"
              />
              <label class="btn btn-secondary" for="option3-Q3"
                >Effective</label
              >
            </div>
          </div>
        </div>

        <!--END OF Q3 -->

        <div className="card-header">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>

  <!--Survey Result from DB -->

  <div class="surveys-container">
    <div
      class="survey"
      v-for="(survey, index) in surveys"
      v-bind:item="survey"
      v-bind:index="index"
      v-bind:key="survey._id"
    >
      {{
        `${survey.createdAt.getDate()}/${survey.createdAt.getMonth()}/${survey.createdAt.getFullYear()}`
      }}
      <p>{{ survey.text }}</p>
    </div>
  </div>
</template>

<script>
import SurveyService from "../SurveyService";
export default {
  name: "SurveyView",
  data() {
    return {
      Q1: null,
      Q2: null,
      Q3: null,
      Question1: "Deliver through others",
      Question2: "Understand Others Perstective",
      Question3: "Solve Complex Problems",
      error: "",
    };
  },
  
  methods: {
    async sendSurvey(e) {
      let newResults = {
        q1_result: this.Q1,
        q2_result: this.Q2,
        q3_result: this.Q3,
      };
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes();
      var dateTime = date + '   ' + time;
      console.log(newResults);
      e.preventDefault()
      await SurveyService.insertSurvey(this.Q1, this.Q2, this.Q3, dateTime);
      this.surveys = await SurveyService.getSurveys();
      alert("Survey Data Sent to Database!");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  background: #20b8be;
  border-radius: 4px;
}

.col-sm {
  padding: 2rem;
}
</style>
