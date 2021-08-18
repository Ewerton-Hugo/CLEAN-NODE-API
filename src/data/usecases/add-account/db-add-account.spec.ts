import { Interface } from 'readline'
import {DbAddAccount} from './db-add-account'
import {Encrypter} from './db-add-account-protocols'
import { promises } from 'dns'
import { resolve } from 'path'
import { rejects } from 'assert'
interface SutTypes{
    sut:DbAddAccount
    encrypterStub: Encrypter
}
const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter{
        async encrypt(value: string): Promise<string>{

            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}
const makeSut = (): SutTypes =>{
    const encrypterStub = makeEncrypter()
    const sut = new  DbAddAccount(encrypterStub)

    return{
        sut,
        encrypterStub,
    }

    
}

describe('DbAddAccount Usecase', () => {

    test('Should call Encrypter with  correct password', async () =>{
        const {sut, encrypterStub} = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'


        }

        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

})
describe('DbAddAccount Usecase', () => {

    test('Should throws if Encrypter throws', async () =>{
        const {sut, encrypterStub} = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve,rejects) => rejects (new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'


        }

        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

})
