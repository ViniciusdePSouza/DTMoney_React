import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionContext'

const searchFormSchema = zod.object({
    query: zod.string()
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
    const {register, handleSubmit, formState: { isSubmitting }} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })

    const { fetchTransactions } = useContext(TransactionsContext)

    async function handleSearchTransition(data: SearchFormInputs ) {
        await fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransition)}>
            <input type="text" placeholder='Busque pelas transações' {...register('query')}/>

            <button type='submit' disabled={isSubmitting}>
                <MagnifyingGlass />
                Buscar
            </button>
        </SearchFormContainer>
    )
}