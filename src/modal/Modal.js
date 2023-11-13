import React from "react";

/**
 * @typedef {object} ModalProp
 * @property {boolean} visible
 */

/**
 * @param {ModalProp&React.HTMLAttributes} prop 
 * @returns {React.JSX.Element}
 */

function Modal(prop) {
  const { visible = false, children } = prop;
  return (
    <div className="modal-background"
      style={{
        display: visible ? "flex" : "none"
      }}>
      <div className="modal window" style={prop.style}>
        <div className="window-inner">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
