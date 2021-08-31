import bcrypt from 'bcrypt'
import { promises } from 'dns'
import { resolve } from 'path'
import {BcryptAdapter} from '../criptography/bcripter-adapter'

jest.mock('bcrypt',() =>({
    async hash (): Promise <string>{
        return new Promise(resolve => resolve('hash'))
    } 

}))

describe('bcrypt adapter', () => {
    test('Should call bcrypt with correct values',async() => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('should return a hash on success', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe("hash")
    })
})