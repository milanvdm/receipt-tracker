import React from 'react';
import { Button } from 'grommet';
import { Add } from 'grommet-icons';

interface AddButtonProps { label: string, onClick: () => void }

const AddButton = 
    ({
        label,
        onClick
    }: AddButtonProps): JSX.Element =>
        <Button
            label={label}
            icon={<Add />}
            active
            onClick={onClick}
        />

export default AddButton
