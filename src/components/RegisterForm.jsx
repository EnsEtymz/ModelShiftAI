import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";


export function RegisterForm({
  className,
  ...props
})
 {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await dispatch(register(values));
      setLoading(false);
      if (response.payload?.is_success) {
        toast.success("Registration successful!", {
          style: {
            background: "#34c75a",
            color: "#fff",
          },
        });
        setTimeout(() => router.push("/"), 2000);
      } else {
        toast.error(response.payload?.message, {
          style: {
            background: "#000",
            color: "#fff",
          },
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome to Model Shift</h1>
        <p className="text-balance text-muted-foreground">
          Create an account to get started.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          type="text"
          placeholder="John"
          {...formik.getFieldProps("first_name")}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <p className="text-red-500 text-xs">
            {formik.errors.first_name}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          type="text"
          placeholder="Doe"
          {...formik.getFieldProps("last_name")}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <p className="text-red-500 text-xs">
            {formik.errors.last_name}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs">{formik.errors.email}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="******"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs">
            {formik.errors.password}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full hover:bg-[#34c75a] text-white dark:text-black dark:bg-[#34c75a] transition duration-300 dark:hover:bg-[#2aa24a] " disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </div>
  </form>
  )
}
