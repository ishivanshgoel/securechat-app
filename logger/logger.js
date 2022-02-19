/**
 * type 0 - info
 * type 1 - warn 
 * type 2 - error
 */

function log(message, type, app = 0){
    let pref;

    switch(type){
        case 0:
            pref = 'info'
            break
        case 1:
            pref = 'warm'
            break
        case 2:
            pref = 'error'
            break
        default:
            pref = 'silly'
            break
    }

    console.log(`${pref}: ${message}`)
}

module.exports = {
    log
}