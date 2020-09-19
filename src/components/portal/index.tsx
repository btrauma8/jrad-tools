import * as React from 'react';
import { createPortal } from 'react-dom';
import { BehaviorSubject } from 'rxjs';

type PortalById = { [id:string] : HTMLSpanElement };

const portals = new BehaviorSubject<PortalById>({});

const removePortal = (id:string) => {
    const { [id]:removeMe, ...rest } = portals.getValue();
    portals.next(rest);
}

interface PortalPlaceholderProps {
    readonly id:string;
}
export const PortalPlaceholder = ({ id }:PortalPlaceholderProps) => {
    const el = React.useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        if (el && el.current && id) {
            const currentPortals = portals.getValue();
            if (currentPortals[id] !== el.current) {
                portals.next({
                    ...currentPortals,
                    [id]: el.current
                });
            }
        }
        return () => removePortal(id);
    }, [id, el]);
    return <span ref={el}></span>;
}

interface IntoPortalProps {
    readonly id:string;
    readonly children:React.ReactNode;
}
export const IntoPortal = ({ id, children }:IntoPortalProps) => {
    const [ span, setSpan ] = React.useState<HTMLSpanElement>(() => portals.getValue()[id]);
    React.useEffect(() => {
        if (!id) return;
        const sub = portals.subscribe(byId => setSpan(byId[id]));
        return () => sub.unsubscribe();
    }, [id]);
    if (!span) return null;
    return createPortal(children, span);
}