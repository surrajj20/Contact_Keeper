import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Dipesh yadav',
                email: 'dipeshyadav@gmail.com',
                phone: '3333333388',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Shlok garg',
                email: 'shlokgarg@gmail.com',
                phone: '1234567891',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Gaurav Jain',
                email: 'gauravjain@gmail.com',
                phone: '2233445566',
                type: 'professional'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // Delete Contact

    // set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;