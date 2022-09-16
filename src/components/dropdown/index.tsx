import { Menu } from '@headlessui/react'

type Props = {
    children: any,
    items: Item[],
    position?: 'left' | 'right'
}

type Item = {
    label: string,
    icon: string,
    action: () => void
}

export function Dropdown({children, position = 'left', items}: Props) {

    const postionClass = `${position}-0`

    return (
        <Menu as={'div'} className="relative mt-2">
            <Menu.Button>{children}</Menu.Button>
            <Menu.Items className={`absolute flex flex-col bg-white divide-y overflow-hidden min-w-[200px] divide-gray-100 rounded shadow ${postionClass}`}>
                {items.map((item, i) => (
                    <Menu.Item key={i}>
                        <button className='px-4 text-gray-700 text-base py-2 text-left hover:bg-gray-50 transition-all' onClick={() => item.action()}>{item.label}</button>
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}