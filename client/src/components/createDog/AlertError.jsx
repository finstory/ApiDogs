import React from "react";
export const AlertError = ({ listValidate, type }) => {
  // * Si existen errores del "type" recibdo, se mostrará en pantalla.
  listValidate = listValidate
    ? listValidate.filter((obj) => obj.type === type)
    : [];
  return (
    <span className="alert-error">
      {listValidate.length
        ? listValidate.map((obj) =>
            !obj.condition ? (
              <span key={obj.msg} className="alert-error-message anim-opacity">
                {obj.msg}
              </span>
            ) : (
              ""
            )
          )
        : ""}
    </span>
  );
};
