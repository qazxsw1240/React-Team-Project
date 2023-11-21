import React from "react";

import "./modal.css";

/**
 * @typedef {object} ModalProp
 * @property {boolean} visible
 */

/**
 * @param {ModalProp&React.HTMLAttributes} prop 
 * @returns {React.JSX.Element}
 */

function Modal(prop) {
  const { visible = false, style, children } = prop;
  return (
    <div
      className="modal-background"
      style={{
        display: visible ? "flex" : "none"
      }}>
      <div className="modal window" style={style}>
        <div className="window-inner">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
