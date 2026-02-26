export interface Category{
    id:string
    catName:string,
    tutors:number
}

export interface CreateCatgory{
    catName:string,
    description:string
}

export interface CreateTurorCategory{
    id:string,
    catName:string,
    description:string
}