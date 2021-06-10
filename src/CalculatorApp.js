import { LitElement, html, css } from 'lit-element';

export class CalculatorApp extends LitElement {
  static get properties() {
    return {
      currentOperand: {
        type: String
      },
      previousOperand: {
        type: String
      },
      operator: {
        type: String
      },
      buttons: {
        type: Array
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        margin: 0 auto;
        text-align: center;
        background-color: var(--calculator-app-background-color);
      }

      body {
        padding: 0;
        margin: 0;
      }

      .calculator {
        display: flex;
        flex-direction: column;
        background: black;
        width: 40%;
        bottom: 0
      }

      .buttons-grid {
        display: grid;
        grid-column-start: auto;
        grid-template-columns: repeat(4, 1fr);
        justify-content: center;
        grid-template-rows: minmax(120px, auto) repeat(5, 120px);
      }

      .span-two {
        grid-column: span 2;
      }

      .output {
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        flex-direction: column;
        padding: 100px;
        word-wrap: break-word;
        word-break: break-all;
      }

      .output .previous-operand {
        color: rgba(255, 255, 255, 0.75);
        font-size: 2rem;
      }

      .output .current-operand {
        color: white;
        font-size: 3.5rem;
      }
    `;
  }

  constructor() {
    super();
    this.addEventListener('press-button', this._handlePressButton);
    this.previousOperand = '';
    this.currentOperand = '';
    this.buttons = [
      {
        value: 'AC',
        id: 'reset',
        type: 'special',
        class: 'span-two'
      },
      {
        value: 'DEL',
        id: 'del',
        type: 'special'
      },
      {
          value: '÷',
          id: 'dividir',
          type: 'operator'
      },
      {
          value: '1',
          id: '1',
          type: 'number'
      },
      {
          value: '2',
          id: '2',
          type: 'number'
      },
      {
          value: '3',
          id: '3',
          type: 'number'
      },
      {
          value: 'x',
          id: 'multiplicar',
          type: 'operator'
      },
      {
          value: '4',
          id: '4',
          type: 'number'
      },
      {
          value: '5',
          id: '5',
          type: 'number'
      },
      {
          value: '6',
          id: '6',
          type: 'number'
      },
      {
          value: '-',
          id: 'restar',
          type: 'operator'
      },
      {
          value: '7',
          id: '7',
          type: 'number'
      },
      {
          value: '8',
          id: '8',
          type: 'number'
      },
      {
          value: '9',
          id: '9',
          type: 'number'
      },
      {
          value: '+',
          id: 'sumar',
          type: 'operator'
      },
      {
          value: '.',
          id: 'point',
          type: 'number'
      },
      {
          value: '0',
          id: '0',
          type: 'number'
      },
      {
          value: '=',
          id: '=',
          type: 'operator',
          class: 'span-two'
      }
    ]
  }

  _handlePressButton(ev) {
    const { value, type } = ev.detail;
    this.logicCalculator(value, type);
  }

  calculate() {
    const previousOperand = parseFloat(this.previousOperand);
    const currentOperand = this.currentOperand.length > 0 ? parseFloat(this.currentOperand) : 0;

    if(this.operator === '+') return previousOperand + currentOperand;
    if(this.operator === '-') return previousOperand - currentOperand;
    if(this.operator === '*') return previousOperand * currentOperand;
    if(this.operator === '÷') return previousOperand / currentOperand;
  }

  logicCalculator(value, type) {
    if(type === 'special') {
      if(value === 'AC') {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = '';
      }
      if(value === 'DEL') {
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
      }
    }
 
    if(type === 'number') {
      this.currentOperand += value;
    }

    if(type === 'operator') {
      if (value === '=') {
        this.previousOperand = this.calculate();
        this.currentOperand = '';
        return;
      }
      this.operator = value;
      if(this.previousOperand === '') {
        this.previousOperand = this.currentOperand;
      } else {
        this.previousOperand = this.calculate();
      }
      this.currentOperand = '';
    }
  }

  render() {
    return html`
      <div class="calculator">
        <div class="output">
          <div class="previous-operand">${this.previousOperand}</div>
          <div class="current-operand"> ${this.currentOperand}</div>
        </div>
        <ul class="buttons-grid">
          ${this.buttons.map(element => html `<c-button value="${element.value}" type="${element.type}" class="${element.class}"></c-button>`)}
        </ul>
      </div>

    `;
  }
}
