import React, {useState} from 'react';



export default function TicketItem({ticket, dispatch }){

    const {id, title, description, priority} = ticket;

    const priorityClass = {
        1:"priority-low",
        2:"priority-medium",
        3:"priority-high"
    }



    const handleDelete = () => {
        dispatch({
            type: "DELETE_TICKET",
            //the payload is going to be an object not just ID itself, because you want to do
            //action.payload.id, and not just action.paylod
            payload: {id}
        });

    }


    const handleEdit = () => {
        
        dispatch({
            type: "SET_EDITING_TICKET",
            payload: ticket
        })
    }


    return (
        <div className='ticket-item'>
            <div className={`priority-dot ${priorityClass[priority]}`}></div>
            <h3>{title}</h3>
            <p>{description}</p>

            <button className='button' onClick={handleDelete}>Delete</button>

            <button className='button' onClick={handleEdit}>Edit Ticket</button>


        </div>
    )

}