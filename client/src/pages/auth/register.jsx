import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validateEmailDomain(email) {
    const gmailRegex = /^[^@]+@gmail\.com$/;

    const yahooRegex = /^[^@]+@yahoo\.com$/;

    return gmailRegex.test(email) || yahooRegex.test(email);
  }

  const isFormValid = async () => {
    if (!formData.userName.trim()) {
      toast.error("Please enter username");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter email");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return false;
    }
    if (formData.password.trim().length < 6) {
      toast.error("Password must have at least 6 characters");
      return false;
    }
    if (!validateEmailDomain(formData.email)) {
      toast.error("Only Gmail and Yahoo domains allowed");
      return false;
    }

    return true;
  };

  async function onSubmit(event) {
    event.preventDefault();
    const isValid = await isFormValid();
    if (isValid) {
      dispatch(registerUser(formData)).then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          navigate("/auth/login");
        } else {
          toast.error(data?.payload?.message);
        }
      });
    }
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-1 text-blue-600 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
