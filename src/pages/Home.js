import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import { Row, Col } from 'antd'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
function Home() {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])

    return (
        <DefaultLayout>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16} className='mt-5'>

                {cars.map(car => {
                    return <Col lg={7} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img src={car.image} className='carimg' alt={car.name} />

                            <div className='car-content d-flex align-items-center justify-content-between'>

                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                                </div>

                                <div>
                                    <button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                })}

            </Row>

        </DefaultLayout>
    )
}

export default Home