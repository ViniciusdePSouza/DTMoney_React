import { Header } from "../../Components/Header";
import { SearchForm } from "../../Components/SearchForm";
import { Summary } from "../../Components/Summary";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="40%">Desenvolvimento de site</td>
                            <td>
                                <PriceHighLight variant="income">
                                    R$ 12.000,00
                                </PriceHighLight>
                            </td>
                            <td >Venda</td>
                            <td >13/04/2022</td>
                        </tr>
                        <tr>
                            <td width="40%">Desenvolvimento de site</td>
                            <td>
                                <PriceHighLight variant="outcome">
                                    -R$ 50,00
                                </PriceHighLight>
                            </td>
                            <td >Alimentação</td>
                            <td >10/04/2022</td>
                        </tr>

                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>

        </div>
    )
}