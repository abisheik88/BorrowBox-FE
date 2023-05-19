import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { Col, Divider, Row, DatePicker, Checkbox } from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'

// import Datetime from 'react-datetime';
// import 'react-datetime/css/react-datetime.css';

const { RangePicker } = DatePicker;
function Bookingcar({ match }) {

    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setcar] = useState({})
    const dispatch = useDispatch()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours] = useState()
    const [driver, setdriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)


    useEffect(() => {

        if (cars.length === 0) {
            dispatch(getAllCars())
        }
        else {

            setcar(cars.find(o => o._id === match.params.carid))
        }
    }, [cars])

    useEffect(() => {
        setTotalAmount(((totalHours + 1) * car.rentPerHour))
        if (driver) {
            setTotalAmount(totalAmount + (30 * totalHours))
        }
    }, [driver, totalHours])

    // function selectTimeSlots(values) {
    //     const startDate = values[0].startOf('minute');
    //     const endDate = values[1].endOf('minute');
    //     console.log(startDate)
    //     const startFormatted = moment(startDate).format('MMM DD YYYY HH:mm');
    //     const endFormatted = moment(endDate).format('MMM DD YYYY HH:mm');
    //     console.log('Start Date:', startFormatted);
    //     console.log('End Date:', endFormatted);
    //     // console.log(values)
    //     console.log(values[0].$d)
    //     // const dateString = "Sat May 20 2023 10:29:22 GMT+0530 (India Standard Time)";
    //     const dateObj = new Date(values[0].$d);
    //     const formattedDate = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    //     console.log(dateObj.toDateString())

    //     console.log(formattedDate)
    // }

    function selectTimeSlots(values) {
        // console.log(values);
        // console.log(values[0].$d);
        // console.log(values[1].$d)
        setFrom(moment(values[0]).format('MMM DD YYYY HH:mm'))
        setTo(moment(values[1]).format('MMM DD YYYY HH:mm'))

        setTotalHours(values[1].diff(values[0], 'hours'))
    }

    function bookNow() {

        const reqObj = {

            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequire: driver,
            bookedTimeSlots: {
                from,
                to
            }
        }
        console.log(reqObj)
        dispatch(bookCar(reqObj))
    }




    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                <Col lg={12} sm={24} xs={24}>
                    <img src={car.image} className='carimg2 bs1' alt={car.name} />
                </Col>
                <Col lg={10} sm={24} xs={24} className='text-right'>
                    <Divider type='horizontal' dashed style={{ borderColor: 'black' }}>Car Info</Divider>
                    <div style={{ textAlign: 'right' }}>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour} Rent Per Hour /-</p>
                        <p>Fuel Type:{car.fuelType}</p>
                        <p>Max Person Capacity:{car.capacity}</p>
                    </div>
                    <Divider type='horizontal' dashed style={{ borderColor: 'black' }}>Select Time Slots</Divider>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format='MMM DD YYYY HH:mm'
                        onChange={selectTimeSlots} />
                    <div>
                        <p>Total Hours :{totalHours + 1}</p>
                        <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
                        <Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setdriver(true)
                            } else {
                                setdriver(false)
                            }
                        }}>Driver Required</Checkbox>
                        <h3>Total Amount:{totalAmount}</h3>

                        <button className="btn1" onClick={(bookNow)}>Book Now</button>
                    </div>

                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default Bookingcar