defmodule BustrackerWeb.ExternalAPIController do
  use BustrackerWeb, :controller
  alias Bustracker.MbtaConnectors.MbtaConnector

  action_fallback BustrackerWeb.FallbackController

  def get_stop_names(conn, %{"request_stop" => request_stop}) do
  	stop_names = Bustracker.MbtaConnectors.get_stop_names()
   	IO.inspect("inside the controller MBTA ....")
  	IO.inspect(stop_names)
    conn
      |> put_status(:created)
      |> render("allStop_list.json", allStops: stop_names)
  end

  """
  	overloading the function. rename properly - TODO
  """
  def get_stop_names(conn, %{"selected_stop" => stop_name}) do
  	predictions = Bustracker.MbtaConnectors.get_predictions(stop_name)
  	if (length predictions) > 0 do
        conn
            |> put_status(:created)
            |> render("bus_list.json", bus: predictions)
    else
        predictions = [%{noBus: "True", message: "No Bus running at the moment, Please try again later"}]
        conn
            |> put_status(:created)
            |> render("bus_list.json", bus: predictions)
    end
  end

  def get_stop_names(conn, %{"latitude" => latitude, "longitude" => longitude, "radius" => radius}) do
    stops = Bustracker.MbtaConnectors.get_proximity_stops(latitude,longitude,radius)
    conn
      |> put_status(:created)
      |> render("nearest_stop.json", stops: stops)
  end


end