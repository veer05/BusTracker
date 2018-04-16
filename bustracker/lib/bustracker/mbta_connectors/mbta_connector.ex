defmodule Bustracker.MbtaConnectors do
  """
    MBTA api calls
  """

  """
    returns a map of all stops registered by MBTA
  """
  def get_raw_stops() do
    resp = HTTPoison.get!("https://api-v3.mbta.com/stops?filter%5Broute_type%5D=3")
    data = Poison.decode!(resp.body)
    data["data"]
  end

  """
    returns all the stop names registered by MBTA
  """
  def get_stop_names() do
    raw_stops = get_raw_stops()
    IO.inspect("Trying to print the stop name")
    IO.inspect("LENGTH OF THE MAP")
    IO.inspect(length (raw_stops))
    Enum.map(raw_stops, fn(x) -> x["attributes"]["name"] end)
  end

  def get_predictions(stopName) do
    stopID = get_stop_ID(stopName)
    limit = 10
    resp = HTTPoison.get!("https://api-v3.mbta.com/predictions?page[limit]=#{limit}&filter[stop]=#{stopID}")
    body = Poison.decode!(resp.body)
    predictionsObj = body["data"]
    Enum.map(predictionsObj, fn(prediction) -> get_fields(prediction) end)
  end

  def get_fields(prediction) do
    [prediction["attributes"]["arrival_time"], 
      prediction["attributes"]["departure_time"], 
      prediction["relationships"]["route"]["data"]["id"] ]
  end

  def get_stop_ID(stopName) do
    stop = get_raw_stops() 
     |> (Enum.filter fn(x) -> x["attributes"]["name"] == stopName end)
     |> (Enum.at(0))
    
    stop["id"]
  end

end