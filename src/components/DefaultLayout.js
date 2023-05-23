import React from 'react'
import { Button, Col, Dropdown, Row } from 'antd';

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const items = [
        {
            key: '1',
            label: (
                <li onClick={() => {
                    window.location.href = '/'
                }}>
                    Home
                </li>
            ),
        },
        {
            key: '2',
            label: (
                <li onClick={() => {
                    window.location.href = '/userbookings'
                }}>
                    Bookings
                </li>
            ),
        },
        {
            key: '3',
            label: (
                <li onClick={() => {
                    window.location.href = '/admin'
                }}>
                    Admin
                </li>
            ),
        },
        {
            key: '4',
            label: (
                <li onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }}>LogOut</li>
            ),
        },
    ];
    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">

                            <h1 onClick={() => {
                                window.location.href = '/'
                            }}>Borrow Box</h1>

                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                            >
                                <Button>{user.username}</Button>
                            </Dropdown>

                        </div>
                    </Col>
                </Row>

            </div>
            <div className="content">
                {props.children}
            </div>
            <div className='footer text-center'>
                <hr />
                <p>Designed and Developed by</p>

                <p>Abisheik</p>
            </div>
        </div>
    )
}

export default DefaultLayout