import { useState } from "react"

export const useObservers = (init = []) => {
    const [observers, setObservers] = useState(init) //observers - массив наблюдателей, которые будут вызваны

    //функция, которая создает объект-наблюдатель
    //у этого объекта два метода 
    //- subscribe - добавить подписчика
    //- unsubscribe - удалить подписчика (для предотвращения утечки памяти)
    const createObserver = (observers, setObservers) => ({
        subscribe: (subscriber = () => {}) => {
            setObservers([...observers, subscriber])
        },
        unsubscribe: (subscriber) => {
            setObservers(observers.filter((observer) => observer !== subscriber))
        }
    })

    //объект-наблюдатель
    const observer = createObserver(observers, setObservers)

    //привести в исходное состояние
    const reset = () => setObservers(init)

    //возвращает массив, в котором 
    //первый элемент - пара массив наблюдателей и объект для его заполнения (опустошения)
    //второй элемент - функция для сброса состояния до исходного
    return [ [ observers, observer ], reset ]
}
