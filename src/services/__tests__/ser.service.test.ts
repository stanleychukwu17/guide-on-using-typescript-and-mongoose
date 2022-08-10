import {
    createUser,
    findUser,
    logInUser,
    deleteAllUsers
} from '../user.service'

// the logic for testing of the user service begins!
describe("user service", () => {
    // after all the test in this 'user service' block runs, the code below (i.e deleteAllUsers) will run
    // just realizing now that the teacher said the below function will only run before all test will kick-off
    afterAll(async () => {
        await deleteAllUsers()
    })

    // after each test  this 'user service' block runs, the code below (i.e deleteAllUsers) will run
    afterEach(async () => {
        await deleteAllUsers()
    })

    // the user payload that will be used to test the remaining blocks of test
    const userPayload = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password12340',
        email: 'email@example.com'
    }

    // test for creating a new user
    describe("create user", () => {
        describe("Given the input is valid", () => {
            it("should create a new user", async () => {
                const result = await createUser(userPayload)

                expect(result.password).toHaveLength(60)

                expect(result.firstName).toBe(userPayload.firstName)

                expect(result.lastName).toBe(userPayload.lastName)

                expect(result.email).toBe(userPayload.email)
            })
        })
    })

    // test for logging in a user
    describe("Log user in", () => {
        describe("Given the email and password are correct", () => {
            it("should return true", async () => {
                const newUser = await createUser(userPayload)

                const isValid = await logInUser({
                    email: newUser.email,
                    password: userPayload.password
                })

                expect(isValid).toBeTruthy()
            })
        })

        // testing for when a wrong password or email is provided
        describe("given the password is invalid", () => {
            it("should return false or throw an error", async () => {
                const newUser = await createUser(userPayload)

                const isValid = await logInUser({
                    email: newUser.email, password: 'the-pass-word-is-wrong'
                })

                expect(isValid).toBeFalsy()
            })
        })
    })



    // testing the finding of a user service and also the virtual property of fullName
    describe("virtual property", () => {
        it("should return the user full name", async () => {
            const newUser = await createUser(userPayload)

            const user = await findUser(
                {email:newUser.email},
                // Must not be lean
                {lean: false},
            )

            expect(user?.fullName).toBe(
                `${userPayload.lastName} ${userPayload.firstName}`
            )
        })
    })
})