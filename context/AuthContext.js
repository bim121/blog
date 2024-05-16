import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  const signup = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log("res", res);

    console.log("data", data);

    if (res.ok) {
      setUser(data.user);
      router.push("/auth/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const signin = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
    const res = await fetch(`${NEXT_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    console.log("data", data);

    if (res.ok) {
      setUser(data.user);
      router.push("/auth/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const signout = async () => {
    const res = await fetch(`${NEXT_URL}/api/signout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
