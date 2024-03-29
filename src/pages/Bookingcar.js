import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { Col, Divider, Row, DatePicker, Checkbox, Modal } from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'
import StripeCheckout from 'react-stripe-checkout'


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
    const [timeSlots, setTimeSlots] = useState({ from: null, to: null });
    const [showModal, setShowModal] = useState(false)


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
            setTotalAmount(totalAmount + (30 * (totalHours + 1)))
        }
    }, [driver, totalHours])



    function selectTimeSlots(values) {
        // console.log(values);
        // console.log(values[0].$d);
        // console.log(values[1].$d)
        setFrom(moment(values[0]).format('MMM DD YYYY HH:mm'))
        setTo(moment(values[1]).format('MMM DD YYYY HH:mm'))

        const dateString = values[0].$d;
        const date = new Date(dateString);
        const from = date.toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
        const dateString1 = values[1].$d;
        const date1 = new Date(dateString1);
        const to = date1.toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        setTotalHours(values[1].diff(values[0], 'hours'))
        setTimeSlots({ from, to })
    }

    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequire: driver,
            bookedTimeSlots: timeSlots
        }
        dispatch(bookCar(reqObj))
    }



    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                <Col lg={12} sm={24} xs={24} className='p-3'>
                    <img src={car.image} className='carimg2 bs1 w-100 ' alt={car.name} />
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
                    <br />
                    <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>See Booked Slots</button>
                    {from && to && (
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
                            <StripeCheckout
                                shippingAddress
                                token={onToken}
                                currency='INR'
                                amount={totalAmount * 100}
                                stripeKey='pk_test_51MW7vKSIF3BGrCVLfOm7mVLdxxptmYhQV9rhBmZDr53T9axfbNjOHmUKAyfSRhb0Vc3AqsgcCHRAPolc9WAEtldT000p5GoGxu'
                            >
                                <button className='btn1' >
                                    Book Now
                                </button>

                            </StripeCheckout>

                        </div>
                    )}

                </Col>
                {car.name && (<Modal open={showModal} closable={false} footer={false} title='Booked Time Slots'>

                    <div className='p-2'>

                        {car.bookedTimeSlots.map((slot) => {
                            return (
                                <button className='btn1 mt-2'>
                                    {slot.from} - {slot.to}
                                </button>
                            )
                        })}

                        <div className='text-right mt-5'>

                            <button className='btn1' onClick={() => {
                                setShowModal(false)
                            }}>Close</button>
                        </div>

                    </div>

                </Modal>)}
            </Row>


        </DefaultLayout>
    )
}

export default Bookingcar