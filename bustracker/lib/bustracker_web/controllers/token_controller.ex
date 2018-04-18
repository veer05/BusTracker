defmodule BustrackerWeb.TokenController do
  use BustrackerWeb, :controller
  alias Bustracker.Users.User

  action_fallback BustrackerWeb.FallbackController

  def create(conn, %{"email" => email, "password" => pass}) do
    IO.inspect('Error Type')
    IO.inspect(Bustracker.Users.get_and_auth_user(email, pass))
    with {:ok, %User{} = user} <- Bustracker.Users.get_and_auth_user(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end