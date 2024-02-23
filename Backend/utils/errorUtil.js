class customAppError extends Error{
    constructor(statuscode,message){
        super(message)
        this.statuscode = statuscode
        Error.captureStackTrace(this,this.constructor)
    }
}

export default customAppError