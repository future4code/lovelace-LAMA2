import { UserBusiness } from "../src/business/UserBusiness"
import { UserInputDTO } from "../src/model/User"

describe("Testando a função SignUp", () => {
    const idGenerator = { generate: jest.fn() } as any
    const hashManager = { hash: jest.fn() } as any
    const authenticator = { generateToken: jest.fn() } as any
    const userDatabase = { createUser: jest.fn() } as any

    test("Teste com 'name' vazio", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "",
            email: "test@email.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error:any) {
            expect(error.message).toBe("Preencha os campos corretamente!")

        }
    })

    test("Teste com 'email' vazio", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "AstroDev",
            email: "",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error:any) {
            expect(error.message).toBe("Preencha os campos corretamente!")
        }
    })

    test("Teste com 'password' vazio", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "AstroDev",
            email: "test@email.com",
            password: "",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error:any) {
            expect(error.message).toBe("Preencha os campos corretamente!")

        }
    })

    test("Teste com senha com menos de 6 caracteres", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "AstroDev",
            email: "test@email.com",
            password: "12345",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error:any) {
            expect(error.message).toBe("A senha precisa ter no mínimo 6 caracteres!")

        }
    })

    test("Teste com 'role' vazio", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "AstroDev",
            email: "test@email.com",
            password: "testando123",
            role: ""
        }

        try {
            await userBusiness.createUser(input)

        } catch (error:any) {
            expect(error.message).toBe("Preencha os campos corretamente!")

        }
    })

    test("Teste de sucesso - todos os campos preenchidos corretamente", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "AstroDev",
            email: "test@email.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {}
    })
    
})