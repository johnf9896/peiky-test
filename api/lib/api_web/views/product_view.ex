defmodule ApiWeb.ProductView do
  use ApiWeb, :view
  alias ApiWeb.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      store_id: product.store_id}
  end
end
