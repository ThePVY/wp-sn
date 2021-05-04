const ADD_MESSAGE = 'ADD-MESSAGE'

export const actionCreator = {
    addMessage: message => ({ type: ADD_MESSAGE, message })
}

const avaSrc = undefined
//initial value of state
const initialState = {
    dialogsList: [
        { id: 1, name: 'Ksysha',        src: avaSrc,    preview: 'Hi' },
        { id: 2, name: 'Grisha',        src: avaSrc,    preview: 'Hi' },
        { id: 3, name: 'Porosyonok',    src: avaSrc,    preview: 'Hi' },
        { id: 4, name: 'Dimych',        src: avaSrc,    preview: 'Hi' },
        { id: 5, name: 'Sveta',         src: avaSrc,    preview: 'Hi' },
        { id: 6, name: 'Ksysha',        src: avaSrc,    preview: 'Hi' },
        { id: 7, name: 'Kotleta',       src: avaSrc,    preview: 'Hi' },
        { id: 8, name: 'Ksysha',        src: avaSrc,    preview: 'Hi' },
        { id: 9, name: 'Grisha',        src: avaSrc,    preview: 'Hi' },
        { id: 10, name: 'Porosyonok',    src: avaSrc,    preview: 'Hi' },
        { id: 11, name: 'Dimych',        src: avaSrc,    preview: 'Hi' },
        { id: 12, name: 'Sveta',         src: avaSrc,    preview: 'Hi' },
        { id: 13, name: 'Ksysha',        src: avaSrc,    preview: 'Hi' },
        { id: 14, name: 'Kotleta',       src: avaSrc,    preview: 'Hi' },
        { id: 15, name: 'Ksysha',        src: avaSrc,    preview: 'Hi' },
        { id: 16, name: 'Grisha',        src: avaSrc,    preview: 'Hi' },
        { id: 17, name: 'Porosyonok',    src: avaSrc,    preview: 'Hi' },
        { id: 18, name: 'Dimych',        src: avaSrc,    preview: 'Hi' },
        { id: 19, name: 'Sveta',         src: avaSrc,    preview: 'Hi' },
        { id: 20, name: 'Ksysha',        src: avaSrc,    preview: 'Hi' },
    ],
    messages: [
        {id: 1, message: 'a', my: true},
        {id: 2, message: 'b', my: false},
        {id: 3, message: 'a', my: true},
        {id: 4, message: 'b', my: false},
        {id: 5, message: 'a', my: true},
        {id: 6, message: 'b', my: false},
        {id: 7, message: 'a', my: true},
        {id: 8, message: 'b', my: false},
        {id: 9, message: 'a', my: true},
        {id: 10, message: 'b', my: false},
        {id: 11, message: 'a', my: true},
        {id: 12, message: 'b', my: false},
        {id: 13, message: 'a', my: true},
        {id: 14, message: 'b', my: false},
        {id: 15, message: 'a', my: true},
        {id: 16, message: 'b', my: false},
        {id: 17, message: 'a', my: true},
        {id: 18, message: 'b', my: false},
        {id: 19, message: 'a', my: true},
        {id: 20, message: 'b', my: false},
        {id: 21, message: 'a', my: true},
        {id: 22, message: 'b', my: false},
        {id: 23, message: 'a', my: true},
        {id: 24, message: 'b', my: false},
        {id: 25, message: 'a', my: true},
        {id: 26, message: 'b', my: false},
    ]
}

//for changing state in store
export const dialogsReducer = (state = initialState, action) => { 
    switch (action.type) {
        case ADD_MESSAGE:
            return addMessage(state, action.message)
        default:
            return state
    }
}

/*---------------------------------------------------------------------------------*/

let messageId = 1

const addMessage = (state, message) => {
    const newMessage = {
        id: messageId++,
        message,
        my: true
    }

    return {
        ...state,
        messages: [ newMessage, ...state.messages ]
    }
}
