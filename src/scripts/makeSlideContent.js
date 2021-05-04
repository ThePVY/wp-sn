const makeSlideContent = (content, container) => {

    window.addEventListener('scroll', scrollListener)

    let isStick = false
    let inRange = false
    let [prevOffset, currOffset] = ['', '']
    let [prevScroll, currScroll] = ['', '']

    let top2container
    let topBoundary
    let bottomBoundary


    const resetPositioning = (isOverContainer) => {
        isStick = false
        content.style.position = 'relative'
        isOverContainer ?
            content.style.top = `0px`
            :
            content.style.top = `${currOffset - content.offsetHeight + window.innerHeight - top2container}px`
    }

    const setPositioning = (position, top, stick) => {
        content.style.position = position
        content.style.top = top
        isStick = stick
    }

    const checkRange = (topBoundary, botBoundary) => {
        let inRange = ((botBoundary > window.pageYOffset + window.innerHeight) && topBoundary < window.pageYOffset) ? true : false
        return inRange
    }

    const contentTooSmall = () => content.offsetHeight < window.innerHeight

    const reachedContentBottom = () => !isStick && currOffset + window.innerHeight >= content.offsetTop + content.offsetHeight

    const reachedContentTop = () => !isStick && currOffset <= content.offsetTop

    const changedDirectionMidway = () => !isStick && currScroll !== prevScroll

    const changedDirection = () => isStick && currScroll !== prevScroll

    /*-----------------------------------------------------------------------------------------------*/

    function scrollListener() {
        //need to calculate every scroll to catch window resizing
        top2container = container.getBoundingClientRect().top + window.pageYOffset //Frop page top to top of the sticky container
        topBoundary = top2container
        bottomBoundary = topBoundary + container.offsetHeight

        inRange = checkRange(topBoundary, bottomBoundary)
        if (inRange && content.offsetHeight > window.innerHeight) {
            currOffset = window.pageYOffset
            if (currOffset > prevOffset) {
                //scrolling down
                currScroll = 'down'
                if (reachedContentBottom()) {
                    const contentOffset = `-${content.offsetHeight - window.innerHeight}px`
                    setPositioning('sticky', contentOffset, true)
                }
                else if (changedDirectionMidway()) {
                    const contentOffset = `${content.offsetTop - top2container}px`
                    setPositioning('relative', contentOffset, false)
                }
                else if (changedDirection()) {
                    const contentOffset = `${currOffset - top2container}px`
                    setPositioning('relative', contentOffset, false)
                }
                prevScroll = 'down'
            }
            else {
                //scrolling up
                currScroll = 'up'
                if (reachedContentTop()) {
                    setPositioning('sticky', `0px`, true)
                }
                else if (changedDirectionMidway()) {
                    setPositioning('relative', `${content.offsetTop - top2container}px`, false)
                }
                else if (changedDirection()) {
                    const contentOffset = `${currOffset - content.offsetHeight + window.innerHeight - top2container}px`
                    setPositioning('relative', contentOffset, false)
                }
                prevScroll = 'up'
            }
            prevOffset = currOffset
        }
        else if (contentTooSmall()) {
            setPositioning('sticky', `0px`, true)
        }
        else {
            resetPositioning(window.pageYOffset < top2container)
        }
    }

    return scrollListener
}

export default makeSlideContent

export const removeScrollListener = (listener) => {
    window.removeEventListener('scroll', listener)
}


/*-----------------------------------------------------------------------------------------------*/