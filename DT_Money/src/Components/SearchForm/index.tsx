import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

const searchFormSchema = zod.object({
    query: zod.string()
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

function SearchFormComponent() {
    const {register, handleSubmit, formState: { isSubmitting }} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })

    const  fetchTransactions  = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions

    })

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

export const SearchForm = memo(SearchFormComponent)