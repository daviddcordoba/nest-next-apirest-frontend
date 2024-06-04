import "next-auth"

declare module "next-auth" {
    interface Session{
        user:{
            email:string
            token:string
        }
    }
}


/* 
agrega info a lo que viene por defecto en la info de nextauth.

*/