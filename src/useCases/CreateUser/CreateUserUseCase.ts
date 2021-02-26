import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IMailProvider } from "../../provider/IMailProvider";


export class CreateUserUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ){}
    
    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists){
            throw new Error('User Already Exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: "equipe",
                email: "equipe@email.com"
            },
            subjecy: "seja bem vindo!",
            body: '<p>Vode ja pode</p>'
        })
    }
}