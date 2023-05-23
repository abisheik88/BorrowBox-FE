import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCar, getAllCars } from '../redux/actions/carsActions'
import { Row, Col, Checkbox, Edit, Popconfirm } from 'antd'
import Spinner from '../components/Spinner'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
function AdminHome() {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])

    return (
        <DefaultLayout>

            <Row justify='center' gutter={16} className='mt-2'>
                <Col lg={20} sm={24} >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mt-1 mr-2'>Admin Panel</h3>
                        <button className='btn1 text-right'><a href='/addcar'>Add Car</a></button>
                    </div>

                </Col>

            </Row>
            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16} >

                {cars.map(car => {
                    return <Col lg={7} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img src={car.image} className='carimg' alt={car.name} />

                            <div className='car-content d-flex align-items-center justify-content-between'>

                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p>Rent Per Hour: {car.rentPerHour}  /-</p>
                                </div>

                                <div className='mr-4'>
                                    <Link to={`/editcar/${car._id}`}><EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} /></Link>
                                    <Popconfirm
                                        title="Are you sure to delete this car?"
                                        onConfirm={() => { dispatch(deleteCar({ carid: car._id })) }}

                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined
                                            style={{ color: "red", cursor: "pointer" }}
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    </Col>
                })}

            </Row>

        </DefaultLayout>
    )
}

export default AdminHome