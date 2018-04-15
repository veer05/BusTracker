defmodule BustrackerWeb.SessionController do
  use BustrackerWeb, :controller

  alias Bustracker.Users
  alias Bustracker.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    IO.inspect(email)
    IO.inspect(password)
    #p = Comeonin.Argon2.hashpwsalt("password1")
    #user = %{ name: "Kous", email: "chill@chill.com", mobnum: "1234567890", password_hash: p }    
    #IO.inspect(Comeonin.Argon2.check_pass(user, password))
    # case get_hash(user, opts[:hash_key]) do
    #      {:ok, hash} ->
    #        (unquote(module).verify_pass(password, hash) and {:ok, user}) ||
    #          {:error, "invalid password"}
    #
    #      _ ->
    #{:error, "no password hash found in the user struct"}
    #user = Accounts.get_user_by_email(email)
    #if user do
    #  conn
    #  |> put_session(:user_id, user.id)
    #  |> put_flash(:info, "Welcome back #{user.name}")
    #  |> redirect(to: page_path(conn, :index))
    #else
    #  conn
    #  |> put_flash(:error, "Can't create session")
    #  |> redirect(to: page_path(conn, :index))
    #end
  end

  def delete(conn, _params) do
    #conn
    #|> delete_session(:user_id)
    #|> put_flash(:info, "Logged out")
    #|> redirect(to: page_path(conn, :index))
  end
end