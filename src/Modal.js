import React from "react";
import { VscChromeClose } from "react-icons/vsc";

import "./index.css";
import "./modal.css";

/**
 * @typedef Props
 * @type {string|JSX.Element|JSX.Element[]|(() => JSX.Element)}
 */

/**
 * @typedef {object} ModalProp
 * @property {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} visible
 * @property {React.CSSProperties} style
 * @property {Props} children
 */

/**
 * @param {ModalProp} prop 
 * @returns {React.JSX.Element}
 */
function Modal(prop) {
  const [visible, setVisible] = prop.visible;
  return (
    <div className="modal-background" style={{ display: visible ? "flex" : "none" }}>
      <div className="text-window modal" style={prop.style}>
        <div className="text-window-inner">
          <VscChromeClose onClick={() => setVisible(() => false)} />
          {
            typeof prop.children === "function" ? prop.children() : prop.children
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
