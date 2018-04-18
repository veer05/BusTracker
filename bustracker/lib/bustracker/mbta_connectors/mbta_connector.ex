defmodule Bustracker.MbtaConnectors do
  """
    MBTA api calls
    <============== MAIN FUNCTIONS ===========>
  """

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
    
    Enum.map(raw_stops, 
    fn(x) -> %{
      "stop_name" => x["attributes"]["name"], 
      "stop_id" => x["id"]
      } end)
  end

  """
    returns the stop ID (String) for the given stop name
  """
  def get_stop_ID(stopName) do
    stop = get_raw_stops() 
     |> (Enum.filter fn(x) -> x["attributes"]["name"] == stopName end)
     |> (Enum.at(0))
    
    stop["id"]
  end


  """
   returns list of routes (in the form of route ids)
  """
  def get_routes(stopName) do
    stopID = get_stop_ID(stopName)
    resp = HTTPoison.get!("https://api-v3.mbta.com/routes?filter[stop]=#{stopID}&filter[type]=3")
    body = Poison.decode!(resp.body)
    body["data"]
    |> Enum.map(fn(routeObj) -> routeObj["id"] end)
  end

  """
    GIVEN: a stop name
    RETURNS: predictions for the entered bus stop
  """
  def get_predictions(stopName) do
    dict = getStopNameIdDict()
    get_predictions_helper(dict[stopName]) 
  end 

  """
  	GIVEN: source and destination stop names
    RETURNS: itenary list of all the predictions between source and destination
              with intermediate stops, arrival time and route id
  """
  def get_route(sourceName, destinationName) do
    dict = getStopNameIdDict
    get_route_helper(dict[sourceName], dict[destinationName])
  end
  
  """
    GIVEN: trip id (string)
    RETURNS: the details of trip id in the form of list of lstOfMaps
          %{["arrival_time" => "....", "stop_name" => "..."]}
  """
  def getTripDetails(tripId) do
    resp = HTTPoison.get!("https://api-v3.mbta.com/schedules?filter%5Btrip%5D=#{tripId}")
    data = Poison.decode!(resp.body)
    dict = getStopIdNameDict()

    Enum.map(data["data"], 
            fn(x) -> 
              %{"arrival_time" => extract_time(x["attributes"]["arrival_time"]),
                "stop_name" => dict[x["relationships"]["stop"]["data"]["id"]]
              }
            end)
  end

  """
  	<============== HELPER FUNCTIONS ===========>
  """  
  def get_predictions_helper(stopID) do
    limit = 10
    resp = HTTPoison.get!("https://api-v3.mbta.com/predictions?page[limit]=#{limit}&filter[stop]=#{stopID}")
    IO.inspect(stopID)
    IO.inspect("https://api-v3.mbta.com/predictions?page[limit]=#{limit}&filter[stop]=#{stopID}")
    body = Poison.decode!(resp.body)
    predictionsObj = body["data"]
    
    Enum.map(predictionsObj, fn(prediction) ->  get_fields(prediction) end)
   
  end
  

  def get_fields(prediction) do 
   %{  
      "arrival_time" => extract_time(prediction["attributes"]["arrival_time"]) , 
      "departure_time" => extract_time(prediction["attributes"]["departure_time"]), 
      "route_id" => prediction["relationships"]["route"]["data"]["id"],  
      "tripId" => prediction["relationships"]["trip"]["data"]["id"],  
     }
   
  end


  def get_stop_name(stopID) do
    stopObj = get_raw_stops 
              |> Enum.filter(fn(x) -> x["id"] == stopID end)
              |> Enum.at(0)
    stopObj["attributes"]["name"]

  end

  def get_stop_name(stopID, raw_stops) do
    stopObj = raw_stops
              |> Enum.filter(fn(x) -> x["id"] == stopID end)
              |> Enum.at(0)
    stopObj["attributes"]["name"]
  end

  def get_predictions(tripId, destId) do
    resp = HTTPoison.get!("https://api-v3.mbta.com/predictions?trip=#{tripId}")
    data = Poison.decode!(resp.body)
    result = Enum.filter(data["data"], fn(x) -> destId == x["relationships"]["stop"]["data"]["id"] end)
    Enum.map(result, fn(x) -> x["relationships"]["trip"]["data"]["id"] end)
  end

  def get_predictions_tripID(tripId) do
    resp = HTTPoison.get!("https://api-v3.mbta.com/predictions?trip=#{tripId}")
    data = Poison.decode!(resp.body)
    data["data"]
  end

  """
    GIVEN: source and destination stop ids
    RETURNS: itenary list of all the predictions between source and destination
              with intermediate stops, arrival time and route id
  """
  def get_route_helper(sourceId, destId) do
    stopIdNameDict = getStopIdNameDict()
    tripStops = Enum.map(get_predictions_helper(sourceId), 
      fn(prediction) ->
        tripId = prediction["tripId"]
        (get_predictions(tripId, destId)) end) 
    |> List.flatten
    |> getTripDetailsList()

    
    sliceTripStops(tripStops, sourceId, destId)
    |> Enum.map(fn(x) -> getSliceTripNames(x, stopIdNameDict) end)
    
  end

  """
    from the list of predictions given, this function constructs 
    a list of list, where each outer list pertains to a trip and 
    each inner list denotes the route details (stop id, arrivalTime and route id)
  """
  def getTripDetailsList(possibleTrips) do

   (Enum.map(possibleTrips, fn(tripId) -> get_predictions_tripID(tripId) end)
    |> Enum.map(fn(x) -> Enum.map(x, fn(prediction) -> 
          [prediction["relationships"]["stop"]["data"]["id"] ,
           (prediction["attributes"]["arrival_time"]),
           prediction["relationships"]["route"]["data"]["id"]] end) end)) 
  end

  """
    GIVEN: list of stops with details
    RETURNS: stop ids between from and to (including from and to)
  """
  def sliceTripStops(listOfStops, from, to) do
    flag = true
    Enum.map(listOfStops, 
      fn(x) -> slicingHelper(x, from, to, 0, []) end)
  end

  """
    helper utility for sliceTripStops
  """
  def slicingHelper(lst, from, to, flag, resultList) do
    IO.inspect(hd lst)
    cond do
     (flag == 0) and (Enum.at((hd lst), 0) == from) ->
        resultList = resultList ++ [(hd lst)]
        slicingHelper((tl lst), from, to, 1, resultList)
      (flag == 1) and (Enum.at((hd lst),0)) == to ->
        resultList = resultList ++ [(hd lst)]
        slicingHelper((tl lst), from, to, 2, resultList)
      (flag == 1) ->
        resultList = resultList ++ [(hd lst)]
        slicingHelper((tl lst), from, to, flag, resultList)
      (flag == 0) ->
        slicingHelper((tl lst), from, to, flag, resultList)
      true ->
        resultList  

    end
  end

  """
    GIVEN: a list of stops of form [[stopId, arrival_time, route_id]]
    RETURNS: a map of the form [[stopName, arrival_time, route_id]
  """
  def getSliceTripNames(lstOfStops, stopIdNameDict) do
    Enum.map(lstOfStops, 
      fn(x) -> %{ "stopName" => stopIdNameDict[Enum.at(x,0)],
                  "arrival_time" => extract_time(Enum.at(x, 1)),
                  "route_id" => extract_time(Enum.at(x, 2)) }
    end)
  end

  """
    RETURNS: a dictionary of the form {stopID: stopName}
  """
  def getStopIdNameDict() do
    lstOfMaps = (get_raw_stops
    |> Enum.map(fn(stop) -> %{stop["id"] => stop["attributes"]["name"]} end))

    Enum.reduce(lstOfMaps, fn x, y ->
      Map.merge(x, y, fn _k, v1, v2 -> v2 ++ v1 end)
    end)
  end

  """
    RETURNS: a dictionary of the form {stopName: stopID}
  """
  def getStopNameIdDict() do
    lstOfMaps = (get_raw_stops
    |> Enum.map(fn(stop) -> %{stop["attributes"]["name"] => stop["id"]} end))

    Enum.reduce(lstOfMaps, fn x, y ->
     Map.merge(x, y, fn _k, v1, v2 -> v2  end)
    end)
  end

  """
    GIVEN: a date field of the form -> "2018-04-18T00:00:00-04:00"
    RETURNS: the HH:MM fields exracted -> "00:00"
  """
  def extract_time(fullDate) do
    fullDate
     |> String.split("T")
      |> Enum.at(1)
       |> String.split("-")
        |> Enum.at(0)
         |> String.slice(0, 5)
  end

end