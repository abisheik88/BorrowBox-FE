import { message } from 'antd';
import axios from 'axios';
export const bookCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/bookings/bookcar', reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('Your Car Booked Successfully')
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false })
        message.error('Something went Wrong, Please try Again Later')
    }

}