import { Html } from './html';

export abstract class FloatingForm {
    private constructor() {};

    static Input(id:string, type:string, title:string, value:string, parent: HTMLElement ) : HTMLElement {
        const result = Html.append(parent, 'div', ['form-floating', 'm-3']);
        
        const input = (type === 'textArea') 
                    ? Html.append(result, 'textarea', ['form-control'])
                    : Html.appendType(result, 'input', type, ['form-control'], null);
        const label = Html.appendText(result, 'label', [], title);
        
        label.setAttribute('for', id);
        input.setAttribute('id', id);
        input.setAttribute('value', value);
        input.setAttribute('placeholder', title);
        
        parent.appendChild(result);
        return parent;
    }

}