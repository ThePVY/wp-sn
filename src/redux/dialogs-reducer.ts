import { MessageDT } from '@/types/api-types'
import { ActionT } from '@/types/common-types'

const ADD_MESSAGE = 'ADD-MESSAGE'

type AddMessageT = ActionT<typeof ADD_MESSAGE, MessageT>

type MessageT = { userId: number; message: string }

type DialogsActionT = AddMessageT

export const actionCreator = {
  addMessage: (userId: number, message: string): AddMessageT => ({
    type: ADD_MESSAGE,
    payload: { userId, message },
  }),
}

const avaSrc: string = undefined
//  initial value of state
const initialState = {
  dialogsList: [
    ...[...Array(10)].map((item, idx) => ({
      id: idx,
      name: `Friend ${idx}`,
      src: avaSrc,
      messages: [
        ...[...new Array(idx + 1)].reduce(
          (acc, item, i) => [
            { id: 2 * i, message: `Friend ${idx} -- a`, my: true },
            { id: 2 * i + 1, message: `Friend ${idx} -- b`, my: false },
            ...acc,
          ],
          []
        ),
      ] as MessageDT[],
    })),
  ],
}

export type DialogsStateT = typeof initialState

//  for changing state in store
export const dialogsReducer = (state = initialState, action: DialogsActionT): DialogsStateT => {
  switch (action.type) {
    case ADD_MESSAGE:
      return addMessage(state, action.payload.userId, action.payload.message)
    default:
      return state
  }
}

/*---------------------------------------------------------------------------------*/

const addMessage = (state: DialogsStateT, userId: number, message: string): DialogsStateT => {
  const dialog = state.dialogsList.find(dialog => userId === dialog.id)

  const newMessage = {
    id: dialog.messages.length,
    message,
    my: true,
  }
  return {
    ...state,
    dialogsList: state.dialogsList.map(item => {
      if (item.id === dialog.id) {
        return { ...item, messages: [newMessage, ...item.messages] }
      }
      return item
    }),
  }
}
