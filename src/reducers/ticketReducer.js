
/*
State = the current state

Action = What is it that we are trying to perform on this particular state?
*/


export default function ticketReducer(state, action){


    switch(action.type){
        case "ADD_TICKET":
            return {...state, tickets:[...state.tickets, action.payload] };

        case "UPDATE_TICKET":
            return {
                ...state, 
                tickets: state.tickets.map( (ticket) => {
                    
                    return ticket.id === action.payload.id ? action.payload : ticket;

                }),
                editingTicket: null
            }

        case "DELETE_TICKET":

            console.log("State editing ticket: ");
            console.log(state.editingTicket);

            console.log("editing ticket id");
            console.log(state.editingTicket?.id);

            console.log('action payload id');
            console.log(action.payload.id);

            if(state.editingTicket && state.editingTicket.id === action.payload.id){
                console.log("EDITING TICKET ID === ACTION PAYLOAD ID");
                return {
                    ...state,
                    tickets: state.tickets.filter( (ticket) => {
                        return ticket.id !== action.payload.id;
                    }),
                    editingTicket:null
                }
            }else{
                console.log("EDITING TICKET ID DOESNT === ACTION PAYLOAD ID");

                return {
                    ...state,
                    tickets: state.tickets.filter( (ticket) => {
                        return ticket.id !== action.payload.id;
                    })
                }
            }

           
        
        case "SET_EDITING_TICKET":
            console.log("ENTERED SET EDITING TICKET");
            return {
                ...state,
                editingTicket: action.payload
            }


        case "CLEAR_EDITING_TICKET":
              console.log("ENTERED CLEAR EDITING TICKET");
              return {
                ...state,
                editingTicket: null
             }

        default:
            return state;
    }
}