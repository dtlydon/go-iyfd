/**
 * Created by daniellydon on 2/13/17.
 */
export class User{
    Id: string;
    Username: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
    Role: Role
}

export enum Role{
    None = -1,
    Basic = 0,
    Bob,
    Admin
}