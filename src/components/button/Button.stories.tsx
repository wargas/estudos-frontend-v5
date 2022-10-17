import {Meta, Story} from '@storybook/react'
import { Button } from '@vechaiui/react'

import '../../index.css'

export default {
    title: 'Components/Button',
    component: Button
} as Meta<Button>

export const Default: Story<Button> = () => <Button>Ação</Button>