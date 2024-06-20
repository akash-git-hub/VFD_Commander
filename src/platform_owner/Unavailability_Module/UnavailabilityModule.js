import React from 'react'
import { UnavailabilityTableList } from './UnavailabilityTableList'
import { Container, Row, Col } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'

export const UnavailabilityModule = () => {
    return (
        <>
            <div className='UnavailabilityModule'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Unavailability Module"} />
                            <div className='my-md-5'>
                                <UnavailabilityTableList />
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
