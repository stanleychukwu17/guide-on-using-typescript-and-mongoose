import {DocumentDefinition, FilterQuery, QueryOptions} from 'mongoose'
import User, { UserInput, UserDocument } from '../model/user.model'

// the function creates a new user
export async function createUser(input:DocumentDefinition<UserInput>) {
    return await User.create<UserInput>(input)
}

// the function finds a user using the query parameters received
export async function findUser(
    query: FilterQuery<UserDocument>,
    options: QueryOptions = {lean: true}
) {
    const result = await User.findOne(query, null, options)
    return result
}

// for logging in a user into their account
interface logInProps {
    email: UserInput['email'],
    password: UserInput['password']
}
export async function logInUser({email, password}: logInProps): Promise<boolean> {
    const user = await findUser({email}, {lean:false})

    if (!user) {
        throw new Error("User does not exist")
    }

    return user.comparePassword(password)
}