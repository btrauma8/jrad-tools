import * as React from 'react';
import { Icon } from '../icon/icon';
import { BasicInput } from './basic-input';
import { InputProps } from './index';
import { getCss } from '../get-css';

export const Input = React.forwardRef((props:InputProps, ref:React.Ref<HTMLInputElement>) => {
    const { appendIcon, prependIcon, ...rest} = props;
    if (appendIcon) {
        const css = getCss({
            width: rest.width, // was being pulled out
            size: rest.size
        }) + ' input-append-icon';
        return (
            <label className={css}>
                <BasicInput {...rest} />
                <span><Icon name={appendIcon} fg={rest.readOnly ? 'faded' : 'default'} /></span>
            </label>
        )
    } else if (prependIcon) {
        // for now, just one or the other (prepend or append)
        const css = getCss({
            width: rest.width, // was being pulled out
            size: rest.size
        }) + ' input-prepend-icon';
        return (
            <label className={css}>
                <span><Icon name={prependIcon} fg={rest.readOnly ? 'faded' : 'default'} /></span>
                <BasicInput {...rest} />
            </label>
        )
    }
    return <BasicInput  {...rest} ref={ref} />
})
