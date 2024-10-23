import {createSlice} from '@reduxjs/toolkit'
import {SignupSteps} from "@/core/constants/signup.js";

const signUpSteps = createSlice({
    name: 'signUpSteps',
    initialState: {
        currentStep: 0,
        values: {
            step0: {
                email: '',
            },
            step1: {
                country: '',
            },
            step2: {
                firstName: '',
                lastName: '',
                identityNumber: '',
            },
            step3:{
                storeName: '',
                website: '',
                storeAddress: '',
                storeEmail: '',
            },
            step4:{
                phoneNumber: '',
            },
            step5:{

            }
        }
    },
    reducers: {
        setValues: (state, action) => {
            const { step, values } = action.payload;
            state.values[step] = {
                ...state.values[step],
                ...values,
            };
        },
        nextStep: state => {
            if (state.currentStep < SignupSteps.max) {
                state.currentStep += 1
            }
        },
        prevStep: state => {
            if (state.currentStep >= 0) {
                state.currentStep -= 1
            }
        }
    },
})

export const {nextStep, prevStep, setValues} = signUpSteps.actions

export default signUpSteps.reducer;
