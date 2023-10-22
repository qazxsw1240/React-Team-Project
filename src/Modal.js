import React from "react";

import "./index.css";
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
    <div className="modal-background" style={{ display: visible ? "flex" : "none" }}>
      <div className="text-window modal" style={style}>
        <div className="text-window-inner">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
