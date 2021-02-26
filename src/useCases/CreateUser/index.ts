import { PostgressUsersRepository } from "../../repositories/implementations/PostgressUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { CreateUserController } from "./CreateUserController"
import { MailtrapMailProvider } from "../../provider/implementations/MailtrapMailProvider"


const postgresUserRepository = new PostgressUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()


const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }