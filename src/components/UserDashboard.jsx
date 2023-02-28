import React, { useState } from 'react'
import { Field, Form, Formik } from "formik";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Container, FilledInput, Stack, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axiosInstance from '../config/api';
import { useDispatch } from 'react-redux';
import { loadUser } from '../actions/userActions';
import { LoadingButton } from "@mui/lab"
import SaveIcon from "@mui/icons-material/Save"
const UserDashboard = () => {

    // const elements = useElements();
    // const stripe = useStripe();
    const dispatch = useDispatch();

    const [responseMessage, setResponseMessage] = useState("");
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [submittedFormData, setSubmittedFormData] = useState("");

    async function handleFormSubmit(e) {

        const { screenCount, duration, device, plan } = e

        const planName = valueSplitHelper(plan)[0];
        const deviceName = valueSplitHelper(device)[0];
        const planPrice = valueSplitHelper(plan)[1];
        const devicePrice = valueSplitHelper(device)[1];

        const totalPrice = (Number(screenCount) * Number(duration) * Number(planPrice)) + Number(devicePrice);


        if (!elements || !stripe) return;
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        });

        // console.log({ error, paymentMethod });

        const submitFormData = {
            screenCount, duration, devicePrice, planPrice, planName, deviceName, totalPrice, stripeToken: paymentMethod.id
        }

        // console.log({ submitFormData });


        try {
            const { data } = await axiosInstance.post(`/subscription/payment/${document.cookie.split("=")[1]}`, submitFormData);

            if (data && data.success) {
                setResponseMessage(data.message);
                setResponseSuccess(true)
                setSubmittedFormData(JSON.stringify(submitFormData, null, 4))
                // dispatch(loadUser())
                setTimeout(() => {
                    window.location.reload()
                }, 10000)
            }

        } catch (error) {
            setResponseMessage(error.response.data.message);
        }

    }

    const initialValues = {
        screenCount: "1",
        plan: "Gold|20",
        duration: "1",
        device: "No Device|0",
        planName: "",
        deviceName: ""
    }

    return (
        <>


            {/* <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ minWidth: 375, maxWidth: 600 }}>
                    <Typography variant='h6' textAlign="center" p={4}>{!responseMessage ? "Upgrade Your Plan" : <span style={{ color: "green", fontWeight: 700 }}>{responseSuccess && responseMessage}</span>}</Typography>


                    {!responseSuccess && responseMessage && (
                        <Typography variant='h6' textAlign="center" p={4} style={{ color: "red", fontWeight: 700 }}>{!responseSuccess && responseMessage}</Typography>
                    )}

                    {submittedFormData && <>
                        <pre>Submitted Data</pre>
                        <pre>{submittedFormData}</pre>
                    </>}


                    {
                        !responseSuccess ? (
                            <>
                                <Formik
                                    onSubmit={handleFormSubmit}
                                    initialValues={initialValues}
                                >
                                    {
                                        props => {

                                            // console.log({ props })

                                            return (
                                                <>
                                                    <Form>

                                                        <Stack direction="column" sx={{ gap: "25px" }}>
                                                            <Field name="screenCount">
                                                                {
                                                                    (props) => {

                                                                        return (
                                                                            <>
                                                                                <FormControl variant="outlined" fullWidth>
                                                                                    <InputLabel htmlFor='screenCount'>Screen Count</InputLabel>
                                                                                    <FilledInput
                                                                                        required
                                                                                        type={"number"}
                                                                                        {...props.field}
                                                                                    ></FilledInput>
                                                                                </FormControl>
                                                                            </>
                                                                        )
                                                                    }
                                                                }
                                                            </Field>

                                                            <Field name="plan">
                                                                {props => {
                                                                    // console.log({ propsPlan: props })
                                                                    return (
                                                                        <>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="plan">Choose Plan (Price Per Screen Per Month)</InputLabel>
                                                                                <Select
                                                                                    labelId="plan"
                                                                                    id="plan"
                                                                                    label="Age"
                                                                                    variant='filled'
                                                                                    {...props.field}
                                                                                    onChange={e => {
                                                                                        props.field.onChange(e)
                                                                                        props.form.setFieldValue("planName", setFieldValueHelper(props.field.name, e.target.value))
                                                                                    }}

                                                                                >
                                                                                    <MenuItem value={"Silver|10"}>Silver - $10.00</MenuItem>
                                                                                    <MenuItem value={"Gold|20"}>Gold - $20.00</MenuItem>
                                                                                    <MenuItem value={"Platinum|30"}>Platinum $30.00</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </>
                                                                    )
                                                                }}
                                                            </Field>
                                                            <Field name="duration">
                                                                {props => {
                                                                    return (
                                                                        <>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="duration">plan Duration</InputLabel>
                                                                                <Select
                                                                                    labelId="duration"
                                                                                    id="duration"
                                                                                    label="plan Duration"
                                                                                    variant='filled'
                                                                                    {...props.field}

                                                                                >
                                                                                    <MenuItem value={1}>1 Month</MenuItem>
                                                                                    <MenuItem value={3}>3 Months</MenuItem>
                                                                                    <MenuItem value={6}>6 Months</MenuItem>
                                                                                    <MenuItem value={12}>12 Months</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </>
                                                                    )
                                                                }}
                                                            </Field>
                                                            <Field name="device">
                                                                {props => {
                                                                    return (
                                                                        <>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="device">Purchase Device (if any)</InputLabel>
                                                                                <Select
                                                                                    labelId="device"
                                                                                    id="device"
                                                                                    label="Device"
                                                                                    variant='filled'
                                                                                    {...props.field}

                                                                                >
                                                                                    <MenuItem value={"No Device|0"}>No Device</MenuItem>
                                                                                    <MenuItem value={"Google Chromecast|50"}>Google Chromecast - $50.00</MenuItem>
                                                                                    <MenuItem value={"Amazon FireStick|55"}>Amazon Stick - $55.00</MenuItem>
                                                                                    <MenuItem value={"Android Box|30"}>Android Box - $30.00</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </>
                                                                    )
                                                                }}
                                                            </Field>
                                                            <Field>
                                                                {
                                                                    props => {
                                                                        return (
                                                                            <Box style={{ border: "1px solid #1976d2", padding: "15px 10px", borderRadius: "4px" }}>
                                                                                <CardElement
                                                                                    options={{
                                                                                        style: {
                                                                                            base: {
                                                                                                fontSize: "16px",
                                                                                                color: "#424770",
                                                                                                "::placeholder": {
                                                                                                    color: "#aab7c4",
                                                                                                },
                                                                                            },
                                                                                            invalid: {
                                                                                                color: "#9e2146",
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        )
                                                                    }
                                                                }
                                                            </Field>
                                                            {!props.isSubmitting ? (
                                                                <Button type='submit' variant='contained' sx={{ padding: "15px" }}>SUBMIT</Button>
                                                            ) : (
                                                                <LoadingButton
                                                                    variant='contained' sx={{ padding: "15px" }}
                                                                    loading
                                                                    loadingPosition="start"
                                                                    startIcon={<SaveIcon />}
                                                                >
                                                                    Submitting Your Request
                                                                </LoadingButton>
                                                            )}

                                                        </Stack>
                                                    </Form>
                                                    <TotalPrice values={props.values} />
                                                </>
                                            )
                                        }
                                    }
                                </Formik>
                            </>
                        ) : null
                    }
                </Box>
            </Container> */}
        </>
    )
}

function TotalPrice({ values }) {

    const { screenCount, duration, device, plan } = values

    // console.log({ screenCount, duration, device, plan })

    const totalPrice = (Number(screenCount) * Number(duration) * Number(valueSplitHelper(plan)[1])) + Number(valueSplitHelper(device)[1])

    return (
        <>
            <Box sx={{ padding: "30px 0" }}>
                <Typography variant='h4' sx={{ color: "#1976d2", fontWeight: "700" }}>TOTAL - ${totalPrice.toFixed(2)}</Typography>
            </Box>
        </>
    )
}


function setFieldValueHelper(name, value) {
    // console.log({ name, value })
}

function valueSplitHelper(str) {
    return [str.split("|")[0], str.split("|")[1]]
}

export default UserDashboard