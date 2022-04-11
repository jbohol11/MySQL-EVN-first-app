import axios from 'axios';

const url = 'http://localhost:5000/api/surveys/';

class SurveyService {
    //Get Surveys
    static getSurveys() {
        return (async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(survey => ({
                        ...survey,
                    }))
                );
            } catch(err) {
                reject(err);
            }
        })
    }
    //Send Surveys
    static insertSurvey(Q1_result, Q2_result, Q3_result, Date) {
        return axios.post(url, {
            Q1_result, Q2_result, Q3_result, Date
        });
    }
}

export default SurveyService