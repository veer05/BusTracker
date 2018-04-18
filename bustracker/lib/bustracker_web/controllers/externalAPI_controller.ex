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
    IO.inspect('This is inside request')
    IO.inspect(latitude)
    IO.inspect(longitude)
    resp = HTTPoison.get!("https://api-v3.mbta.com/stops?filter%5Blatitude%5D=#{latitude}&filter%5Blongitude%5D=#{longitude}&filter%5Bradius%5D=#{radius}")

    IO.inspect("UUURRRLLLL")
    IO.inspect("https://api-v3.mbta.com/stops?filter%5Blatitude%5D=#{latitude}&filter%5Blongitude%5D=#{longitude}&filter%5Bradius%5D=#{radius}")
    body = Poison.decode!(resp.body)
    IO.inspect(Enum.map(body["data"], fn(x) -> x["attributes"]["name"] end))
    stops = Enum.map(body["data"], fn(x) -> x["attributes"]["name"] end) 
    conn
      |> put_status(:created)
      |> render("nearest_stop.json", stops: stops)
  end


end