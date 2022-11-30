import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const SignInModal = () => {
  const [validation, setValidation] = useState("");
  const { modalState, toggleModals, signIn } = useContext(UserContext);
  const navigate = useNavigate();

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setValidation("");

    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );

      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch (error) {
      setValidation("Email/Password incorrect");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign In</h5>
                  <button onClick={closeModal} className="btn-close"></button>
                </div>
                <div onSubmit={handleForm} className="modal-body">
                  <form className="sign-in-form">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInEmail">
                        Email address
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInPassword">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="password"
                        required
                        className="form-control"
                        id="signInPassword"
                      />
                    </div>
                    <p className="text-danger mt-1">{validation}</p>
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

export default SignInModal;
