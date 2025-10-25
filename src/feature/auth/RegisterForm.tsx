import InputText from "@/components/input/InputText";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/input/InputPassword";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import API from "@/api/api";
import { Link } from "react-router-dom";
import SuccessAlert from "@/components/SuccessAlert";

interface IRegister {
  email: string;
  username: string;
  password: string;
}

const schema = z.object({
  email: z.string().min(1, { message: "Email is required!" }),
  username: z.string().min(1, { message: "Username is required!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
      message:
        "Password must contain at least one uppercase, one number, one symbol, min. 8 digit and max. 16 digit",
    }),
});

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const register = async (data: IRegister) => {
    try {
      const response = await API.post("/auth/local/register", {
        email: data.email,
        username: data.username,
        password: data.password,
      });

      return { success: true, data: response.data };
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        "Register failed. Please try again.";
      return { success: false, error: message };
    }
  };

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setLoading(true); // clear loading
    setError(""); // clear existing error first
    setSuccess(""); // clear existing success first
    await register(data);
    setSuccess("Account has been registered successfully!");
    setLoading(false);
    setTimeout(() => {
      setSuccess("");
      setError("");
      reset();
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <InputText
          id="email"
          control={control}
          name="email"
          label="Email"
          hook
          placeholder="ex: JohnDoe@gmail.com"
          error={errors?.email?.message}
        />
        <InputText
          id="username"
          control={control}
          hook
          name="username"
          label="Username"
          placeholder="ex: JohnDoe"
          error={errors?.username?.message}
        />
        <InputPassword
          control={control}
          name="password"
          label="Password"
          placeholder="Create your password"
          error={errors?.password?.message}
        />
        <ErrorAlert message={error} />
        <SuccessAlert message={success} />
        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={loading} className="w-full">
            Create an account
          </Button>
          <Link to={"/login"} className="self-center">
            <p className="text-sm">Already have account?</p>
          </Link>
        </div>
      </div>
    </form>
  );
}
