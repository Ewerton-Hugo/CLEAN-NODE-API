import {AddAccountModel} from '../../domain/usecases/add-account'
import {AccountModel} from '../../domain/models/account'


export interface AddAccounRepository{
    add(accountData: AddAccountModel): Promise<AccountModel>
}