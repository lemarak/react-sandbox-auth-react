import { updateCurrentUser } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";

const SignUpModal = () => {
  const [validation, setValidation] = useState("");
  const { modalState, toggleModals, signUp } = useContext(UserContext);

  const inputs = useRef([]);
  const addInputs = (el) => {
    console.log("el", el);

    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
    console.log(inputs);
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    }
    if (inputs.current[1].value.length !== inputs.current[2].value.length) {
      setValidation("passwords do not match");
      return;
    }
    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset();
      setValidation("");
      console.log(cred);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={() => toggleModals("close")}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button
                    onClick={() => toggleModals("close")}
                    className="btn-close"
                  ></button>
                </div>
                <div onSubmit={handleForm} className="modal-body">
                  <form ref={formRef} className="sign-up-form">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpEmail">
                        Email address
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpPassword">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="password"
                        required
                        className="form-control"
                        id="signUpPassword"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpPassword">
                        Repeat password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="repeatPassword"
                        required
                        className="form-control"
                        id="repeatPassword"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
