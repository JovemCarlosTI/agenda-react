export const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

export const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

export function getToday() {
    return '2021-06-17';
}

export function formatMonth(currentMonth: string) {
    const [year, month] = currentMonth.split('-');

    return `${MONTHS[parseInt(month) - 1]} de ${year}`;
}

export function addMonths(currentMonth: string, increment: number) {
    const jsDate = new Date(currentMonth + '-01T12:00:00');
    jsDate.setMonth(jsDate.getMonth() + increment);
    return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, '0')}`;
}