import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";
import { pricesFormatter } from "../../utils/formatter";

export function Summary() {
    const { transactions } = useContext(TransactionsContext)

    const summary = transactions.reduce((acc, transaction) => {

        if(transaction.type === 'income') {
            acc.income += transaction.price
            acc.total += transaction.price
        } else if (transaction.type === 'outcome') {
            acc.outcome += transaction.price
            acc.total -= transaction.price
        }

        return acc 
    }, {income: 0, outcome: 0, total: 0})

    return (
     <SummaryContainer>
        <SummaryCard>
            <header>
                <span>Entradas</span>
                <ArrowCircleUp size={32} color='#00b37e'/>
            </header>

            <strong>{pricesFormatter.format(summary.income)}</strong>
        </SummaryCard>
        <SummaryCard>
            <header>
                <span>Saídas</span>
                <ArrowCircleDown size={32} color='#f75a68'/>
            </header>

            <strong>{pricesFormatter.format(summary.outcome)}</strong>
        </SummaryCard>
        <SummaryCard variant="green">
            <header>
                <span>Total</span>
                <CurrencyDollar size={32} color='#fff'/>
            </header>

            <strong>{pricesFormatter.format(summary.total)}</strong>
        </SummaryCard>
     </SummaryContainer>
    )
}