import { SignupBody } from "@samthedev09/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

type AuthType = "signup" | "signin";

export function Auth({ type }: { type: AuthType }) {
  const [postInputs, setPostInputs] = useState<SignupBody>({
    username: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );

      console.log(data);
      console.log(data.token);

      if (!data.token) return;

      localStorage.setItem("token", data.token);
      navigate("/blogs");
    } catch (err) {
      alert(`Error while ${type === "signin" ? "signing in" : "signing up"}`);
      console.log(err);
      return;
    }
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-100">
        <div className="flex justify-center flex-col w-96">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              {type === "signin"
                ? "Login to your account "
                : "Create an account"}
            </h1>
            <p className="text-slate-600 tracking-wide mt-3">
              {type === "signin" ? "Don't" : "Already"} have an account?{" "}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline"
              >
                {type === "signin" ? "Sign Up" : "Login"}
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8 mt-6">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            ) : (
              <div></div>
            )}

            <LabelledInput
              label="Username"
              type="email"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInputs({ ...postInputs, username: e.target.value });
              }}
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter a strong password"
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
          </div>

          <button
            type="button"
            onClick={sendRequest}
            className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 tracking-wide"
          >
            {type === "signin" ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </>
  );
}

interface labelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: labelInputType) {
  return (
    <>
      <div>
        <label
          htmlFor="label"
          className="block mb-2 text-md font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
          onChange={onChange}
        />
      </div>
    </>
  );
}
