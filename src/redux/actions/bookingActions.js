import { message } from 'antd';
import axios from 'axios';
import { config } from '../../config';

export const bookCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post(`${config.api}/api/bookings/bookcar`, reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('Your Car Booked Successfully')
        setTimeout(() => {
            window.location.href = '/userbookings'
        }, 1000)


    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false })
        message.error('Something went Wrong, Please try Again Later')
    }
};

export const getAllBookings = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get(`${config.api}/api/bookings/getallbookings`)
        dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false })
    }

}