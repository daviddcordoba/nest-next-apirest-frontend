"use client";

import { GithubIcon } from "@/icons/GithubIcon";
import { GoogleIcon } from "@/icons/googleIcon";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cat_img_login from '../../assets/cat-login.jpg'

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,//pq sino nos manda al formulario por defecto q me da auth
    });


    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <section className="container w-75 bg-light rounded shadow mt-5">
      <div className="row align-items-stretch">
      <div className="col-md-5 col-lg-5 col-xl-6 d-none d-lg-flex rounded"> {/* Cambios aquí */}
          <img src={cat_img_login.src} alt="Cat" className="img-fluid" />
        </div>

        
        <div className="col p-5 rounded-end">
          <h2 className="fw-bold text-center py-5">Bienvenido</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">Correo Electronico</label>
              <input
                type="email"
                placeholder="test@test.com"
                name="email"
                className="form-control mb-2"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">

            <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                placeholder="123123"
                name="password"
                className="form-control mb-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            
            

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>

            

            <div className="my-3 d-flex flex-column">
              <span>No tenes cuenta? <a href="">Registrate </a></span>
              <span><a href="">Recuperar contraseña</a></span>
            </div>
            
        </form>

        <div className="mt-6 row align-items-center text-gray-400">
              <div className="col text-end">
                <hr className="border-gray-400"/>
              </div>
              <div className="col-auto ">
                <p className="text-center text-sm pt-2">OR</p>
              </div>
              <div className="col text-start">
                <hr className="border-gray-400"/>
              </div>
        </div>

        <div className="container w-100 ">
          <div className="row text-center ">
            <div className="col-12 my-3">
              Iniciar sesion
            </div>
            <div className="row">
              <div className="col">
                <button className="btn btn-outline-danger w-50 my-1">
                  
                      <GoogleIcon className="" width="25px" height="25px"/>
                   
                </button>
              </div>
              <div className="col">
              <button className="btn btn-outline-secondary w-50 my-1">
                  
                      <GithubIcon className="" width="25px" height="25px"/>
                    
                </button>
              </div>
            </div>
          </div>
        </div>
        </div> 
      </div>

    </section>
  );
};
export default LoginPage;

/* <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="test@test.com"
          name="email"
          className="form-control mb-2"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="123123"
          name="password"
          className="form-control mb-2"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div> */