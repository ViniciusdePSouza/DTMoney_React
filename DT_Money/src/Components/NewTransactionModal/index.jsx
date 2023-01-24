import * as Dialog from '@radix-ui/react-dialog'

import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles'
import { X } from 'phosphor-react'
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'


export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <form>
                    <input type="text"  placeholder="Descrição"/>
                    <input type="number" placeholder="Preço" />
                    <input type="text" placeholder="Categoria" />

                    <TransactionType>
                        <TransactionTypeButton variant='income' value='income'>
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>
                        <TransactionTypeButton  variant='outcome' value='outcome'>
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit">Cadastrar</button>
                </form>

                <CloseButton >
                    <X size={24}/>
                </CloseButton>
            </Content>
        </Dialog.Portal>
    )
}