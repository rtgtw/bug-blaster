import './App.css';
import './styles.css';
import TicketForm from './components/TicketForm.js';
import ticketReducer from './reducers/ticketReducer.js';
import { useReducer } from 'react';
import TicketList from './components/TicketList.js';



function App() {

  const initialState = {tickets: [], editingTicket: null};


  const [state, dispatch ] = useReducer(ticketReducer, initialState);


  return (
    <div className="App">
     
      <div className='container'>
        
        <h1>Bug Blaster</h1>
        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} ticketState={state}/>


        {state.tickets.length > 0 && 
        (<div className='results'> 
          <h2>All Tickets</h2>
          <TicketList tickets={state.tickets} dispatch={dispatch}/>
        </div>
      )}
         


      </div>

    </div>
  );


}

export default App;
