import {
    GET_ANSWERS,
    ANSWER_ERROR,
    ADD_ANSWER,
    DELETE_ANSWER
} from './answers.types';

import axios from 'axios';
import {setAlert} from '../alert/alert.actions';

export const getAnswers = id => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/answers/${id}`);

        dispatch({
            type: GET_ANSWERS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Answer
export const addAnswer = (questionId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/questions/answers${questionId}`, formData, config);

        dispatch({
            type: ADD_ANSWER,
            payload: res.data.data
        });

        dispatch(setAlert(res.data.message, 'success'));

        dispatch(getAnswers(questionId));
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Answer
export const deleteAnswer = AnswerId => async dispatch => {
    try {

        const res = await axios.delete(`/api/questions/answers/${AnswerId}`);

        dispatch({
            type: DELETE_ANSWER,
            payload: AnswerId
        });

        dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};