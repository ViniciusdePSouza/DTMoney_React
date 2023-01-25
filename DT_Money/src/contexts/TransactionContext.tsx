import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    created_at: string
}

interface CreateNewTransaction {
    description: string
    price: number
    category: string
    type: 'income' | 'outcome'
}

interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createNewTransaction: (data: CreateNewTransaction) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                _sort: 'id',
                _order: 'desc',
                q: query,
            }
        })

        setTransactions(response.data)

    }
    
    async function createNewTransaction(data: CreateNewTransaction) {
        const { description, price, category, type } = data

        const response = await api.post('/transactions', {
            description,
            price,
            category,
            type,
            created_at: new Date(),
        })

        setTransactions(state => [response.data, ...state])
    }


    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createNewTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}