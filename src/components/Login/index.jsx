import { useCallback, useEffect, useState } from "react";
import { doLogin, ejercicioSortAndFilter } from '../../api/userServices';
import './styles.css';

const LoginForm = () => {

  // ==== Tercer ejercicio =====
  //
  useEffect(() => {
    console.log(ejercicioSortAndFilter());
  }, []);
  //
  // ===========================

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

  // variable hasErrors para reducir código
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    setErrors({ username: !username, password: !password });
    setHasErrors(!username || !password);
  }, [username, password]);

  // aqui uso useCallback para que la funcion se ejecute en el renderizado solo si hubieron cambios en la variable de estado "errors"
  const getErrorMessages = useCallback(() =>  {
    let errorMessages = [];
    if (errors.username) errorMessages.push("Username is missing. ");
    if (errors.password) errorMessages.push("Password is missing. ");
    return errorMessages.join('');
  }, [errors])

  // quité useCallback porque no veo la necesidad de usarlo. 
  // onSubmit se va a ejecutar solo cuando el form lo ejecute, y por lo que entendí useCallback no aporta nada
  const onSubmit = (event) => {
    // preventDefault para que el form no recargue la página on sumit
    event.preventDefault()
    // uso la variable de estado "hasErrors", en vez de chequear nuevamente los errores
    if (!hasErrors) {
      //set loading true solo cuando comienzo a hacer el pedido a la api
      setLoading(true);
      // implementé una especie de Promise para poder probarlo
      doLogin(username, password).then((message) => {
        alert(message);
        setLoading(false);
      }).catch((message) => {
        // catch por si la promise falla
        alert(message);
        setLoading(false);
      });
    };
  };

  // agrego role y aria-label para los tests
  // cambie el type del password input a password
  return (
    <form className="login_form" onSubmit={e => onSubmit(e)}>
      <input
        type="text"
        placeholder="Username"
        aria-label="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        role="textbox"
        aria-label="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button title={getErrorMessages()} disabled={hasErrors || loading} type="submit">{loading ? "Loading" : "Login"}</button>
    </form>
  );
};

export default LoginForm;

// Posibles mejoras:
// 
//    Creo que incluír una librería para manejar forms y sus errores puede aportar si el form fuese mas complejo, o si hubiesen mas forms en la app.
//
//    Otra opción es crear componentes para input, buttom y form, en los cuales se podría tener mas organizado 
//    el uso de estilos y posiblemente reducir un poco de código, aunque en este caso no lo vi necesario.
//
//    Para los estilos utilizaría la librería styled-components, que hace el uso de estilos mucho mas claro. Al no contar con estilos complejos no lo vi necesario para este caso

