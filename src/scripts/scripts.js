export const validate = (text = '') => {
    return ~text.search(/\S/)
}

export const validateURL = url => {
    return ~url.search(/https?:/) ? url : 'https://' + url
}


export const changeProp = (obj, prop, newVal) => ({ ...obj, [prop] : newVal })

