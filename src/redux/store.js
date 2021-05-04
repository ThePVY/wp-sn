import { profileReducer } from './profile-reducer';
import { dialogsReducer } from './dialogs-reducer';


const state = {
    profile: {
        posts: [

        ],
        newPost: ''
    },
    dialogs: {
        dialogsList: [
            { name: 'Ksysha', id: 1, preview: 'Hi' },
            { name: 'Grisha', id: 2, preview: 'Hi' },
            { name: 'Porosyonok', id: 3, preview: 'Hi' },
            { name: 'Dimych', id: 4, preview: 'Hi' },
            { name: 'Sveta', id: 5, preview: 'Hi' },
            { name: 'Ksysha', id: 6, preview: 'Hi' },
            { name: 'Kotleta', id: 7, preview: 'Hi' },
        ],
        messages: [],
        newMessage: ''
    }
}


function Store(state) {
    //private properties
    let _observer = null
    const _state = state

    //private methods/functions
    const render = () => _observer()

    //get and set objects
    this.get = {
        get state() {
            return _state
        }
    }
    this.set = {
        set state(val) {
            alert('You can not override state!')
        }
    }

    //public methods
    this.subscribe = function (observer) {
        _observer = observer
    }

    this.dispatch = function (action) {
        profileReducer(_state.profile, action)
        dialogsReducer(_state.dialogs, action)
        render()
    }
}



const store = new Store(state)

export default store;