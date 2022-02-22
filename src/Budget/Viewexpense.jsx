import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
export default function Viewexpense({ load, data, index }) {
    const [show, setShow] = useState(load);
    let [expense, setExpense] = useState([]);
    const handleClose = () => setShow(false);
    useEffect(() => {
        let check = data.filter((curval) => {
            return curval.budget === index
        })
        setExpense(check);
    }, [show])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><span className='fw-bold'>{index} Expenses</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        expense.map((curval) => {
                            return (
                                <>
                                    <p>{curval.bdget}</p>
                                </>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
