import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();
  const changeInputHandle = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleRegistration = async (e, type) => {
    e.preventDefault();

    if (type === "login" && (!loginInput.email || !loginInput.password)) {
      toast("Please All Login Fields Required");
      return;
    }

    if (
      type === "signup" &&
      (!signupInput.name || !signupInput.email || !signupInput.password)
    ) {
      toast("Please All Signup Fields Required ");
      return;
    }

    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  
  useEffect(() => {
    if (registerData && registerIsSuccess) {
      toast.success(registerData.message || "Account Created Successfully")
    } if (loginData && loginIsSuccess) {
      toast.success(loginData.message || "Login Successfully")
      navigate('/')
    } if (registerError) {
      toast.error(registerData?.data.message || "Signup Failed")
    } if (loginError) {
      toast.error(loginData?.data.message || "Login Failed")
    }
  }, [registerData, registerIsSuccess, registerError, loginData, loginError, loginIsSuccess, navigate])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-muted/40 -mt-10">
      <Tabs defaultValue="login" className="w-full max-w-md">
        {/* Tabs Header */}
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        {/* Signup */}
        <TabsContent value="signup">
          <Card className="w-full shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Enter your details to create your LMS account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandle(e, "signup")}
                    placeholder="Enter Your Name:"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandle(e, "signup")}
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandle(e, "signup")}
                    required
                  />
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                onClick={(e) => handleRegistration(e, "signup")}
                className="w-full"
              >
                {
                  registerIsLoading ? (<>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />Please Wait
                  </>) : "Signup"
                }
              </Button>
              <Button variant="outline" className="w-full">
                Signup with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login */}
        <TabsContent value="login">
          <Card className="w-full shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Login to continue your learning</CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandle(e, "login")}
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Password</Label>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandle(e, "login")}
                    required
                  />
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                onClick={(e) => handleRegistration(e, "login")}
                className="w-full"
              >
                {
                  loginIsLoading ? (<>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />Please Wait
                  </>) : "Login"
                }
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Login;
