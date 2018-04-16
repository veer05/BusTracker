defmodule BustrackerWeb.ExternalAPIController do
  use BustrackerWeb, :controller
  alias Bustracker.MbtaConnectors.MbtaConnector

  action_fallback BustrackerWeb.FallbackController

  def get_stop_names(conn, %{"request_stop" => request_stop}) do
  	stop_names = Bustracker.MbtaConnectors.get_stop_names()
   	IO.inspect("inside the controller MBTA ....")
  	IO.inspect(stop_names)

    render conn, "index.html"
  end

  """
  	overloading the function. rename properly - TODO
  """
  def get_stop_names(conn, %{"stop_name" => stop_name}) do
  	predictions = Bustracker.MbtaConnectors.get_predictions(stop_name)
  	IO.inspect("<====================PREDICTIONS=====================>")
  	IO.inspect(predictions)
  end

end