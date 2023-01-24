import { useContext } from "react";
import { Header } from "../../Components/Header";
import { SearchForm } from "../../Components/SearchForm";
import { Summary } from "../../Components/Summary";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

import { TransactionsContext } from '../../contexts/TransactionContext'
import { dateFormatter, pricesFormatter } from "../../utils/formatter";

export function Transactions() {
    const {transactions } = useContext(TransactionsContext)

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="40%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {pricesFormatter.format(transaction.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td >{transaction.category}</td>
                                    <td >{dateFormatter.format(new Date(transaction.created_at))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>

        </div>
    )
}