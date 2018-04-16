defmodule BustrackerWeb.ExternalAPIView do
  use BustrackerWeb, :view
  alias BustrackerWeb.ExternalAPIView

  def render("index.json", %{stop_names: stop_names}) do
    %{
      data: render_many(stop_names, ExternalAPIView, "stop_names.json")
    }
  end
end