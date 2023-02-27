export interface SuccessResponseType<T> {
    data:T,
    status:true;
}

export interface FailedResponseType {
    status:false;
    message:string;
}