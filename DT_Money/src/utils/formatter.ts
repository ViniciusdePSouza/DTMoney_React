export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const pricesFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})