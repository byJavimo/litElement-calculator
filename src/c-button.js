import { LitElement, html, css } from 'lit-element';

export class CButton extends LitElement {
  static get properties() {
    return {
      value: { 
        type: String 
      },
      type: {
        type: String
      }
    };
  }

  static get styles() {
    return css`
      button {
        cursor: pointer;
        font-size: 2rem;
        border: none;
        border-radius: 70px;
        outline: none;
        background-color: rgba(255, 255, 255, 0.75);
        height: 80%;
        width: 80%;
      }

      .special, .operator {
        background-color: orange;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <button class="${this.type}" @click="${this._pressButton}">${this.value}</button>
    `;
  }

  _pressButton() {
    let myEvent = new CustomEvent('press-button', {
      detail: {
        value: this.value,
        type: this.type
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(myEvent);
  }
}
