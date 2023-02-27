export function generateSuccessListResponse(data:unknown[]) {
    return {
        status:true,
        data,
    }
}

export function generateFailedResponse(message:string) {
    return {
        status:false,
        message
    }
}