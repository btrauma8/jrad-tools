import React from 'react';
import { Button } from '../button/button';
import { ButtonGroup } from '../button-group/button-group';

interface Props {
    readonly totalPages:number;
    readonly page:number;
    readonly setPage:(x:number) => void;
    readonly buttons:number[];
}
export const TablePageButtons = ({ totalPages, buttons, page, setPage }:Props) => {

    if (totalPages < 2) return null;

    return (
        <ButtonGroup mt="2">
            { buttons[0] > 0 && (
                <Button size="sm" type="link" onClick={() => setPage(0)} icon="dbl-chevron-left" />
            )}
            { buttons && buttons.map((b, n) => (
                <Button
                    key={n}
                    size="sm"
                    type={page === b ? 'default' : 'link'}
                    onClick={() => setPage(b)}
                >{b+1}</Button>
            ))}
            { buttons[buttons.length-1] < totalPages-1 && (
                <Button size="sm" type="link" onClick={() => setPage(totalPages-1)} icon="dbl-chevron-right" />
            )}
        </ButtonGroup>
    )
}