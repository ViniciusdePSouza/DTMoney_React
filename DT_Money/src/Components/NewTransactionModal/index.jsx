import * as Dialog from '@radix-ui/react-dialog'

import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles'
import { X } from 'phosphor-react'
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(['income', 'outcome']),
})

export function NewTransactionModal() {
    const { control, register, handleSubmit, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(newTransactionFormSchema),
    })

    async function handleCreateNewTransaction(data) {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder="Descrição" {...register('description')} />
                    <input type="number" placeholder="Preço" {...register('price', { valueAsNumber: true })} />
                    <input type="text" placeholder="Categoria" {...register('category')} />

                    <Controller
                        control={control}
                        name='type'
                        render={({field}) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />
                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>

                <CloseButton >
                    <X size={24} />
                </CloseButton>
            </Content>
        </Dialog.Portal>
    )
}