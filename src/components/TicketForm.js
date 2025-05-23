import React, {useState, useEffect} from 'react';


export default function TicketForm({dispatch, editingTicket, ticketState}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1');


    //Effect will only start when editingTicket is true aka doesnt == null
    useEffect( () => {
        console.log(`Inside useEffect`);
        console.log(editingTicket);
       
        if(editingTicket){
            console.log('Editing ticket was true');

            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);

        }else{
            console.log('Editing ticket was null');
            clearForm();
           
        }


    },[editingTicket] )


    const priorityLabels = {
        1: "Low",
        2: "Medium",
        3: "High"
    }

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
    }

    const handleSubmit = (e) => {

        console.log(e);

        //The value entered for title  
        console.log(`User entered for title: ` + e.target.elements[0].value);

        //The value entered for Description
        console.log(`User entered for description: ` + e.target.elements[1].value);

        //The value entered for Priority
        console.log(`User entered for priority Low ` + e.target.elements[3].checked);
        console.log(`User entered for priority Medium ` + e.target.elements[4].checked);
        console.log(`User entered for priority High ` + e.target.elements[5].checked);

        

        //Typically when you submit a form, the page reloads, but we dont wanna do that
        //You can use preventDefault to do this, which is a method inside of the event
        e.preventDefault();

        //create a ticket with the info from this form
        const ticketData = {

            id: editingTicket ? editingTicket.id : new Date().toISOString(),
            title,
            description,
            priority

        }


        dispatch({
            type:editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
            payload:ticketData
        })

        console.log(ticketData);


        // if(editingTicket){

        //     console.log("Inside of handleOnSubmit, clearning editingTicket to NULL");
        //     dispatch({
        //         type: "CLEAR_EDITING_TICKET"
        //     })
        // }

        clearForm();
    }


    const handleCancel = () => {

        console.log("Inside handleCancel");
        dispatch({
            type:"CLEAR_EDITING_TICKET"
        });

        clearForm();

    }

    const handleTitle = (e) => {

        console.log(`User entered: ${e.target.value}`);
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        console.log(`User entered:  ${e.target.value}`);
        setDescription(e.target.value);
    }

    const handleLabel = (e) => {
        console.log(`User entered: ${e.target.value}`);
        setPriority(e.target.value);
    }


    return (
        <form className='ticket-form' onSubmit={handleSubmit}>

            <div>
                <label> Title </label>
                <input type='text' value={title} className='form-input' onChange={handleTitle}></input>
            </div>


            <div>
                <label> Description </label>
                <textarea type='text' value={description} className='form-input' onChange={handleDescription}></textarea>
            </div>


            <fieldset className='priority-fieldset'>
                <legend>Priority</legend>

                {
                    Object.entries(priorityLabels).map(([value,label]) => {
                        //b/c we are returning jsx
                        return (
                         <label key={value} className='priority-label'>
                            <input type='radio' 
                             value={value} 
                             checked={priority === value} 
                             className='priority-input'
                             onChange={handleLabel}></input>
                            {label}
                         </label>)
                    } )
                }

            </fieldset>
             
             <button type='submit' className='button'>Submit</button>

             {editingTicket && 
             (
                <button className='button' onClick={handleCancel}>Cancel Edit</button>
             )}




        </form>
    )



};