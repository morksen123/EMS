import { login, signup } from "../../auth/actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="phone_number">Phone number:</label>
      <input id="phone_number" name="phone_number" type="number" required />
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
