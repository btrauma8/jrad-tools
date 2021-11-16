import { useEffect, useState } from 'react';
import { useStore, getStore, setStore } from './use-store';

const prefix = "dnd:";

interface DragState {
    readonly draggingElement:HTMLElement;
    readonly dragVal:any;
}

export const useDrop = <T>(dragId:string, onDrop:(val:T|null) => void) => {

    const [ dropElem, dropRef ] = useState<HTMLElement|null>(null);
    const [ isDraggingOverMe, setIsDraggingOverMe ] = useState(false);

    useEffect(() => {
        if (!dropElem) return;
        const dropFn = (evt:any) => {
            evt.preventDefault();
            setIsDraggingOverMe(false);
            const droppedDragId = evt.dataTransfer.getData('text/plain');
            if (droppedDragId === prefix + dragId) {
                // Listen to this!
                const raw = getStore<DragState|null>(prefix + dragId);
                onDrop(raw ? raw.dragVal : null);
                setStore(prefix + dragId, null);
            }
        }
        const dragEnterOrOver = (evt:any) => {
            evt.preventDefault();
            // work-around for inability to access dt data until drop, to know, do we care about this drag over?
            // setIsDraggingOverMe(evt.dataTransfer.types.includes(prefix + dragId));
            if (!evt.dataTransfer.types.includes(prefix + dragId)) {
                setIsDraggingOverMe(false);
            } else {
                // we may be dragging over ourself, if we are doing double duty.
                const raw = getStore<DragState|null>(prefix + dragId);
                setIsDraggingOverMe(raw?.draggingElement !== dropElem ? true : false);
            }
        }
        const dragLeave = () => {
            setIsDraggingOverMe(false);
        }
        dropElem.addEventListener("drop", dropFn);
        dropElem.addEventListener("dragenter", dragEnterOrOver);
        dropElem.addEventListener("dragover", dragEnterOrOver);
        dropElem.addEventListener("dragleave", dragLeave);
        return () => {
            dropElem.removeEventListener("drop", dropFn);
            dropElem.removeEventListener("dragenter", dragEnterOrOver);
            dropElem.removeEventListener("dragover", dragEnterOrOver);
            dropElem.removeEventListener("dragleave", dragLeave);
        }

    }, [dropElem])

    return {
        dropRef,
        isDraggingOverMe
    }
}

export const useDrag = <T>(dragId:string, dragVal:any, onDrop?:(val:T|null) => void) => {

    const [ dragState, setDragState ] = useStore<DragState|null>(prefix + dragId, null);
    // They're not really refs, but we use em as refs are commonly used in react, so, feels normal this way.
    // (this way the useeffects can fire when they are set)

    const [ dragAndDropElem, dragAndDropRef ] = useState<HTMLElement|null>(null);
    const [ dragElem, dragRef ] = useState<HTMLElement|null>(null);
    const [ dragHandleElem, dragHandleRef ] = useState<HTMLElement|null>(null);

    const { isDraggingOverMe, dropRef } = useDrop<T>(dragId, (val) => {
        if (onDrop) onDrop(val);
    })

    // if onDrop is specified, it means, we will drag AND drop
    useEffect(() => {
        if (dragAndDropElem) {
            dragRef(dragAndDropElem);
            dropRef(dragAndDropElem);
        }
    }, [dragAndDropElem])

    useEffect(() => {
        if (!dragElem) return;

        const handleMouseDown = () => dragElem.setAttribute('draggable', 'true');
        const handleMouseUp = () => dragElem.setAttribute('draggable', 'false');

        const dragStart = (evt:any) => {
            evt.dataTransfer.setData('text/plain', prefix + dragId);
            // work-around to allow listeners to know if they should care
            // (you cannot access text/plain until actual drop)
            evt.dataTransfer.setData(prefix + dragId, 'dummy');
            setDragState({ draggingElement:dragElem, dragVal })
        }

        const dragEnd = (evt:any) => {
            if (dragHandleElem) dragElem.setAttribute('draggable', 'false');
            setDragState(null);
        }

        const dragOver = (evt:any) => {
            evt.preventDefault(); // without this, cursor is not-allowed cursor!
        }

        if (!dragHandleElem) {
            // without handle
            dragElem.setAttribute('draggable', 'true');
            console.log('just set it to true');
        } else {
            // with handle
            dragElem.setAttribute('draggable', 'false');
            dragHandleElem.addEventListener('mousedown', handleMouseDown);
            dragHandleElem.addEventListener('mouseup', handleMouseUp);
        }

        dragElem.addEventListener('dragover', dragOver);
        dragElem.addEventListener('dragstart', dragStart);
        dragElem.addEventListener('dragend', dragEnd);

        return () => {
            if (dragHandleElem) {
                dragHandleElem.removeEventListener('mousedown', handleMouseDown);
                dragHandleElem.removeEventListener('mouseup', handleMouseUp);
            }
            dragElem.removeEventListener('dragover', dragOver);
            dragElem.removeEventListener('dragstart', dragStart);
            dragElem.removeEventListener('dragend', dragEnd);
        }
    }, [dragHandleElem, dragElem])

    return {
        isDraggingOverMe,
        isDragging: dragState?.draggingElement === dragElem,
        dragRef,
        dragHandleRef,
        dragAndDropRef
    }
}