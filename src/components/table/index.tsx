import { TableHTMLAttributes } from "react"

type TableProps = {

} & TableHTMLAttributes<HTMLTableElement>

export default function Table({...props}: TableProps) {
    return <table {...props} />
}

function TableHead() {
    return <thead />
}

function TableBody() {
    return <tbody />
}

function TableRow() {
    return <tr />
}

function TableCell() {
    return <td />
}

function TableCellHeader() {
    return <th />
}

export  {
    TableHead as Head, 
    TableBody as Body,
    TableRow as Tr,
    TableCell as Td,
    TableCellHeader as Th
}