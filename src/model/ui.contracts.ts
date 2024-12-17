export interface IModal<T> {
    current : T;
    modalContainer:HTMLElement|null;
    saveOrUptade(item : T) : void;
}

export interface ITable<T> {
    list: T[];
    tableContainer:HTMLElement|null;
    
    edit(item : T) : void;
    remove(item : T) : void;
}

export interface IForm<T> {
    formContainer:HTMLElement|null;
    submit(item : T) : void;
}
