import { Menu, Transition } from '@headlessui/react'

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

export function Dropdown({ children, position = 'left', items }: Props) {

    const postionClass = `${position}-0`

    return (
        <Menu as={'div'} className="relative mt-2 ui-open:z-50">
            <Menu.Button>{children}</Menu.Button>
            <Transition 
                enter='transition duration-100 ease-out'
                enterFrom='opacity-0 transform scale-95'
                enterTo='opacity-100 transform scale-100'
                leave='transition duration-75 ease-out'
                leaveFrom='opacity-100 transform scale-100'
                leaveTo='opacity-0 transform scale-95'
                >
                <Menu.Items className={`absolute z-50 flex flex-col bg-primary-800 divide-y divide-primary-700 overflow-hidden min-w-[200px] rounded shadow-sm ${postionClass}`}>
                    {items.map((item, i) => (
                        <Menu.Item key={i}>
                            <button className='ui-active:bg-primary-700 px-4 text-primary-100 text-base py-2 text-left transition-all' onClick={() => item.action()}>{item.label}</button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}